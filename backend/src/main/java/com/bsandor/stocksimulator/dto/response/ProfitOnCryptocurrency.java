package com.bsandor.stocksimulator.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfitOnCryptocurrency implements Comparable<ProfitOnCryptocurrency> {

    private String id;

    private String name;

    private Double profit;

    @Override
    public int compareTo(ProfitOnCryptocurrency o) {
        return profit.compareTo(o.profit);
    }
}
