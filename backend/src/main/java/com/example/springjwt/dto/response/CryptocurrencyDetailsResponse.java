package com.example.springjwt.dto.response;

import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyCommunityData;
import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyDeveloperData;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyDetailsResponse {

    @JsonProperty("id")
    private String id;

    @JsonProperty("description")
    private String description;

    @JsonProperty("links")
    private CryptocurrencyLinksResponse links;

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


