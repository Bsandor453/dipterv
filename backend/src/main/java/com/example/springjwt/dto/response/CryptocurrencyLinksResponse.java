package com.example.springjwt.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CryptocurrencyLinksResponse {

    private List<String> homepage;

    private List<String> blockchainSite;

    private List<String> officialForumUrl;

    private List<String> chatUrl;

    private List<String> announcementUrl;

    private String twitterUsername;

    private String subredditUrl;

    private List<String> githubRepos;

}
