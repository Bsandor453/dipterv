package com.example.springjwt.services;

import com.example.springjwt.dto.response.MappedTransaction;
import com.example.springjwt.exception.NotEnoughCryptocurrencyException;
import com.example.springjwt.exception.NotEnoughMoneyException;
import com.example.springjwt.models.*;
import com.example.springjwt.repository.TransactionRepository;
import com.example.springjwt.repository.UserRepository;
import com.example.springjwt.repository.WalletRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.support.MutableSortDefinition;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@Slf4j
public class CryptocurrencyService {

    @Value("${bsandor.app.cryptoCurrencyStatsUrl}")
    String statsUrl;

    @Value("${bsandor.app.cryptoCurrencyCurrenciesUrl}")
    String currenciesUrl;

    @Value("${bsandor.app.cryptoCurrencyCurrencyUrl}")
    String currencyUrl;

    @Value("${bsandor.app.cryptoCurrencyHistoryUrl}")
    String historyUrl;

    private final WebClient webClient;

    private final int LIMIT = 100;

    private final UserService userService;

    private final UserRepository userRepository;

    private final WalletRepository walletRepository;

    private final TransactionRepository transactionRepository;

    @Autowired
    public CryptocurrencyService(WebClient webClient, UserService userService, UserRepository userRepository, WalletRepository walletRepository, TransactionRepository transactionRepository) {
        this.webClient = webClient;
        this.userService = userService;
        this.userRepository = userRepository;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }

    public String getGlobalStats() {
        return webClient.get()
                .uri(statsUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCurrencies() {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(currenciesUrl)
                        .queryParam("limit", LIMIT)
                        .queryParam("ids", String.join(",", ECryptocurrency.idValues()))
                        .queryParam("x-access-token", "i-have-to-migrate-to-v2")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCurrenciesAll(int currentPage, int pageSize, String sortByProperty, boolean ascending) {
        final String order = ascending ? "asc" : "desc";
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(currenciesUrl)
                        .queryParam("offset", currentPage * pageSize)
                        .queryParam("limit", pageSize)
                        .queryParam("sort", sortByProperty)
                        .queryParam("order", order)
                        .queryParam("x-access-token", "i-have-to-migrate-to-v2")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCurrency(String id) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(currencyUrl + "/" + id)
                        .queryParam("x-access-token", "i-have-to-migrate-to-v2")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCurrencyHistory(String id, String timeframe) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path(currencyUrl + "/" + id + historyUrl + "/" + timeframe)
                        .queryParam("x-access-token", "i-have-to-migrate-to-v2")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public Wallet getWallet() {
        return userService.getCurrentUserEntity().getWallet();
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
                mapped.add(new MappedTransaction(transaction.getDate(),
                        transaction.getType(),
                        transaction.getCryptocurrency().id,
                        transaction.getAmount(),
                        transaction.getPrice()));
            else {
                mapped.add(new MappedTransaction(transaction.getDate(),
                        transaction.getType(),
                        "none",
                        transaction.getAmount(),
                        transaction.getPrice()));
            }
        }

        return mapped;
    }

    public PagedListHolder<MappedTransaction> getTransactionHistory(int currentPage, int pageSize, String sortByProperty, boolean ascending) {
        List<MappedTransaction> transactions = getTransactionsMapped();

        PagedListHolder<MappedTransaction> page = new PagedListHolder<>(transactions, new MutableSortDefinition(sortByProperty, true, ascending));
        page.resort();
        page.setPageSize(pageSize);
        page.setPage(currentPage);

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

        currentUserTransactionHistory.getTransactions().add(new Transaction(new Date(), ETransaction.DEPOSIT_MONEY, null, amount, 0.0));
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

        currentUserTransactionHistory.getTransactions().add(new Transaction(new Date(), ETransaction.RESET_MONEY, null, 0.0, 0.0));
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

        currentUserTransactionHistory.getTransactions().add(new Transaction(new Date(), ETransaction.BUY_CRYPTOCURRENCY, currency, amount, price));
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

        currentUserTransactionHistory.getTransactions().add(new Transaction(new Date(), ETransaction.SELL_CRYPTOCURRENCY, currency, amount, price));
        transactionRepository.save(currentUserTransactionHistory);

        currentUser.setWallet(currentUserWallet);
        currentUser.setTransactionHistory(currentUserTransactionHistory);
        userRepository.save(currentUser);
    }

}