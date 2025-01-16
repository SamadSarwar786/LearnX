package com.learnx.learnx_backend.Dtos.RequestDtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryDto {

    @NotBlank(message = "category name is required")
    String categoryName;

    String description;
}
