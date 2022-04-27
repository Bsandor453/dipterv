package com.example.springjwt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TransactionPageResponse {

    private List<MappedTransaction> transactions;

    private int currentPage;

    private int pageCount;

    private int elementCount;

}



