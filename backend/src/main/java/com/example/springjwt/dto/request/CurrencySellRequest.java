package com.example.springjwt.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CurrencySellRequest {

    @NotBlank
    private String id;

    @NotBlank
    private Double amount;

    @NotBlank
    private Double price;

}
