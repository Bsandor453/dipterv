package com.example.springjwt.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "coins_details")
public class CryptocurrencyDetailsDb {

    @JsonIgnore
    private String id;

    @JsonProperty("description")
    private String description;

    @JsonProperty("links")
    private CryptocurrencyLinksDb links;

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


