package com.learnx.learnx_backend.Dtos.ResponseDtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class LessonResponseDto {
    private Long id;
    private String title;
    private String description;
    private Boolean isPublished = false;
    private Boolean isFree = false;
}
