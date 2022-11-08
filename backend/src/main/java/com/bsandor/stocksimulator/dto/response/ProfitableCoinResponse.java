package com.bsandor.stocksimulator.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfitableCoinResponse {

    private String name;

    private String imageUrl;

    private double profit;

}
