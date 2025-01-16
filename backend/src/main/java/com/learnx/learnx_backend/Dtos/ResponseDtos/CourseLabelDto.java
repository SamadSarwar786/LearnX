package com.learnx.learnx_backend.Dtos.ResponseDtos;

import com.learnx.learnx_backend.Models.Category;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CourseLabelDto {
    Long Id;
    String title;
    String description;
    Boolean isPublished;
    String thumbnail;
    Integer price;
    String instructorName;
    Long instructorId;
    Category category;
}