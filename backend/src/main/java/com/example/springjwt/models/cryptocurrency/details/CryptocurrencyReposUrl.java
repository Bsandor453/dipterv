package com.example.springjwt.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
public class CryptocurrencyReposUrl {

    @JsonProperty("github")
    private List<String> githubRepos;

}
