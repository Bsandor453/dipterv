package com.example.springjwt.models.cryptocurrency.details;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@Document(collection = "coins_details")
public class CryptocurrencyDetails {

    @JsonProperty("description")
    private CryptocurrencyDescription description;

    @JsonProperty("links")
    private CryptocurrencyDescription links;

}
