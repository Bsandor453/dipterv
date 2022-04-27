package com.example.springjwt.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import java.time.Instant;

@Document(collection = "refreshtokens")
@NoArgsConstructor
@Getter
@Setter
public class RefreshToken {

    @Id
    private String id;

    @DBRef
    private User user;

    @NotBlank
    @Indexed(unique = true)
    private String token;

    @NotBlank
    private Instant expiryDate;

}