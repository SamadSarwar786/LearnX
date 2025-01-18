package com.learnx.learnx_backend.Dtos.RequestDtos;

import lombok.Data;

@Data
public class LessonDto {
   private String title;
   private String description;
   private Boolean isPublished;
   private Boolean isFree;
}
