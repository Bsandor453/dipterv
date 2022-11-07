package com.bsandor.stocksimulator.repository;

import com.bsandor.stocksimulator.models.cryptocurrency.history.CryptocurrencyHistoryDb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptocurrencyHistoryRepository extends MongoRepository<CryptocurrencyHistoryDb, String> {
}
