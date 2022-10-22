package com.example.springjwt.dto.response;

import com.example.springjwt.models.transaction.ETransaction;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class MappedTransaction {

    private Date date;

    private ETransaction type;

    private String cryptocurrencyId;

    private Double amount;

    private Double price;
}
