package com.learnx.learnx_backend.Dtos.ResponseDtos;

import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String message;
    private long timestamp;
}
