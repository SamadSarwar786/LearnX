package com.learnx.learnx_backend.Dtos.RequestDtos;

import com.learnx.learnx_backend.Enums.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Set;

@Data
public class RegisterUserDto {

    @NotBlank(message = "Username cannot be empty")
    private String email;

    @NotBlank(message = "Name cannot be empty")
    private String name;

    @NotBlank(message = "Password cannot be empty")
    private String password;
    @NotNull(message = "Role cannot be empty")
    private Role role;

}
