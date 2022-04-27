package com.example.springjwt.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class UserProfileResponse {

    private String userName;

    private String fullName;

    private List<String> roles;

    private String email;

}