package com.bsandor.stocksimulator.models.cryptocurrency.history;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@Document(collection = "coins_histories")
public class CryptocurrencyHistoryDb {

    @JsonIgnore
    private String id;

    @JsonProperty("history_24h")
    private List<CryptocurrencyHistoryDataDb> history24h;

    @JsonProperty("history_7d")
    private List<CryptocurrencyHistoryDataDb> history7d;

    @JsonProperty("history_30d")
    private List<CryptocurrencyHistoryDataDb> history30d;

    @JsonProperty("history_1y")
    private List<CryptocurrencyHistoryDataDb> history1y;

    @JsonProperty("history_max")
    private List<CryptocurrencyHistoryDataDb> historyMax;

}
