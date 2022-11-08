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

    private ProfitableCoinResponse mostProfitableCoin;

    private ProfitableCoinResponse leastProfitableCoin;

    private double totalMoneyDeposited;

    private double moneyInWallet;

    private double totalPurchaseAmount;

    private double totalSaleAmount;

    private ProfitOnCryptocurrencyPage profitOnCryptocurrencyPage;

}



