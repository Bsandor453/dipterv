package com.bsandor.stocksimulator.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CryptocurrencyDetails {

    @JsonProperty("id")
    private String id;

    @JsonProperty("description")
    private CryptocurrencyDescription description;

    @JsonProperty("links")
    private CryptocurrencyLinks links;

    @JsonProperty("genesis_date")
    private String genesisDate;

    @JsonProperty("sentiment_votes_up_percentage")
    private double votesUpPercentage;

    @JsonProperty("sentiment_votes_down_percentage")
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
