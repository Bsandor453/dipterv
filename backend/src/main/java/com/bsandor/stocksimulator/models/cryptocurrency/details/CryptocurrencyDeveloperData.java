package com.bsandor.stocksimulator.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyDeveloperData {

    @JsonProperty("forks")
    private int forks;

    @JsonProperty("stars")
    private int stars;

    @JsonProperty("subscribers")
    private int subscribers;

    @JsonProperty("total_issues")
    private int totalIssues;

    @JsonProperty("closed_issues")
    private int closedIssues;

    @JsonProperty("pull_requests_merged")
    private int pullRequestsMerged;

    @JsonProperty("pull_request_contributors")
    private int pullRequestContributors;

}
