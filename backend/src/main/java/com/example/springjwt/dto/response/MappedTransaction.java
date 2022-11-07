package com.example.springjwt.dto.response;

import com.example.springjwt.models.transaction.ETransaction;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class MappedTransaction {

    // The date of the transaction
    private Date date;

    // The type of the transaction
    private ETransaction type;

    // The type of the cryptocurrency in the transaction
    private String cryptocurrencyId;

    // The unit price of the cryptocurrency in the transaction
    private Double price;

    // The amount of cryptocurrency bought or sold in the transaction
    private Double amount;

    // The total price paid or received by the transaction
    private Double priceTotal;

}
