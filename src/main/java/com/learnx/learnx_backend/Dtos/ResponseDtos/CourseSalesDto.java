package com.learnx.learnx_backend.Dtos.ResponseDtos;

import lombok.Data;

@Data
public class CourseSalesDto {
    Long courseId;
    String courseTitle;
    Long salesCount;
}