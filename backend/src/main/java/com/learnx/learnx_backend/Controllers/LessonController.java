package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.RequestDtos.LessonDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LessonResponseDto;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Services.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
public class LessonController {

    @Autowired
    LessonService lessonService;

    @GetMapping("/lesson/{lessonId}/course/{courseId}")  // student , instructor and admin anyone can access
    public ResponseEntity<Object> getLesson(@PathVariable Long lessonId, @AuthenticationPrincipal User user) {
        String url = lessonService.getLessonURL(lessonId, user);
        Map<String , Object> response = new HashMap<>();
        response.put("url", url);
        response.put("message", "url get successfully");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/lesson/course/{courseId}")  // instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponseDto> uploadLesson(@AuthenticationPrincipal Instructor instructor, @PathVariable Long courseId, @RequestBody LessonDto lessonDto) {
        LessonResponseDto lessonResponseDto = lessonService.saveLessonAndGetPutUrl(instructor, courseId, lessonDto);
        return ResponseEntity.ok(lessonResponseDto);
    }

    @PreAuthorize("hasRole('INSTRUCTOR')")
    @PostMapping("/lesson/{lessonId}/update")  // update lesson
    public ResponseEntity<Object> updateLessonStatus(@PathVariable Long lessonId) {
       boolean isUpdated =  lessonService.updateLessonStatus(lessonId);
       Map<String , Object> response = Map.of("message", "lesson status updated successfully", "status", isUpdated ? "success" : "fail");
       return ResponseEntity.ok(response);
    }
}
