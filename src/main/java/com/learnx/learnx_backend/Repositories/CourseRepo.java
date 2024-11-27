package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseRepo extends JpaRepository<Course,Long> {

    List<Course> findAllByInstructorId(Long instructorId);
}
