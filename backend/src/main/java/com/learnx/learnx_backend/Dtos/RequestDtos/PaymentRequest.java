package com.learnx.learnx_backend.Dtos.RequestDtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentRequest {

    @NotBlank(message = "nonce is required and cannot be empty") // checks for null and empty string
    private String nonce;

    @NotNull(message = "courseId is required")
    @Min(value = 1, message = "courseId must be a positive number") // ensure the courseId is positive
    private Long courseId;
}
