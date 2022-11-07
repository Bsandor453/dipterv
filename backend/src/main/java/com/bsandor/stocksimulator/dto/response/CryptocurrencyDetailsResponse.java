package com.bsandor.stocksimulator.dto.response;

import com.bsandor.stocksimulator.models.cryptocurrency.SparklineData;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyCommunityData;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyDeveloperData;
import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyLinksDb;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.index.Indexed;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CryptocurrencyDetailsResponse {

    @JsonProperty("id")
    private String id;

    @JsonProperty("symbol")
    private String symbol;

    @JsonProperty("name")
    @Indexed
    private String name;

    @JsonProperty("image")
    private String image;

    @JsonProperty("current_price")
    private double currentPrice;

    @JsonProperty("market_cap")
    private double marketCap;

    @JsonProperty("market_cap_rank")
    private int marketCapRank;

    @JsonProperty("fully_diluted_valuation")
    private double fullyDilutedValuation;

    @JsonProperty("total_volume")
    private double totalVolume;

    @JsonProperty("high_24h")
    private double high24h;

    @JsonProperty("low_24h")
    private double low24h;

    @JsonProperty("price_change_24h")
    private double priceChange24h;

    @JsonProperty("price_change_percentage_24h")
    private double priceChangePercentage24h;

    @JsonProperty("market_cap_change_24h")
    private double marketCapChange24h;

    @JsonProperty("market_cap_change_percentage_24h")
    private double marketCapChangePercentage24h;

    @JsonProperty("circulating_supply")
    private double circulatingSupply;

    @JsonProperty("total_supply")
    private double totalSupply;

    @JsonProperty("max_supply")
    private double maxSupply;

    @JsonProperty("ath")
    private double ath;

    @JsonProperty("ath_change_percentage")
    private double athChangePercentage;

    @JsonProperty("ath_date")
    private String athDate;

    @JsonProperty("atl")
    private double atl;

    @JsonProperty("atl_change_percentage")
    private double atlChangePercentage;

    @JsonProperty("atl_date")
    private String atlDate;

    @JsonProperty("sparkline_in_7d")
    private SparklineData sparklineIn7d;

    @JsonProperty("price_change_percentage_1h_in_currency")
    private double priceChangePercentage1hInCurrency;

    @JsonProperty("price_change_percentage_24h_in_currency")
    private double priceChangePercentage24hInCurrency;

    @JsonProperty("price_change_percentage_7d_in_currency")
    private double priceChangePercentage7dInCurrency;

    @JsonProperty("description")
    private String description;

    @JsonProperty("links")
    private CryptocurrencyLinksDb links;

    @JsonProperty("genesis_date")
    private String genesisDate;

    @JsonProperty("votes_up_percentage")
    private double votesUpPercentage;

    @JsonProperty("votes_down_percentage")
    private double votesDownPercentage;

    @JsonProperty("coingecko_score")
    private double coingeckoScore;

    @JsonProperty("developer_score")
    private double developerScore;

    @JsonProperty("community_score")
    private double communityScore;

    @JsonProperty("liquidity_score")
    private double liquidityScore;

    @JsonProperty("public_interest_score")
    private double publicInterestScore;

    @JsonProperty("community_data")
    private CryptocurrencyCommunityData communityData;

    @JsonProperty("developer_data")
    private CryptocurrencyDeveloperData developerData;

}
