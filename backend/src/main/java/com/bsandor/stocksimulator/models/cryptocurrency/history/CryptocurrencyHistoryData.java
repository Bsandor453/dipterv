package com.bsandor.stocksimulator.models.cryptocurrency.history;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class CryptocurrencyHistoryData {

    @JsonProperty("prices")
    private List<List<Double>> historyData;

}
