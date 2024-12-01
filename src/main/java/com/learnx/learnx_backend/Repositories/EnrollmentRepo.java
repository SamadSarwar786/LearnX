package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Enrollment;
import com.learnx.learnx_backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudent(User student);  // Get all enrollments for a student

    List<Enrollment> findByCourse(Course course);  // Get all enrollments for a course

    Optional<Enrollment> findByCourseAndStudent(Course course, User student);  // Find a specific enrollment by course and student
}
