package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LessonRepo extends JpaRepository<Lesson,Long> {
    List<Lesson> findAllByCourseId(Long courseId);
}
