package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.CategoryDto;
import com.learnx.learnx_backend.Models.Category;
import com.learnx.learnx_backend.Repositories.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryRepo categoryRepo;

    public Category createCategory(CategoryDto categoryDto) {
        try {
            Category category = new Category();
            category.setName(categoryDto.getCategoryName());
            category.setDescription(categoryDto.getDescription());
            return categoryRepo.save(category);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public List<Category> getAllCategories() {
        try {
            return categoryRepo.findAll();
        }
        catch (Exception e){
            throw new RuntimeException(e);
        }
    }
}
