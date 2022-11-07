package com.bsandor.stocksimulator.dto.request;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserProfileUpdateRequest {

    @NotBlank
    private String userName;

    @NotBlank
    private String fullName;

    @NotBlank
    private String email;

}