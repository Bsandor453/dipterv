package com.bsandor.stocksimulator.models.wallet;

import com.bsandor.stocksimulator.models.cryptocurrency.ECryptocurrency;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "wallets")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Wallet {

    @Id
    private String id;

    private Double referenceCurrency;

    private Map<ECryptocurrency, Double> cryptocurrencies;

    public Wallet(Double referenceCurrency, Map<ECryptocurrency, Double> cryptocurrencies) {
        this.referenceCurrency = referenceCurrency;
        this.cryptocurrencies = cryptocurrencies;
    }

}
