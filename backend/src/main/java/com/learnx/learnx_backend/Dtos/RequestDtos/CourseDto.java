package com.learnx.learnx_backend.Dtos.RequestDtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CourseDto {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
}
