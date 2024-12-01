package com.learnx.learnx_backend.Dtos.RequestDtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class StudentDto implements BaseUserDto{
    @NotBlank(message = "Name is required")
    private String name;
    @Email(message = "Email should be not valid")
    private String email;
    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "degree is required")
    private String degree;
}
