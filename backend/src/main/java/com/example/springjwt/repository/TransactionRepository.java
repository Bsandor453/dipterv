package com.example.springjwt.repository;

import com.example.springjwt.models.TransactionHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends MongoRepository<TransactionHistory, String> {


}
