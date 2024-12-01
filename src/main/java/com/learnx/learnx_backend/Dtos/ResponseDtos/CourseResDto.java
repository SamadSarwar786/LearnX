package com.learnx.learnx_backend.Dtos.ResponseDtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseResDto {
    Long courseId;
    String courseName;
    String courseDescription;
    String instructorName;
}
