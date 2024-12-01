package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Long> {
}
