package com.example.springjwt.repository;

import com.example.springjwt.models.cryptocurrency.history.CryptocurrencyHistoryDb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptocurrencyHistoryRepository extends MongoRepository<CryptocurrencyHistoryDb, String> {
}
