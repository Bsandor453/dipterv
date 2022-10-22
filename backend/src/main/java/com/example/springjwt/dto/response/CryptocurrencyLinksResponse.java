package com.example.springjwt.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CryptocurrencyLinksResponse {

    @JsonProperty("homepage")
    private List<String> homepage;

    @JsonProperty("blockchain_site")
    private List<String> blockchainSite;

    @JsonProperty("official_forum_url")
    private List<String> officialForumUrl;

    @JsonProperty("chat_url")
    private List<String> chatUrl;

    @JsonProperty("announcement_url")
    private List<String> announcementUrl;

    @JsonProperty("twitter_screen_name")
    private String twitterUsername;

    @JsonProperty("subreddit_url")
    private String subredditUrl;

    @JsonProperty("github_repos")
    private List<String> githubRepos;

}
