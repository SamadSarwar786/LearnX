package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseResDto;
import com.learnx.learnx_backend.Services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;


// all user can access these endpoints

@RestController
@RequestMapping("/api/public/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public Page<CourseResDto> getAllCourses(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        return courseService.getAllCourses(page,size);
    }
}

