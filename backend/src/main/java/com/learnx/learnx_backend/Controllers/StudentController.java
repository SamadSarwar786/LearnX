package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseResDto;
import com.learnx.learnx_backend.Models.Enrollment;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Services.CourseService;
import com.learnx.learnx_backend.Services.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    @Autowired
    CourseService courseService;

    @Autowired
    EnrollmentService enrollmentService;

    @GetMapping("/courses")
    public List<CourseResDto> getCourses(@AuthenticationPrincipal Student student) {
        return courseService.getStudentOwnedCourses(student.getId());
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity enrollCourse(@AuthenticationPrincipal Student student, @PathVariable Long courseId) {
        try {
            Enrollment enrollment = enrollmentService.enrollStudent(student, courseId, "abcedfefg", 500);
            return ResponseEntity.ok().body("Enrolled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
