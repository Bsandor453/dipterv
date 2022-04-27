package com.example.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class Transaction {

    private Date date;

    private ETransaction type;

    private ECryptocurrency cryptocurrency;

    private Double amount;

    private Double price;

}
