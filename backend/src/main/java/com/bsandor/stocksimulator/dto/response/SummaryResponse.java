package com.bsandor.stocksimulator.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SummaryResponse {

    int depositCount;

    int purchaseCount;

    int saleCount;

    int moneyResetCount;

    private double profit;

    private double totalMoneyDeposited;

    private double moneyInWallet;

    private double totalPurchaseAmount;

    private double totalSellAmount;

    private ProfitOnCryptocurrencyPage profitOnCryptocurrencyPage;

}



