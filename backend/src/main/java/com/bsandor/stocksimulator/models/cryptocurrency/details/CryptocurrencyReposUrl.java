package com.bsandor.stocksimulator.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CryptocurrencyReposUrl {

    @JsonProperty("github")
    private List<String> githubRepos;

}
