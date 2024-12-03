package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Enrollment;
import com.learnx.learnx_backend.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepo extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findByStudent(User student);  // Get all enrollments for a student

    List<Enrollment> findByCourse(Course course);  // Get all enrollments for a course

    Optional<Enrollment> findByCourseAndStudent(Course course, User student);  // Find a specific enrollment by course and student

    @Query("SELECT e.course.id, e.course.title, COUNT(e) " +
            "FROM Enrollment e " +
            "WHERE e.course.instructor.id = :instructorId " +
            "GROUP BY e.course.id, e.course.title")
    List<Object[]> findCoursesWithSalesByInstructor(@Param("instructorId") Long instructorId);
}
