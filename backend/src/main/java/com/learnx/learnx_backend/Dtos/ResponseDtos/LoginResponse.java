package com.learnx.learnx_backend.Dtos.ResponseDtos;

import com.learnx.learnx_backend.Enums.Role;
import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private Role role;

    // Getters and setters...
}
