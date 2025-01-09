package com.learnx.learnx_backend.Dtos.RequestDtos;

import lombok.Data;

@Data
public class PaymentRequest {
    private String nonce;
    private Long studentId;
    private Long courseId;
}
