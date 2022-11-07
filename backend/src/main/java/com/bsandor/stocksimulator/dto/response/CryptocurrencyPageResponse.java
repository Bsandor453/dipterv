package com.bsandor.stocksimulator.dto.response;

import com.bsandor.stocksimulator.models.cryptocurrency.Cryptocurrency;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class CryptocurrencyPageResponse {

    private List<Cryptocurrency> content;

    private int currentPage;

    private int pageCount;

    private long elementCount;

}



