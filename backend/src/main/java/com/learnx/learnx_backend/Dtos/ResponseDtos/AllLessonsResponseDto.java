package com.learnx.learnx_backend.Dtos.ResponseDtos;

import com.learnx.learnx_backend.Models.Lesson;
import lombok.Data;

import java.util.List;

@Data
public class AllLessonsResponseDto {
    List<Lesson> lessons;
    private Boolean isPaid = false;
}
