package com.example.springjwt.controllers;

import com.example.springjwt.dto.request.CurrencyBuyRequest;
import com.example.springjwt.dto.request.CurrencySellRequest;
import com.example.springjwt.dto.response.*;
import com.example.springjwt.models.cryptocurrency.Cryptocurrency;
import com.example.springjwt.models.cryptocurrency.ECryptocurrency;
import com.example.springjwt.models.cryptocurrency.history.CryptocurrencyHistoryDb;
import com.example.springjwt.models.cryptocurrency.history.ETimeframe;
import com.example.springjwt.models.wallet.Wallet;
import com.example.springjwt.services.CryptocurrencyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequestMapping("/api/cryptocurrency")
@PreAuthorize("hasRole('ROLE_USER')")
@Slf4j
public class CryptocurrencyController {

    private final CryptocurrencyService cryptocurrencyService;

    @Autowired
    public CryptocurrencyController(CryptocurrencyService cryptocurrencyService) {
        this.cryptocurrencyService = cryptocurrencyService;
    }

    @GetMapping("/all")
    public ResponseEntity<CryptocurrencyPageResponse> getCurrencies(@RequestParam Integer page,
                                                                    @RequestParam Integer size,
                                                                    @RequestParam String sortBy,
                                                                    @RequestParam Boolean asc,
                                                                    @RequestParam String search) {

        Page<Cryptocurrency> cryptocurrencyPage = cryptocurrencyService.getCurrencies(page, size, sortBy, asc, search);

        // The backend counts pages from index 0, the frontend from index 1
        // We have to add 1 to the current page number
        return ResponseEntity.ok(
                new CryptocurrencyPageResponse(cryptocurrencyPage.getContent(), cryptocurrencyPage.getNumber() + 1,
                        cryptocurrencyPage.getTotalPages(), cryptocurrencyPage.getTotalElements()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CryptocurrencyDetailsResponse> getCurrency(@PathVariable String id) {
        return ResponseEntity.ok(cryptocurrencyService.getCryptocurrencyDetails(id));
    }

    @GetMapping("/ids/{ids}")
    public ResponseEntity<List<Cryptocurrency>> getCurrenciesByIds(@PathVariable List<String> ids) {
        return ResponseEntity.ok(cryptocurrencyService.getCurrenciesWithIds(ids));
    }

    @GetMapping("/wallet/coins")
    public ResponseEntity<List<Cryptocurrency>> getCurrenciesInWallet() {
        return ResponseEntity.ok(cryptocurrencyService.getCurrenciesInWallet());
    }

    @GetMapping("/transactions/coins")
    public ResponseEntity<List<Cryptocurrency>> getCurrenciesInTransactions() {
        return ResponseEntity.ok(cryptocurrencyService.getCurrenciesInTransactions());
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<CryptocurrencyHistoryDb> getCurrencyHistory(@PathVariable String id,
                                                                      @RequestParam String timeframe) {
        return ResponseEntity.ok(cryptocurrencyService.getCryptocurrencyHistory(id,
                ETimeframe.getEnumValueFromDaysAgoString(timeframe)));
    }

    @GetMapping("/wallet")
    public ResponseEntity<WalletResponse> getWallet() {
        Wallet wallet = cryptocurrencyService.getWallet();
        return ResponseEntity.ok(new WalletResponse(wallet.getReferenceCurrency(),
                cryptocurrencyService.getWalletCryptocurrenciesMapped()));
    }

    @GetMapping("/transactions")
    public ResponseEntity<TransactionPageResponse> getTransactions(@RequestParam Integer page,
                                                                   @RequestParam Integer size,
                                                                   @RequestParam String sortBy,
                                                                   @RequestParam Boolean asc) {
        PagedListHolder<MappedTransaction> transactionPage =
                cryptocurrencyService.getTransactionHistory(page, size, sortBy, asc);

        // The backend counts pages from index 0, the frontend from index 1
        // We have to add 1 to the current page number
        return ResponseEntity.ok(
                new TransactionPageResponse(transactionPage.getPageList(), transactionPage.getPage() + 1,
                        transactionPage.getPageCount(), transactionPage.getNrOfElements()));
    }

    @PostMapping("/depositmoney")
    public ResponseEntity<String> depositMoney(@RequestParam Double amount) {
        cryptocurrencyService.depositMoney(amount);
        return ResponseEntity.ok("Money deposit successful");
    }

    @PostMapping("/resetmoney")
    public ResponseEntity<String> resetMoney() {
        cryptocurrencyService.resetMoney();
        return ResponseEntity.ok("Money reset successful");
    }

    @PostMapping("/buy")
    public ResponseEntity<String> buyCurrency(@RequestBody CurrencyBuyRequest currencyBuyRequest) {
        ECryptocurrency cryptocurrency = ECryptocurrency.getById(currencyBuyRequest.getId());
        cryptocurrencyService.buyCurrency(cryptocurrency, currencyBuyRequest.getAmount(),
                currencyBuyRequest.getPrice());
        return ResponseEntity.ok("Purchase successful");
    }

    @PostMapping("/sell")
    public ResponseEntity<String> sellCurrency(@RequestBody CurrencySellRequest currencySellRequest) {
        ECryptocurrency cryptocurrency = ECryptocurrency.getById(currencySellRequest.getId());
        cryptocurrencyService.sellCurrency(cryptocurrency, currencySellRequest.getAmount(),
                currencySellRequest.getPrice());
        return ResponseEntity.ok("Sale successful");
    }
}
