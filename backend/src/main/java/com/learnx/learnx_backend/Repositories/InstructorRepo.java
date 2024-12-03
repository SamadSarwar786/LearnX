package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepo extends JpaRepository<Instructor, Long> {
}
