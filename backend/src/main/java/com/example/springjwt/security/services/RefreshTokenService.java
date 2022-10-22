package com.example.springjwt.security.services;

import com.example.springjwt.exception.TokenRefreshException;
import com.example.springjwt.models.user.RefreshToken;
import com.example.springjwt.repository.RefreshTokenRepository;
import com.example.springjwt.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    @Value("${bsandor.app.jwtRefreshExpirationMs}")
    private Long refreshTokenDurationMs;

    @Autowired
    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, UserRepository userRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }


    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshToken createRefreshToken(String userId) {
        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(userRepository.findById(userId).get());
        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(),
                    "The refresh token has expired. Please make a new sign in request.");
        }

        return token;
    }

    @Transactional
    public void deleteByUserId(String userId, MongoTemplate mongoTemplate) {
        Query query = new Query();
        query.addCriteria(Criteria.where("user.$id").is(userId));
        List<RefreshToken> refreshTokens = mongoTemplate.find(query, RefreshToken.class);

        if (refreshTokens.size() > 1) {
            throw new IllegalStateException("Found more refresh tokens with the same id" + " (" + userId + ") !");
        }

        if (refreshTokens.isEmpty()) {
            throw new IllegalStateException("There is no refresh token with the given id" + " (" + userId + ") !");
        }

        refreshTokenRepository.deleteById(refreshTokens.get(0).getId());
    }

}
