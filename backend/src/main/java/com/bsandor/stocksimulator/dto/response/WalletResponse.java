package com.bsandor.stocksimulator.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class WalletResponse {

    private Double referenceCurrency;

    private Map<String, Double> cryptocurrencies;

}



