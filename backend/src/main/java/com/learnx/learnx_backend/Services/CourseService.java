package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.CourseDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseLabelDto;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Repositories.CategoryRepo;
import com.learnx.learnx_backend.Repositories.CourseRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    ModelMapper modelMapper;

    public CourseLabelDto createCourse(CourseDto courseDto, Instructor instructor) {

        Course course = modelMapper.map(courseDto, Course.class);
        categoryRepo.findById(courseDto.getCategoryId()).ifPresent(course::setCategory);
        course.setInstructor(instructor);

        Course savedCourse = courseRepo.save(course);

        CourseLabelDto courseLabelDto = modelMapper.map(savedCourse, CourseLabelDto.class);
        courseLabelDto.setInstructorName(instructor.getName());
        courseLabelDto.setInstructorId(instructor.getId());

        return courseLabelDto;

    }

    public List<CourseLabelDto> getAllCourses() {
        try {
            List<Course> courses = courseRepo.findAll();
            return courses.stream().map(course -> {
                CourseLabelDto courseLabelDto = modelMapper.map(course, CourseLabelDto.class);
                courseLabelDto.setInstructorName(course.getInstructor().getName());
                courseLabelDto.setInstructorId(course.getInstructor().getId());
                return courseLabelDto;
            }).toList();
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong");
        }


    }

    public List<CourseLabelDto> getStudentOwnedCourses(Long studentId) {
        try {
            List<Course> courses = courseRepo.findAll();
            return courses.stream().map(course -> {
                CourseLabelDto courseLabelDto = modelMapper.map(course, CourseLabelDto.class);
                courseLabelDto.setInstructorName(course.getInstructor().getName());
                courseLabelDto.setInstructorId(course.getInstructor().getId());
                return courseLabelDto;
            }).toList();
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong");
        }
    }

    public List<CourseLabelDto> getInstructorOwnedCourses(Long instructorId) {
        try {
            List<Course> courses = courseRepo.findAllByInstructorId(instructorId);
            return courses.stream().map(course -> {
                 return modelMapper.map(course, CourseLabelDto.class);
            }).toList();
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong");
        }
    }

    public Course getCourseById(Long courseId) {
        Optional<Course> course = courseRepo.findById(courseId);
        return course.orElse(null);
    }
}



