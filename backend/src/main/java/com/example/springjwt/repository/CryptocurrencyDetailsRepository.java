package com.example.springjwt.repository;

import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyDetailsDb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptocurrencyDetailsRepository extends MongoRepository<CryptocurrencyDetailsDb, String> {
}
