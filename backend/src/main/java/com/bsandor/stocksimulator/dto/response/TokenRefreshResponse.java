package com.bsandor.stocksimulator.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRefreshResponse {

    private String username;

    private String accessToken;

    private String type = "Bearer";

    private String refreshToken;

    private Integer expiresInSeconds;

    public TokenRefreshResponse(String username, String accessToken, String refreshToken, Integer expiresInSeconds) {
        this.username = username;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresInSeconds = expiresInSeconds;
    }

}