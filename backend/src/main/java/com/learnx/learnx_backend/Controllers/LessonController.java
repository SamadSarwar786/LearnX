package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.RequestDtos.LessonDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LessonPreSignedUrlResponseDto;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Lesson;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class LessonController {

    @Autowired
    LessonService lessonService;

    @GetMapping("/lesson/{lessonId}/course/{courseId}")  // student , instructor and admin anyone can access
    public ResponseEntity<Object> getLessonURL(@PathVariable Long lessonId, @AuthenticationPrincipal User user) {
        String url = lessonService.getLessonURL(lessonId, user);
        Map<String , Object> response = new HashMap<>();
        response.put("url", url);
        response.put("message", "url get successfully");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/lessons/course/{courseId}")  // student , instructor and admin anyone can access
      public List<Lesson> getAllLessons(@PathVariable Long courseId) {
         return lessonService.getAllLessons(courseId);
    }
    @PostMapping("/lesson/course/{courseId}")  // instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonPreSignedUrlResponseDto> uploadLesson(@AuthenticationPrincipal Instructor instructor, @PathVariable Long courseId, @RequestBody LessonDto lessonDto) {
        LessonPreSignedUrlResponseDto lessonResponseDto = lessonService.saveLessonAndGetPutUrl(instructor, courseId, lessonDto);
        return ResponseEntity.ok(lessonResponseDto);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/lesson/{lessonId}/upload-successful")  // uploaded lesson successfully
    public ResponseEntity<Object> handleUploadSuccessful(@PathVariable Long lessonId) {
       boolean isUpdated =  lessonService.handleUploadSuccessful(lessonId);
       Map<String , Object> response = Map.of("message", "lesson status updated successfully", "status", isUpdated ? "success" : "fail");
       return ResponseEntity.ok(response);
    }
}
