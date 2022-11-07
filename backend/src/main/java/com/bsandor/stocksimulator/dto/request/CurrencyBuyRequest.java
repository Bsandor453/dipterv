package com.bsandor.stocksimulator.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CurrencyBuyRequest {

    @NotBlank
    private String id;

    @NotBlank
    private Double amount;

}
