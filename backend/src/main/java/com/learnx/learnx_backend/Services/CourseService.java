package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.CourseDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseResDto;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Repositories.CourseRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    ModelMapper modelMapper;

    public CourseResDto createCourse(CourseDto courseDto, Instructor instructor) {
        Course course = new Course();
        course.setTitle(courseDto.getTitle());
        course.setInstructor(instructor);
        course.setDescription(courseDto.getDescription());
        course.setPrice(courseDto.getPrice());
        course = courseRepo.save(course);

        return CourseResDto.builder()
                .courseId(course.getId())
                .courseName(course.getTitle())
                .price(course.getPrice())
                .instructorName(instructor.getName())
                .courseDescription(course.getDescription())
                .build();
    }

    public Page<Course> getAllCourses(int page , int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Course> courses = courseRepo.findAll(pageable);
        return courses;

//        return courses.stream().map(course -> {
//            return CourseResDto.builder().courseName(course.getTitle())
//                    .courseId(course.getId())
//                    .price(course.getPrice())
//                    .courseDescription(course.getDescription())
//                    .instructorName(course.getInstructor().getName()).build();
//        }).toList();
    }

    public List<CourseResDto> getStudentOwnedCourses(Long studentId) {
        List<Course> courses = courseRepo.findCoursesByStudentId(studentId);

        return courses.stream().map(course ->
                CourseResDto.builder().courseName(course.getTitle())
                        .courseId(course.getId())
                        .price(course.getPrice())
                        .courseDescription(course.getDescription())
                        .instructorName(course.getInstructor().getName()).build()
        ).toList();
    }

    public List<CourseResDto> getInstructorOwnedCourses(Long instructorId) {
        List<Course> courses = courseRepo.findAllByInstructorId(instructorId);

        return courses.stream().map(course ->
                CourseResDto.builder().courseName(course.getTitle())
                        .courseId(course.getId())
                        .price(course.getPrice())
                        .courseDescription(course.getDescription())
                        .instructorName(course.getInstructor().getName()).build()
        ).toList();
    }

    public Course getCourseById(Long courseId) {
        Optional<Course> course = courseRepo.findById(courseId);
        return course.orElse(null);
    }
}



