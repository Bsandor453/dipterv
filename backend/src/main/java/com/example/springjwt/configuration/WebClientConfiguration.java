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

import javax.inject.Named;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebClientConfiguration {

    // Coingecko API base endpoint
    @Value("${bsandor.app.cryptocurrencyBaseUrl}")
    String cryptocurrencyBaseUrl;

    // *Deprecated* Old Coinranking API headers and base endpoint
    @Value("${bsandor.app.rapidApiHostHeaderName}")
    String apiHostHeaderName;
    @Value("${bsandor.app.rapidApiHostHeaderValue}")
    String apiHostHeaderValue;
    @Value("${bsandor.app.rapidApiKeyHeaderName}")
    String apiKeyHeaderName;
    @Value("${bsandor.app.rapidApiKeyHeaderValue}")
    String apiKeyHeaderValue;
    @Value("${bsandor.app.coinrankingBaseUrl}")
    String coinrankingBaseUrl;

    // Logging
    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);
    private static final boolean enableLogging = true;

    private final int TIMEOUT = 5000;

    private final int MEMORY_LIMIT_IN_MEGABYTES = 16;

    @Bean
    @Named("WebClient")
    public WebClient getWebClient() {
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(cryptocurrencyBaseUrl);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        return WebClient.builder()
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer
                                .defaultCodecs()
                                .maxInMemorySize(MEMORY_LIMIT_IN_MEGABYTES * 1024 * 1024))
                        .build())
                .filter(logRequest())
                .clientConnector(new ReactorClientHttpConnector(getHttpClient()))
                .uriBuilderFactory(factory)
                .baseUrl(cryptocurrencyBaseUrl)
                .build();
    }

    // *Deprecated* This method creates the WebClient when using the Coinranking API
    @Bean
    @Named("WebClientCoinranking")
    public WebClient getWebClientCoinranking() {
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(coinrankingBaseUrl);
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.NONE);

        return WebClient.builder()
                .exchangeStrategies(ExchangeStrategies.builder()
                        .codecs(configurer -> configurer
                                .defaultCodecs()
                                .maxInMemorySize(MEMORY_LIMIT_IN_MEGABYTES * 1024 * 1024))
                        .build())
                .filter(logRequest())
                .clientConnector(new ReactorClientHttpConnector(getHttpClient()))
                .defaultHeaders(httpHeaders -> {
                    httpHeaders.add(apiHostHeaderName, apiHostHeaderValue);
                    httpHeaders.add(apiKeyHeaderName, apiKeyHeaderValue);
                })
                .uriBuilderFactory(factory)
                .baseUrl(coinrankingBaseUrl)
                .build();
    }

    // This method returns filter function which will log request data
    private static ExchangeFilterFunction logRequest() {
        return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
            logger.info("Request: {} {}", clientRequest.method(), clientRequest.url());
            clientRequest.headers().forEach((name, values) -> values.forEach(value -> logger.info("{}={}", name, value)));
            return Mono.just(clientRequest);
        });
    }

    @Bean
    public HttpClient getHttpClient() {
        return HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, TIMEOUT)
                .responseTimeout(Duration.ofMillis(TIMEOUT))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(TIMEOUT, TimeUnit.MILLISECONDS)));
    }
}
