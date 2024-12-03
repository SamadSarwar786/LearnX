package com.learnx.learnx_backend.Dtos.ResponseDtos;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;

    private long expiresIn;


    // Getters and setters...
}
