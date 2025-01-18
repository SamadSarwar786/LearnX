package com.learnx.learnx_backend.Dtos.ResponseDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LessonPreSignedUrlResponseDto {
    Long lessonId;
    String title;
    String preSignedVideoUrl;
}
