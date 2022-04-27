package com.example.springjwt.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "transactions")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransactionHistory {

    @Id
    private String id;

    private List<Transaction> transactions = new ArrayList<>();

}
