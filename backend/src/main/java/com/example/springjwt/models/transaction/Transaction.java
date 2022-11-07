package com.example.springjwt.models.transaction;

import com.example.springjwt.models.cryptocurrency.ECryptocurrency;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Transaction {

    // The date of the transaction
    private Date date;

    // The type of the transaction
    private ETransaction type;

    // The type of the cryptocurrency in the transaction
    private ECryptocurrency cryptocurrency;

    // The unit price of the cryptocurrency in the transaction
    private Double price;

    // The amount of cryptocurrency bought or sold in the transaction
    private Double amount;

    // The total price paid or received by the transaction
    private Double priceTotal;

}
