package com.bsandor.stocksimulator.models.cryptocurrency.history;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CryptocurrencyHistoryDataDb {

    // UNIX timestamp
    private Long timestamp;

    private double price;

}
