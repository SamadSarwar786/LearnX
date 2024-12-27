package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LessonRepo extends JpaRepository<Lesson,Long> {
    List<Lesson> findAllByCourseId(Long courseId);

    Optional<Lesson> findBySequenceNumber(Long SequenceNumber);
}
