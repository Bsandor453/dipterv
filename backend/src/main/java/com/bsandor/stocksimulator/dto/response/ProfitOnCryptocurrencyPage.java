package com.bsandor.stocksimulator.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProfitOnCryptocurrencyPage {

    private List<ProfitOnCryptocurrency> content;

    private int currentPage;

    private int pageCount;

    private int elementCount;

}
