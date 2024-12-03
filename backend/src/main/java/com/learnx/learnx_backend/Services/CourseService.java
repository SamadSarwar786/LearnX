package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.CourseDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseResDto;
import com.learnx.learnx_backend.Exceptions.ResourceNotFoundException;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Repositories.CourseRepo;
import com.learnx.learnx_backend.Repositories.InstructorRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private InstructorRepo instructorRepo;

    @Autowired
    ModelMapper modelMapper;

    public CourseResDto createCourse(CourseDto courseDto) {

        Long instructorId = courseDto.getInstructorId();
        // Check if the instructor exists in the database

        Instructor instructor = instructorRepo.findById(instructorId).orElseThrow(() -> new ResourceNotFoundException("Instructor not found"));

        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setInstructor(instructor);
        course.setDescription(courseDto.getDescription());
        course = courseRepo.save(course);

        return CourseResDto.builder()
                .courseName(course.getTitle())
                .instructorName(instructor.getName())
                .courseDescription(course.getDescription())
                .build();
    }

    public List<CourseResDto> getAllCourses() {
        List<Course> courses = courseRepo.findAll();

        return courses.stream().map(course -> {
            return CourseResDto.builder().courseName(course.getTitle())
                    .courseId(course.getId())
                    .courseDescription(course.getDescription())
                    .instructorName(course.getInstructor().getName()).build();
        }).toList();
    }

    public List<CourseResDto> getInstructorOwnedCourses(Long instructorId) {
        List<Course> courses = courseRepo.findAllByInstructorId(instructorId);

        return courses.stream().map(course -> {
            return CourseResDto.builder().courseName(course.getTitle())
                    .courseId(course.getId())
                    .courseDescription(course.getDescription())
                    .instructorName(course.getInstructor().getName()).build();
        }).toList();
    }
}

