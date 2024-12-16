package com.learnx.learnx_backend.Dtos.ResponseDtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LessonResponseDto {
    Long lessonId;
//    URL preSignedThumbnailUrl;
    String title;
    String preSignedVideoUrl;
}
