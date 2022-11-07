package com.bsandor.stocksimulator.repository;

import com.bsandor.stocksimulator.models.cryptocurrency.Cryptocurrency;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface CryptocurrencyRepository extends MongoRepository<Cryptocurrency, String> {
    Page<Cryptocurrency> findAllByNameContainsIgnoreCase(String namePart, Pageable pageable);

    List<Cryptocurrency> findAllByIdIn(Collection<String> ids);
}
