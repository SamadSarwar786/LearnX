package com.learnx.learnx_backend.Dtos.RequestDtos;

import lombok.Data;

@Data
public class LessonDto {
   private Long sequenceNumber;
   private String title;
   private String description;
}
