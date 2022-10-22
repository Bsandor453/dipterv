package com.example.springjwt.models.transaction;

import com.example.springjwt.models.cryptocurrency.ECryptocurrency;
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
