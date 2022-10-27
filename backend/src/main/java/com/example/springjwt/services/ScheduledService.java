package com.example.springjwt.services;

import com.example.springjwt.models.cryptocurrency.Cryptocurrency;
import com.example.springjwt.models.cryptocurrency.ECryptocurrency;
import com.example.springjwt.repository.CryptocurrencyRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class ScheduledService {

    private final WebClient webClient;
    private final CryptocurrencyRepository cryptocurrencyRepository;
    private final int perPage = 50;
    @Value("${bsandor.app.cryptocurrencyListUrl}")
    String listUrl;

    @Autowired
    public ScheduledService(@Qualifier("WebClient") WebClient webClient,
                            CryptocurrencyRepository cryptocurrencyRepository) {
        this.webClient = webClient;
        this.cryptocurrencyRepository = cryptocurrencyRepository;
    }

    // Every odd minute, in every 5 seconds from second 0 to second 45 (10 times per minute)
    // Update the data for the first half of the coins (first 500)
    @Scheduled(cron = "0-45/5 1-59/2 * * * *")
    public void updateCryptocurrenciesFirstHalf() {
        LocalDateTime now = LocalDateTime.now();
        int minute = now.getMinute();
        int second = now.getSecond();

        int page = second / 5 + 1;

        log.info("[Coin data update] Minute (odd): " + minute + ", Second: " + second + " ---> " +
                "Updating coins page " + page);
        List<Cryptocurrency> cryptocurrencies = getCurrencies(page, perPage);

        cryptocurrencyRepository.saveAll(cryptocurrencies);
    }

    // Every even minute, in every 5 seconds from second 0 to second 45 (10 times per minute)
    // Update the data for the second half of the coins (last 500)
    @Scheduled(cron = "0-45/5 0-59/2 * * * *")
    public void updateCryptocurrenciesSecondHalf() {
        LocalDateTime now = LocalDateTime.now();
        int minute = now.getMinute();
        int second = now.getSecond();

        int page = second / 5 + 1 + 10;

        log.info("[Coin data update] Minute (even): " + minute + ", Second: " + second + " ---> " +
                "Updating coins page " + page);
        List<Cryptocurrency> cryptocurrencies = getCurrencies(page, perPage);

        cryptocurrencyRepository.saveAll(cryptocurrencies);
    }

    public List<Cryptocurrency> getCurrencies(Integer page, Integer size) {
        Flux<Cryptocurrency> response = webClient.get()
                .uri(uriBuilder -> uriBuilder.path(listUrl).queryParam("vs_currency", "usd")
                        .queryParam("ids", String.join(",", ECryptocurrency.getIdList(page, size)))
                        .queryParam("order", "market_cap_desc").queryParam("per_page", size).queryParam("page", 1)
                        .queryParam("sparkline", true).queryParam("price_change_percentage", "1h,24h,7d").build())
                .retrieve().bodyToFlux(Cryptocurrency.class);

        return response.collectList().block();
    }

}


