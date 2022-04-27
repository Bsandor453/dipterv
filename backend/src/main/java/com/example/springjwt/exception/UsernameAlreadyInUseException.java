package com.example.springjwt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UsernameAlreadyInUseException extends RuntimeException {

    public UsernameAlreadyInUseException(String username) {
        super(String.format("User already exists by username '%s'", username));
    }
}