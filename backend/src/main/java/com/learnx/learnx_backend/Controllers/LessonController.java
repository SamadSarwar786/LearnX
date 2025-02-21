package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.RequestDtos.LessonDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.GeneralResponse;
import com.learnx.learnx_backend.Dtos.ResponseDtos.AllLessonsResponseDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LessonResponseDto;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Services.LessonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class LessonController {

    @Autowired
    LessonService lessonService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping("/public/lessons/course/{courseId}")  // student , instructor and admin anyone can access
    public ResponseEntity<AllLessonsResponseDto> getAllLessons(@PathVariable Long courseId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(lessonService.getAllLessons(courseId,user));
    }

    @GetMapping("/public/lesson/{lessonId}")  //public, student , instructor and admin anyone can access
    public ResponseEntity<Object> getVideoUrl(@PathVariable Long lessonId, @AuthenticationPrincipal User user) {
        String url = lessonService.getLessonURL(lessonId, user);
        Map<String , Object> response = new HashMap<>();
        response.put("url", url);
        response.put("message", "url get successfully");
        response.put("status", "success");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/lesson/course/{courseId}")  // instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponseDto> createLesson(@PathVariable Long courseId, @RequestBody LessonDto lessonDto,@AuthenticationPrincipal Instructor instructor) {
        LessonResponseDto lessonResponseDto = lessonService.createLesson(courseId, lessonDto,instructor);
        return ResponseEntity.ok(lessonResponseDto);
    }
    @PutMapping("/lesson/{lessonId}/course/{courseId}")  // instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<LessonResponseDto> updateLesson(@PathVariable Long lessonId,@PathVariable Long courseId, @RequestBody LessonDto lessonDto,@AuthenticationPrincipal Instructor instructor) {
        LessonResponseDto lessonResponseDto =  lessonService.updateLesson(lessonId,courseId,lessonDto,instructor);
        return ResponseEntity.ok(lessonResponseDto);
    }

    @GetMapping("/lesson/{lessonId}/course/{courseId}/video")  // instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public URL getVideoPutUrl(@PathVariable Long lessonId, @PathVariable Long courseId , @AuthenticationPrincipal Instructor instructor) {
        return lessonService.getVideoPutUrl(lessonId,courseId,instructor);
    }

    @PostMapping("/lesson/{lessonId}/course/{courseId}/video")  // instructor only
    @PreAuthorize("hasRole('INSTRUCTOR')")
    public ResponseEntity<GeneralResponse> videoSaveUpdate(@PathVariable Long lessonId, @PathVariable Long courseId , @AuthenticationPrincipal Instructor instructor) {
        lessonService.videoSaveUpdate(lessonId,courseId,instructor);
        GeneralResponse res = new GeneralResponse();
        res.setMessage("video saved successfully");
        res.setStatus("success");
        return ResponseEntity.ok(res);
    }
}
