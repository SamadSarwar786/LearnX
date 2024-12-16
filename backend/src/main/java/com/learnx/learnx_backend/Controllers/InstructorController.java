package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.RequestDtos.CourseDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseResDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseSalesDto;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Services.CourseService;
import com.learnx.learnx_backend.Services.EnrollmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/instructor")
@PreAuthorize("hasRole('INSTRUCTOR')")
public class InstructorController {

    @Autowired
    CourseService courseService;

    @Autowired
    EnrollmentService enrollmentService;

    @GetMapping("/courses")
    public List<CourseResDto> getCourses(@AuthenticationPrincipal Instructor instructor) {
        return courseService.getInstructorOwnedCourses(instructor.getId());
    }

    @PostMapping("/course")
    public ResponseEntity<CourseResDto> addCourse(@Valid @RequestBody CourseDto courseDto, @AuthenticationPrincipal Instructor instructor) {
        CourseResDto createdCourse = courseService.createCourse(courseDto, instructor);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCourse);
    }

    @PutMapping("/course")
    public String updateCourse() {
        return "update courses";
    }

    @PostMapping("/course/{courseId}/lesson")
    public String addLesson(@PathVariable Long courseId) {
        return "added lesson";
    }

    @PutMapping("/course/{courseId}/lesson")
    public String updateLesson(@PathVariable Long courseId) {
        return "update lesson";
    }

    @GetMapping("/course-sales")
    public ResponseEntity<List<CourseSalesDto>> getCoursesWithSales(@AuthenticationPrincipal Instructor instructor) {
        List<CourseSalesDto> coursesWithSales = enrollmentService.getCoursesWithSalesByInstructor(instructor.getId());
        return ResponseEntity.ok(coursesWithSales);
    }
}
