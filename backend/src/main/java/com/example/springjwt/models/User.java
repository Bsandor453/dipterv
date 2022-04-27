package com.example.springjwt.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
@NoArgsConstructor
@Getter
@Setter
public class User {

    @Id
    private String id;

    @NotBlank
    @Size(min = 5, max = 50)
    private String username;

    @NotBlank
    @Size(max = 100)
    private String fullName;

    @NotBlank
    @Size(max = 100)
    @Email
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    @DBRef
    private Set<Role> roles = new HashSet<>();

    @DBRef
    private Wallet wallet = new Wallet();

    @DBRef
    private TransactionHistory transactionHistory = new TransactionHistory();

    public User(String username, String fullName, String email, String password) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
    }

}
