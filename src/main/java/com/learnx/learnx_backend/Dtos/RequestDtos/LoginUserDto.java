package com.learnx.learnx_backend.Dtos.RequestDtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginUserDto {

    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "password is required")
    private String password;

}
