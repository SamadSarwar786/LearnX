package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Services.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@PreAuthorize("hasRole('ADMIN')")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private InstructorService instructorService;

    @GetMapping("/instructors")
    public List<Instructor> getInstructors() {
        return instructorService.getAllInstructors();
    }

    @GetMapping("/students")
    public List<Student> getStudents() {
        return new ArrayList<>();
    }
}
