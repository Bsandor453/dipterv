package com.bsandor.stocksimulator.repository;

import com.bsandor.stocksimulator.models.wallet.Wallet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends MongoRepository<Wallet, String> {

}
