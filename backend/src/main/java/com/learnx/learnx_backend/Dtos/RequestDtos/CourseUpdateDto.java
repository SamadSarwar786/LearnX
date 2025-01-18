package com.learnx.learnx_backend.Dtos.RequestDtos;

import lombok.Data;

@Data
public class CourseUpdateDto {
    private String title;
    private String description;
    private Boolean isPublished;
    private Integer price;
    private Long categoryId;
}
