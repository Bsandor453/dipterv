package com.example.springjwt.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyCommunityData {

    @JsonProperty("twitter_followers")
    private Double twitterFollowers;

    @JsonProperty("reddit_subscribers")
    private Double redditSubscribers;

}
