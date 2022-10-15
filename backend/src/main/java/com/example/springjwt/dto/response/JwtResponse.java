package com.example.springjwt.dto.response;

import lombok.Data;

@Data
public class JwtResponse {

    private String username;

    private String accessToken;

    private String type = "Bearer";

    private String refreshToken;
    
    private Integer expiresInSeconds;

    public JwtResponse(String username, String accessToken, String refreshToken, Integer expiresInSeconds) {
        this.username = username;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresInSeconds = expiresInSeconds;
    }

}