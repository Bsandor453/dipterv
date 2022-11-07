package com.bsandor.stocksimulator.repository;

import com.bsandor.stocksimulator.models.transaction.TransactionHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends MongoRepository<TransactionHistory, String> {

}
