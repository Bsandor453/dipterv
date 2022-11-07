package com.bsandor.stocksimulator.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyCommunityData {

    @JsonProperty("twitter_followers")
    private int twitterFollowers;

    @JsonProperty("reddit_subscribers")
    private int redditSubscribers;

}
