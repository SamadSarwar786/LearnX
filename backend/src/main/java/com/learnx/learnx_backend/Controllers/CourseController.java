package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.RequestDtos.CourseDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseResDto;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Services.CourseService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping
    public ResponseEntity<CourseResDto> createCourse(@Valid @RequestBody CourseDto courseDto, @AuthenticationPrincipal Instructor instructor) {
        CourseResDto createdCourse = courseService.createCourse(courseDto, instructor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    @GetMapping
    @PreAuthorize("permitAll()")
    public List<CourseResDto> getAllCourses() {
        return courseService.getAllCourses();
    }
}

