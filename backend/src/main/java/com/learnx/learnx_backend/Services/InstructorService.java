package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Repositories.InstructorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepo instructorRepo;

    public List<Instructor> getAllInstructors(){
        return instructorRepo.findAll();
    }
}
