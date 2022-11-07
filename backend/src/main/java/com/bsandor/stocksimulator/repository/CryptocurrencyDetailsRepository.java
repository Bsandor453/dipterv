package com.bsandor.stocksimulator.repository;

import com.bsandor.stocksimulator.models.cryptocurrency.details.CryptocurrencyDetailsDb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptocurrencyDetailsRepository extends MongoRepository<CryptocurrencyDetailsDb, String> {
}
