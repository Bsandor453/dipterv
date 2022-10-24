package com.example.springjwt.configuration;

import com.example.springjwt.security.jwt.AuthEntryPointJwt;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfiguration {

    // Logging
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);
    private static final boolean enableLogging = true;
    private static final int MEMORY_LIMIT_IN_MEGABYTES = 16;
    private static final int API_MAX_REQUESTS_PER_MINUTE = 50;
    private static int previousMinute = -1;
    private static int requestCountThisMinute = 0;
    private final int TIMEOUT = 10000;
    // Coingecko API base endpoint
    @Value("${bsandor.app.cryptocurrencyBaseUrl}")
    private String cryptocurrencyBaseUrl;
    // *Deprecated* Old Coinranking API headers and base endpoint
    @Value("${bsandor.app.rapidApiHostHeaderName}")
    private String apiHostHeaderName;
    @Value("${bsandor.app.rapidApiHostHeaderValue}")
    private String apiHostHeaderValue;
    @Value("${bsandor.app.rapidApiKeyHeaderName}")
    private String apiKeyHeaderName;
    @Value("${bsandor.app.rapidApiKeyHeaderValue}")
    private String apiKeyHeaderValue;
    @Value("${bsandor.app.coinrankingBaseUrl}")
    private String coinrankingBaseUrl;

    // This method returns filter function which will log request data
    // Also logs the number of requests made this minute
    // CoinGecko Free API: "Our Free API* has a rate limit of 10-50 calls/minute"
    private static ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            if (enableLogging) {
                LocalDateTime now = LocalDateTime.now();
                int minute = now.getMinute();
                int second = now.getSecond();

                // Reset the counter on new minute
                if (minute != previousMinute) {
                    requestCountThisMinute = 0;
                    previousMinute = minute;
                }

                // Add one to the number of requests
                requestCountThisMinute++;

                // Log the request
                logger.info("{}/{}. Request ({}. sec): {} {}", requestCountThisMinute, API_MAX_REQUESTS_PER_MINUTE,
                        second, clientRequest.method(), clientRequest.url());
            }
            clientRequest.headers()
                    .forEach((name, values) -> values.forEach(value -> logger.info("{}={}", name, value)));
            return Mono.just(clientRequest);
        });
    }

    @Bean(name = "WebClient")
    public WebClient getWebClient() {
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(cryptocurrencyBaseUrl);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        return WebClient.builder().exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer.defaultCodecs()
                                .maxInMemorySize(MEMORY_LIMIT_IN_MEGABYTES * 1024 * 1024)).build()).filter(logRequest())
                .clientConnector(new ReactorClientHttpConnector(getHttpClient())).uriBuilderFactory(factory)
                .baseUrl(cryptocurrencyBaseUrl).build();
    }

    // *Deprecated* This method creates the WebClient when using the Coinranking API
    @Bean(name = "WebClientCoinranking")
    public WebClient getWebClientCoinranking() {
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(coinrankingBaseUrl);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        return WebClient.builder().exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer.defaultCodecs()
                                .maxInMemorySize(MEMORY_LIMIT_IN_MEGABYTES * 1024 * 1024)).build()).filter(logRequest())
                .clientConnector(new ReactorClientHttpConnector(getHttpClient())).defaultHeaders(httpHeaders -> {
                    httpHeaders.add(apiHostHeaderName, apiHostHeaderValue);
                    httpHeaders.add(apiKeyHeaderName, apiKeyHeaderValue);
                }).uriBuilderFactory(factory).baseUrl(coinrankingBaseUrl).build();
    }

    @Bean
    public HttpClient getHttpClient() {
        return HttpClient.create().option(ChannelOption.CONNECT_TIMEOUT_MILLIS, TIMEOUT)
                .responseTimeout(Duration.ofMillis(TIMEOUT)).doOnConnected(
                        conn -> conn.addHandlerLast(new ReadTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS)));
    }
}
