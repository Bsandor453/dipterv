package com.bsandor.stocksimulator.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotEnoughMoneyException extends RuntimeException {

    public NotEnoughMoneyException() {
        super("Not enough money!");
    }
}
