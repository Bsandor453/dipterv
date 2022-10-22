package com.example.springjwt.dto.response;

import com.example.springjwt.models.transaction.Transaction;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TransactionResponse {

    private List<Transaction> transactions;

}



