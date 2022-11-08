package com.bsandor.stocksimulator.services;

import com.bsandor.stocksimulator.dto.response.*;
import com.bsandor.stocksimulator.exception.NotEnoughCryptocurrencyException;
import com.bsandor.stocksimulator.exception.NotEnoughMoneyException;
import com.bsandor.stocksimulator.models.cryptocurrency.Cryptocurrency;
import com.bsandor.stocksimulator.models.cryptocurrency.ECryptocurrency;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyDetails;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyDetailsDb;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyLinks;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyLinksDb;
import com.bsandor.stocksimulator.models.cryptocurrency.history.CryptocurrencyHistoryData;
import com.bsandor.stocksimulator.models.cryptocurrency.history.CryptocurrencyHistoryDataDb;
import com.bsandor.stocksimulator.models.cryptocurrency.history.CryptocurrencyHistoryDb;
import com.bsandor.stocksimulator.models.cryptocurrency.history.ETimeframe;
import com.bsandor.stocksimulator.models.transaction.ETransaction;
import com.bsandor.stocksimulator.models.transaction.Transaction;
import com.bsandor.stocksimulator.models.transaction.TransactionHistory;
import com.bsandor.stocksimulator.models.user.User;
import com.bsandor.stocksimulator.models.wallet.Wallet;
import com.bsandor.stocksimulator.repository.*;
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

    public SummaryResponse getSummary(int currentPage, int pageSize, String sortByProperty, boolean ascending) {
        List<MappedTransaction> transactions = getTransactionsMapped();
        Map<String, Double> wallet = getWalletCryptocurrenciesMapped();

        // These are the parts of the summary
        double profit = 0;
        double totalMoneyDeposited = 0;
        int depositCount = 0;
        double totalPurchaseAmount = 0;
        int purchaseCount = 0;
        double totalSaleAmount = 0;
        int saleCount = 0;
        int moneyResetCount = 0;
        Map<String, Double> profitOnCoin = new HashMap<>();

        for (MappedTransaction transaction : transactions) {
            String coinId = transaction.getCryptocurrencyId();

            switch (transaction.getType()) {
                // Cryptocurrency purchase removes from the profit
                case BUY_CRYPTOCURRENCY -> {
                    Optional<Cryptocurrency> coin = cryptocurrencyRepository.findById(coinId);
                    if (coin.isEmpty()) {
                        throw new RuntimeException("Cryptocurrency not found with id: \"" + coinId + "\"");
                    }
                    double pastValue = transaction.getPriceTotal();

                    profit -= pastValue;
                    if (profitOnCoin.containsKey(coinId)) {
                        profitOnCoin.put(coinId, profitOnCoin.get(coinId) - pastValue);
                    } else {
                        profitOnCoin.put(coinId, -pastValue);
                    }
                    totalPurchaseAmount += pastValue;
                    purchaseCount++;
                }
                // Cryptocurrency sale adds to the profit
                case SELL_CRYPTOCURRENCY -> {
                    Optional<Cryptocurrency> coin = cryptocurrencyRepository.findById(coinId);
                    if (coin.isEmpty()) {
                        throw new RuntimeException("Cryptocurrency not found with id: \"" + coinId + "\"");
                    }
                    double pastValue = transaction.getPriceTotal();

                    profit += pastValue;
                    if (profitOnCoin.containsKey(coinId)) {
                        profitOnCoin.put(coinId, profitOnCoin.get(coinId) + pastValue);
                    } else {
                        profitOnCoin.put(coinId, pastValue);
                    }
                    totalSaleAmount += pastValue;
                    saleCount++;
                }
                case DEPOSIT_MONEY -> {
                    totalMoneyDeposited += transaction.getAmount();
                    depositCount++;
                }
                case RESET_MONEY -> moneyResetCount++;
            }
        }

        // Cryptocurrency in wallet adds to the profit
        for (var coinInWallet : wallet.entrySet()) {
            String coinId = coinInWallet.getKey();
            Double coinAmount = coinInWallet.getValue();

            Optional<Cryptocurrency> coin = cryptocurrencyRepository.findById(coinId);

            if (coin.isEmpty()) {
                throw new RuntimeException("Cryptocurrency not found with id: \"" + coinId + "\"");
            }

            double presentValue = coinAmount * coin.get().getCurrentPrice();

            profit += presentValue;
            if (profitOnCoin.containsKey(coinId)) {
                profitOnCoin.put(coinId, profitOnCoin.get(coinId) + presentValue);
            } else {
                profitOnCoin.put(coinId, presentValue);
            }
        }

        // Convert map to list
        List<ProfitOnCryptocurrency> coinProfits = new ArrayList<>();
        for (var coin : profitOnCoin.entrySet()) {
            String coinId = cryptocurrencyRepository.findById(coin.getKey())
                    .orElseThrow(() -> new RuntimeException("Cryptocurrency not found with id: " + coin.getKey()))
                    .getId();
            coinProfits.add(new ProfitOnCryptocurrency(coin.getKey(), coinId, coin.getValue()));
        }

        // Create the page from profits on coins
        PagedListHolder<ProfitOnCryptocurrency> page =
                new PagedListHolder<>(coinProfits, new MutableSortDefinition(sortByProperty, true, ascending));
        page.resort();
        page.setPageSize(pageSize);

        // The backend counts pages from index 0, the frontend from index 1
        // We have to subtract 1 from the current page number
        page.setPage(currentPage - 1);

        ProfitOnCryptocurrencyPage profitsPage =
                new ProfitOnCryptocurrencyPage(page.getPageList(), currentPage, page.getPageCount(),
                        page.getNrOfElements());

        // Calculate the most and least profitable coins
        // Copy to avoid ConcurrentModificationException
        List<ProfitOnCryptocurrency> coinProfitsCopy = new ArrayList<>(coinProfits);
        Collections.sort(coinProfitsCopy);
        ProfitOnCryptocurrency mostProfitableCoin = coinProfitsCopy.get(coinProfits.size() - 1);
        ProfitOnCryptocurrency leastProfitableCoin = coinProfitsCopy.get(0);

        // Get the names of the most and least profitable coins
        Optional<Cryptocurrency> mostProfitableCryptocurrency =
                cryptocurrencyRepository.findById(mostProfitableCoin.getId());
        Optional<Cryptocurrency> leastProfitableCryptocurrency =
                cryptocurrencyRepository.findById(leastProfitableCoin.getId());

        if (mostProfitableCryptocurrency.isEmpty()) {
            throw new RuntimeException(
                    "Most profitable cryptocurrency not found with id " + mostProfitableCoin.getId());
        }

        if (leastProfitableCryptocurrency.isEmpty()) {
            throw new RuntimeException(
                    "Least profitable Cryptocurrency not found with id " + leastProfitableCoin.getId());
        }

        return new SummaryResponse(depositCount, purchaseCount, saleCount, moneyResetCount, profit,
                new ProfitableCoinResponse(mostProfitableCryptocurrency.get().getName(),
                        mostProfitableCryptocurrency.get().getImage(), mostProfitableCoin.getProfit()),
                new ProfitableCoinResponse(leastProfitableCryptocurrency.get().getName(),
                        leastProfitableCryptocurrency.get().getImage(), leastProfitableCoin.getProfit()),
                totalMoneyDeposited, getWallet().getReferenceCurrency(), totalPurchaseAmount, totalSaleAmount,
                profitsPage);
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
                        transaction.getCryptocurrency().id, transaction.getPrice(), transaction.getAmount(),
                        transaction.getPriceTotal()));
            else {
                mapped.add(new MappedTransaction(transaction.getDate(), transaction.getType(), "none",
                        transaction.getPrice(), transaction.getAmount(), transaction.getPriceTotal()));
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
                .add(new Transaction(new Date(), ETransaction.DEPOSIT_MONEY, null, 0.0, amount, 0.0));
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
                .add(new Transaction(new Date(), ETransaction.RESET_MONEY, null, 0.0, 0.0, 0.0));
        transactionRepository.save(currentUserTransactionHistory);

        currentUser.setWallet(currentUserWallet);
        currentUser.setTransactionHistory(currentUserTransactionHistory);
        userRepository.save(currentUser);
    }

    @Transactional
    public void buyCurrency(ECryptocurrency currency, Double amount) {
        User currentUser = userService.getCurrentUserEntity();
        Wallet wallet = currentUser.getWallet();
        TransactionHistory transactionHistory = currentUser.getTransactionHistory();

        Double money = wallet.getReferenceCurrency();
        Map<ECryptocurrency, Double> cryptocurrencies = wallet.getCryptocurrencies();

        Optional<Cryptocurrency> coin = cryptocurrencyRepository.findById(currency.id);

        if (coin.isEmpty()) {
            throw new RuntimeException("Cryptocurrency not found with id: \"" + currency.id + "\"");
        }

        double currentPrice = coin.get().getCurrentPrice();
        double price = currentPrice * amount;

        if (price > money) {
            throw new NotEnoughMoneyException();
        }

        // Add the new cryptocurrency to the wallet
        if (!cryptocurrencies.containsKey(currency)) {
            cryptocurrencies.put(currency, amount);
        } else {
            cryptocurrencies.put(currency, cryptocurrencies.get(currency) + amount);
        }

        // Withdraw the reference currency from the wallet
        wallet.setReferenceCurrency(money - price);

        wallet.setCryptocurrencies(cryptocurrencies);
        walletRepository.save(wallet);

        transactionHistory.getTransactions()
                .add(new Transaction(new Date(), ETransaction.BUY_CRYPTOCURRENCY, currency, currentPrice, amount,
                        price));
        transactionRepository.save(transactionHistory);

        currentUser.setWallet(wallet);
        currentUser.setTransactionHistory(transactionHistory);
        userRepository.save(currentUser);
    }

    @Transactional
    public void sellCurrency(ECryptocurrency currency, Double amount) {
        User currentUser = userService.getCurrentUserEntity();
        Wallet wallet = currentUser.getWallet();
        TransactionHistory transactionHistory = currentUser.getTransactionHistory();

        Double money = wallet.getReferenceCurrency();
        Map<ECryptocurrency, Double> cryptocurrencies = wallet.getCryptocurrencies();

        Optional<Cryptocurrency> coin = cryptocurrencyRepository.findById(currency.id);

        if (coin.isEmpty()) {
            throw new RuntimeException("Cryptocurrency not found with id: \"" + currency.id + "\"");
        }

        Double currencyAmountOwned = cryptocurrencies.get(currency);

        if (!cryptocurrencies.containsKey(currency) || currencyAmountOwned < amount) {
            throw new NotEnoughCryptocurrencyException();
        }

        double currentPrice = coin.get().getCurrentPrice();
        double price = currentPrice * amount;

        // Withdraw the cryptocurrency from the wallet
        cryptocurrencies.put(currency, currencyAmountOwned - amount);

        // Add the reference currency to the wallet
        wallet.setReferenceCurrency(money + price);

        wallet.setCryptocurrencies(cryptocurrencies);
        walletRepository.save(wallet);

        transactionHistory.getTransactions()
                .add(new Transaction(new Date(), ETransaction.SELL_CRYPTOCURRENCY, currency, currentPrice, amount,
                        price));
        transactionRepository.save(transactionHistory);

        currentUser.setWallet(wallet);
        currentUser.setTransactionHistory(transactionHistory);
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
        linksResponse.setFacebookUsername(cryptocurrencyDetails.getLinks().getFacebookUsername());
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