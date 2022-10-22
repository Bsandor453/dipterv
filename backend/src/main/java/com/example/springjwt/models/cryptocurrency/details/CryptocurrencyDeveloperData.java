package com.example.springjwt.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyDeveloperData {

    @JsonProperty("forks")
    private Double forks;

    @JsonProperty("stars")
    private Double stars;

    @JsonProperty("subscribers")
    private Double subscribers;

    @JsonProperty("total_issues")
    private Double totalIssues;

    @JsonProperty("closed_issues")
    private Double closedIssues;

    @JsonProperty("pull_requests_merged")
    private Double pullRequestsMerged;

    @JsonProperty("pull_request_contributors")
    private Double pullRequestContributors;

}
