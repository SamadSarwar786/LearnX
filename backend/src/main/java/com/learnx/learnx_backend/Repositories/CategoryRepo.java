package com.learnx.learnx_backend.Repositories;

import com.learnx.learnx_backend.Models.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepo extends JpaRepository<Category,Long> {
}
