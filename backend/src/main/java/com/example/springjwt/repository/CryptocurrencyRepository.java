package com.example.springjwt.repository;

import com.example.springjwt.models.Cryptocurrency;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptocurrencyRepository extends MongoRepository<Cryptocurrency, String> {
}
