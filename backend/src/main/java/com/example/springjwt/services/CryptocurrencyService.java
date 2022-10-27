package com.example.springjwt.services;

import com.example.springjwt.dto.response.CryptocurrencyDetailsResponse;
import com.example.springjwt.dto.response.MappedTransaction;
import com.example.springjwt.exception.NotEnoughCryptocurrencyException;
import com.example.springjwt.exception.NotEnoughMoneyException;
import com.example.springjwt.models.cryptocurrency.Cryptocurrency;
import com.example.springjwt.models.cryptocurrency.ECryptocurrency;
import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyDetails;
import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyDetailsDb;
import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyLinks;
import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyLinksDb;
import com.example.springjwt.models.cryptocurrency.history.CryptocurrencyHistoryData;
import com.example.springjwt.models.cryptocurrency.history.CryptocurrencyHistoryDataDb;
import com.example.springjwt.models.cryptocurrency.history.CryptocurrencyHistoryDb;
import com.example.springjwt.models.cryptocurrency.history.ETimeframe;
import com.example.springjwt.models.transaction.ETransaction;
import com.example.springjwt.models.transaction.Transaction;
import com.example.springjwt.models.transaction.TransactionHistory;
import com.example.springjwt.models.user.User;
import com.example.springjwt.models.wallet.Wallet;
import com.example.springjwt.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
@Slf4j
public class CryptocurrencyService {

    private final WebClient webClient;
    private final UserService userService;
    private final UserRepository userRepository;
    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final CryptocurrencyDetailsRepository cryptocurrencyDetailsRepository;
    private final CryptocurrencyHistoryRepository cryptocurrencyHistoryRepository;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    @Value("${bsandor.app.cryptocurrencyListUrl}")
    String listUrl;
    @Value("${bsandor.app.cryptocurrencyCoinUrl}")
    String coinUrl;

    @Autowired
    public CryptocurrencyService(@Qualifier("WebClient") WebClient webClient, UserService userService,
                                 UserRepository userRepository, CryptocurrencyRepository cryptocurrencyRepository,
                                 CryptocurrencyDetailsRepository cryptocurrencyDetailsRepository,
                                 CryptocurrencyHistoryRepository cryptocurrencyHistoryRepository,
                                 WalletRepository walletRepository, TransactionRepository transactionRepository) {
        this.webClient = webClient;
        this.userService = userService;
        this.cryptocurrencyRepository = cryptocurrencyRepository;
        this.cryptocurrencyDetailsRepository = cryptocurrencyDetailsRepository;
        this.cryptocurrencyHistoryRepository = cryptocurrencyHistoryRepository;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }

    public Page<Cryptocurrency> getCurrencies(int currentPage, int pageSize, String sortByProperty, boolean ascending,
                                              String namePart) {
        Sort sort = Sort.by(ascending ? Sort.Direction.ASC : Sort.Direction.DESC, sortByProperty);
        // The backend counts pages from index 0, the frontend from index 1
        // We have to subtract 1 from the current page number
        return cryptocurrencyRepository.findAllByNameContainsIgnoreCase(namePart,
                PageRequest.of(currentPage - 1, pageSize, sort));
    }

    public List<Cryptocurrency> getCurrenciesWithIds(List<String> ids) {
        return cryptocurrencyRepository.findAllByIdIn(ids);
    }

    public CryptocurrencyDetailsResponse getCryptocurrencyDetails(String id) {
        updateCurrencyDetailsFromApi(id);

        CryptocurrencyDetailsResponse cryptocurrencyDetailsResponse = new CryptocurrencyDetailsResponse();

        Optional<Cryptocurrency> cryptocurrency = cryptocurrencyRepository.findById(id);
        Optional<CryptocurrencyDetailsDb> cryptocurrencyDetails = cryptocurrencyDetailsRepository.findById(id);

        cryptocurrency.ifPresent(value -> BeanUtils.copyProperties(value, cryptocurrencyDetailsResponse));
        cryptocurrencyDetails.ifPresent(value -> BeanUtils.copyProperties(value, cryptocurrencyDetailsResponse));

        if (cryptocurrency.isEmpty() || cryptocurrencyDetails.isEmpty()) {
            throw new RuntimeException("Cryptocurrency not found with id: \"" + id + "\"");
        }

        return cryptocurrencyDetailsResponse;
    }

    public void updateCurrencyDetailsFromApi(String id) {
        Mono<CryptocurrencyDetails> response = webClient.get()
                .uri(uriBuilder -> uriBuilder.path(coinUrl + "/" + id).queryParam("localization", "false").build())
                .retrieve().bodyToMono(CryptocurrencyDetails.class);

        Optional<CryptocurrencyDetails> cryptocurrencyDetailsOptional = response.blockOptional();

        if (cryptocurrencyDetailsOptional.isPresent()) {
            CryptocurrencyDetails cryptocurrencyDetails =
                    filterEmptyStringsFromLinks(cryptocurrencyDetailsOptional.get());
            cryptocurrencyDetailsRepository.save(mapCryptocurrencyDetailsToDatabaseObject(cryptocurrencyDetails));
        } else {
            throw new RuntimeException("Error updating cryptocurrency with id: \"" + id + "\"");
        }
    }

    public CryptocurrencyHistoryDb getCryptocurrencyHistory(String id, ETimeframe timeframe) {
        updateCurrencyHistoryFromApi(id, timeframe);
        Optional<CryptocurrencyHistoryDb> cryptocurrencyHistory = cryptocurrencyHistoryRepository.findById(id);

        if (cryptocurrencyHistory.isPresent()) {
            return cryptocurrencyHistory.get();
        } else {
            throw new RuntimeException("Cryptocurrency history not found with id: \"" + id + "\"");
        }
    }

    @Transactional
    public void updateCurrencyHistoryFromApi(String id, ETimeframe timeframe) {
        Mono<CryptocurrencyHistoryData> response = webClient.get()
                .uri(uriBuilder -> uriBuilder.path(coinUrl + "/" + id + "/market_chart")
                        .queryParam("vs_currency", "usd").queryParam("days", convertDaysAgoFromTimeframe(timeframe))
                        .build()).retrieve().bodyToMono(CryptocurrencyHistoryData.class);

        Optional<CryptocurrencyHistoryData> CryptocurrencyHistoryDataOptional = response.blockOptional();

        if (CryptocurrencyHistoryDataOptional.isPresent()) {
            CryptocurrencyHistoryData cryptocurrencyHistoryData = CryptocurrencyHistoryDataOptional.get();
            // Convert to DB format
            List<CryptocurrencyHistoryDataDb> historyDataDbList =
                    convertHistoryDataToDbFormat(cryptocurrencyHistoryData);

            Optional<CryptocurrencyHistoryDb> historyOptional = cryptocurrencyHistoryRepository.findById(id);

            if (historyOptional.isEmpty()) {
                CryptocurrencyHistoryDb newHistory = new CryptocurrencyHistoryDb();
                newHistory.setId(id);
                setHistoryByTimeframe(newHistory, historyDataDbList, timeframe);
                cryptocurrencyHistoryRepository.save(newHistory);
            } else {
                CryptocurrencyHistoryDb history = historyOptional.get();
                setHistoryByTimeframe(history, historyDataDbList, timeframe);
                cryptocurrencyHistoryRepository.save(history);
            }
        } else {
            throw new RuntimeException("Error updating cryptocurrency history with id: \"" + id + "\"");
        }
    }

    public Wallet getWallet() {
        return userService.getCurrentUserEntity().getWallet();
    }

    public List<Cryptocurrency> getCurrenciesInWallet() {
        Wallet wallet = getWallet();
        List<ECryptocurrency> coinIdsInWallet = wallet.getCryptocurrencies().keySet().stream().toList();
        return cryptocurrencyRepository.findAllByIdIn(ECryptocurrency.getIdList(coinIdsInWallet));
    }

    public List<Cryptocurrency> getCurrenciesInTransactions() {
        List<Transaction> transactions = userService.getCurrentUserEntity().getTransactionHistory().getTransactions();
        List<String> transactionCoinsIdList = getCoinIdsInTransactions(transactions);
        return cryptocurrencyRepository.findAllByIdIn(transactionCoinsIdList);
    }

    public Map<String, Double> getWalletCryptocurrenciesMapped() {
        Wallet wallet = getWallet();
        Map<String, Double> mapped = new HashMap<>();

        for (var entry : wallet.getCryptocurrencies().entrySet()) {
            mapped.put(entry.getKey().id, entry.getValue());
        }

        return mapped;
    }

    public List<MappedTransaction> getTransactionsMapped() {
        TransactionHistory transactionHistory = userService.getCurrentUserEntity().getTransactionHistory();
        List<Transaction> transactions = transactionHistory.getTransactions();

        List<MappedTransaction> mapped = new ArrayList<>();

        for (var transaction : transactions) {
            if (transaction.getCryptocurrency() != null)
                mapped.add(new MappedTransaction(transaction.getDate(), transaction.getType(),
                        transaction.getCryptocurrency().id, transaction.getAmount(), transaction.getPrice()));
            else {
                mapped.add(new MappedTransaction(transaction.getDate(), transaction.getType(), "none",
                        transaction.getAmount(), transaction.getPrice()));
            }
        }

        return mapped;
    }

    public PagedListHolder<MappedTransaction> getTransactionHistory(int currentPage, int pageSize,
                                                                    String sortByProperty, boolean ascending) {
        List<MappedTransaction> transactions = getTransactionsMapped();

        PagedListHolder<MappedTransaction> page =
                new PagedListHolder<>(transactions, new MutableSortDefinition(sortByProperty, true, ascending));
        page.resort();
        page.setPageSize(pageSize);
        // The backend counts pages from index 0, the frontend from index 1
        // We have to subtract 1 from the current page number
        page.setPage(currentPage - 1);

        return page;
    }

    @Transactional
    public void depositMoney(Double amount) {
        User currentUser = userService.getCurrentUserEntity();
        Wallet currentUserWallet = currentUser.getWallet();
        Double money = currentUserWallet.getReferenceCurrency();

        TransactionHistory currentUserTransactionHistory = currentUser.getTransactionHistory();

        currentUserWallet.setReferenceCurrency(money + amount);
        walletRepository.save(currentUserWallet);

        currentUserTransactionHistory.getTransactions()
                .add(new Transaction(new Date(), ETransaction.DEPOSIT_MONEY, null, amount, 0.0));
        transactionRepository.save(currentUserTransactionHistory);

        currentUser.setWallet(currentUserWallet);
        currentUser.setTransactionHistory(currentUserTransactionHistory);
        userRepository.save(currentUser);
    }

    @Transactional
    public void resetMoney() {
        User currentUser = userService.getCurrentUserEntity();
        Wallet currentUserWallet = currentUser.getWallet();

        TransactionHistory currentUserTransactionHistory = currentUser.getTransactionHistory();

        currentUserWallet.setReferenceCurrency(0.0);
        walletRepository.save(currentUserWallet);

        currentUserTransactionHistory.getTransactions()
                .add(new Transaction(new Date(), ETransaction.RESET_MONEY, null, 0.0, 0.0));
        transactionRepository.save(currentUserTransactionHistory);

        currentUser.setWallet(currentUserWallet);
        currentUser.setTransactionHistory(currentUserTransactionHistory);
        userRepository.save(currentUser);
    }

    @Transactional
    public void buyCurrency(ECryptocurrency currency, Double amount, Double price) {
        User currentUser = userService.getCurrentUserEntity();
        Wallet currentUserWallet = currentUser.getWallet();
        TransactionHistory currentUserTransactionHistory = currentUser.getTransactionHistory();

        Double money = currentUserWallet.getReferenceCurrency();
        Map<ECryptocurrency, Double> cryptocurrencies = currentUserWallet.getCryptocurrencies();

        if (price > money) {
            throw new NotEnoughMoneyException();
        }

        if (!cryptocurrencies.containsKey(currency)) {
            cryptocurrencies.put(currency, amount);
        } else {
            cryptocurrencies.put(currency, cryptocurrencies.get(currency) + amount);
        }

        currentUserWallet.setReferenceCurrency(money - price);
        currentUserWallet.setCryptocurrencies(cryptocurrencies);
        walletRepository.save(currentUserWallet);

        currentUserTransactionHistory.getTransactions()
                .add(new Transaction(new Date(), ETransaction.BUY_CRYPTOCURRENCY, currency, amount, price));
        transactionRepository.save(currentUserTransactionHistory);

        currentUser.setWallet(currentUserWallet);
        currentUser.setTransactionHistory(currentUserTransactionHistory);
        userRepository.save(currentUser);
    }

    @Transactional
    public void sellCurrency(ECryptocurrency currency, Double amount, Double price) {
        User currentUser = userService.getCurrentUserEntity();
        Wallet currentUserWallet = currentUser.getWallet();
        TransactionHistory currentUserTransactionHistory = currentUser.getTransactionHistory();

        Double money = currentUserWallet.getReferenceCurrency();
        Map<ECryptocurrency, Double> cryptocurrencies = currentUserWallet.getCryptocurrencies();
        Double currencyAmount = cryptocurrencies.get(currency);

        if (!cryptocurrencies.containsKey(currency) || currencyAmount < amount) {
            throw new NotEnoughCryptocurrencyException();
        }

        cryptocurrencies.put(currency, currencyAmount - amount);

        currentUserWallet.setReferenceCurrency(money + price);
        currentUserWallet.setCryptocurrencies(cryptocurrencies);
        walletRepository.save(currentUserWallet);

        currentUserTransactionHistory.getTransactions()
                .add(new Transaction(new Date(), ETransaction.SELL_CRYPTOCURRENCY, currency, amount, price));
        transactionRepository.save(currentUserTransactionHistory);

        currentUser.setWallet(currentUserWallet);
        currentUser.setTransactionHistory(currentUserTransactionHistory);
        userRepository.save(currentUser);
    }

    private CryptocurrencyDetailsDb mapCryptocurrencyDetailsToDatabaseObject(
            CryptocurrencyDetails cryptocurrencyDetails) {
        CryptocurrencyDetailsDb response = new CryptocurrencyDetailsDb();

        response.setId(cryptocurrencyDetails.getId());
        response.setDescription(cryptocurrencyDetails.getDescription().getDescription());
        response.setGenesisDate(cryptocurrencyDetails.getGenesisDate());
        response.setVotesUpPercentage(cryptocurrencyDetails.getVotesUpPercentage());
        response.setVotesDownPercentage(cryptocurrencyDetails.getVotesDownPercentage());
        response.setCoingeckoScore(cryptocurrencyDetails.getCoingeckoScore());
        response.setDeveloperScore(cryptocurrencyDetails.getDeveloperScore());
        response.setCommunityScore(cryptocurrencyDetails.getCommunityScore());
        response.setLiquidityScore(cryptocurrencyDetails.getLiquidityScore());
        response.setPublicInterestScore(cryptocurrencyDetails.getPublicInterestScore());
        response.setCommunityData(cryptocurrencyDetails.getCommunityData());
        response.setDeveloperData(cryptocurrencyDetails.getDeveloperData());

        CryptocurrencyLinksDb linksResponse = new CryptocurrencyLinksDb();

        linksResponse.setHomepage(cryptocurrencyDetails.getLinks().getHomepage());
        linksResponse.setBlockchainSite(cryptocurrencyDetails.getLinks().getBlockchainSite());
        linksResponse.setOfficialForumUrl(cryptocurrencyDetails.getLinks().getOfficialForumUrl());
        linksResponse.setChatUrl(cryptocurrencyDetails.getLinks().getChatUrl());
        linksResponse.setAnnouncementUrl(cryptocurrencyDetails.getLinks().getAnnouncementUrl());
        linksResponse.setTwitterUsername(cryptocurrencyDetails.getLinks().getTwitterUsername());
        linksResponse.setSubredditUrl(cryptocurrencyDetails.getLinks().getSubredditUrl());
        linksResponse.setGithubRepos(cryptocurrencyDetails.getLinks().getRepos().getGithubRepos());

        response.setLinks(linksResponse);

        return response;
    }

    private String convertDaysAgoFromTimeframe(ETimeframe timeframe) {
        return switch (timeframe) {
            case HISTORY_24H -> "1";
            case HISTORY_30D -> "30";
            case HISTORY_1Y -> "365";
            case HISTORY_MAX -> "max";
            default -> "7";
        };
    }

    private CryptocurrencyDetails filterEmptyStringsFromLinks(CryptocurrencyDetails cryptocurrencyDetails) {
        CryptocurrencyLinks links = cryptocurrencyDetails.getLinks();
        links.setHomepage(filterEmptyStrings(links.getHomepage()));
        links.setBlockchainSite(filterEmptyStrings(links.getBlockchainSite()));
        links.setOfficialForumUrl(filterEmptyStrings(links.getOfficialForumUrl()));
        links.setChatUrl(filterEmptyStrings(links.getChatUrl()));
        links.setAnnouncementUrl(filterEmptyStrings(links.getAnnouncementUrl()));
        return cryptocurrencyDetails;
    }

    private List<String> filterEmptyStrings(List<String> list) {
        list.removeIf(item -> item.equals(""));
        return list;
    }

    private List<CryptocurrencyHistoryDataDb> convertHistoryDataToDbFormat(CryptocurrencyHistoryData data) {
        List<List<Double>> historyData = data.getHistoryData();
        List<CryptocurrencyHistoryDataDb> historyDataDbList = new ArrayList<>();

        for (List<Double> dataUnit : historyData) {
            historyDataDbList.add(
                    new CryptocurrencyHistoryDataDb((long) dataUnit.get(0).doubleValue(), dataUnit.get(1)));
        }

        return historyDataDbList;
    }

    private void setHistoryByTimeframe(CryptocurrencyHistoryDb history,
                                       List<CryptocurrencyHistoryDataDb> historyDataDbList, ETimeframe timeframe) {
        switch (timeframe) {
            case HISTORY_24H -> history.setHistory24h(historyDataDbList);
            case HISTORY_7D -> history.setHistory7d(historyDataDbList);
            case HISTORY_30D -> history.setHistory30d(historyDataDbList);
            case HISTORY_1Y -> history.setHistory1y(historyDataDbList);
            case HISTORY_MAX -> history.setHistoryMax(historyDataDbList);
        }
        cryptocurrencyHistoryRepository.save(history);
    }

    public List<String> getCoinIdsInTransactions(List<Transaction> transactions) {
        ArrayList<String> ids = new ArrayList<>();
        for (Transaction t : transactions) {
            if (t.getCryptocurrency() != null && t.getCryptocurrency().id != null)
                ids.add(t.getCryptocurrency().id);
        }
        return ids;
    }

}