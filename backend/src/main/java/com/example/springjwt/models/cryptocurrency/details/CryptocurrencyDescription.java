package com.example.springjwt.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyDescription {

    @JsonProperty("en")
    private CryptocurrencyDescription description;

    @JsonProperty("links")
    private CryptocurrencyLinks links;

    @JsonProperty("genesis_date")
    private String genesisDate;

    @JsonProperty("sentiment_votes_up_percentage")
    private Double votesUpPercentage;

    @JsonProperty("sentiment_votes_down_percentage")
    private Double votesDownPercentage;

    @JsonProperty("coingecko_score")
    private Double coingeckoScore;

    @JsonProperty("developer_score")
    private Double developerScore;

    @JsonProperty("community_score")
    private Double communityScore;

    @JsonProperty("liquidity_score")
    private Double liquidityScore;

    @JsonProperty("public_interest_score")
    private Double publicInterestScore;

    @JsonProperty("community_data")
    private CryptocurrencyCommunityData communityData;

    @JsonProperty("developer_data")
    private CryptocurrencyDeveloperData developerData;

}