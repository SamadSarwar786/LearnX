package com.learnx.learnx_backend.Dtos.RequestDtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseUpdateDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
}
