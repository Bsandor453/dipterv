package com.example.springjwt.repository;

import com.example.springjwt.models.cryptocurrency.details.CryptocurrencyDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CryptocurrencyDetailsRepository extends MongoRepository<CryptocurrencyDetails, String> {
}
