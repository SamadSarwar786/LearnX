package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseLabelDto;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;


// all user can access these endpoints

@RestController
@RequestMapping("/api/public/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseLabelDto> getAllCourses() {
        return courseService.getAllCourses();
    }
}

