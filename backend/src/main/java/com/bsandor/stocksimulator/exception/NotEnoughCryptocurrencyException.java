package com.bsandor.stocksimulator.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughCryptocurrencyException extends RuntimeException {

    public NotEnoughCryptocurrencyException() {
        super("Not enough cryptocurrency!");
    }
}
