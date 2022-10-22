package com.example.springjwt.dto.response;

import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyCommunityData;
import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyDeveloperData;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CryptocurrencyDetailsResponse {

    private String id;

    private String description;

    private CryptocurrencyLinksResponse links;

    private String genesisDate;

    private Double votesUpPercentage;

    private Double votesDownPercentage;

    private Double coingeckoScore;

    private Double developerScore;

    private Double communityScore;

    private Double liquidityScore;

    private Double publicInterestScore;

    private CryptocurrencyCommunityData communityData;

    private CryptocurrencyDeveloperData developerData;

}


