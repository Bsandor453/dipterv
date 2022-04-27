package com.example.springjwt.repository;

import com.example.springjwt.models.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {

    @Override
    Optional<RefreshToken> findById(String id);

    Optional<RefreshToken> findByToken(String token);

}