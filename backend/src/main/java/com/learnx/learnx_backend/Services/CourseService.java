package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.CourseDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.CourseUpdateDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseLabelDto;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Repositories.CategoryRepo;
import com.learnx.learnx_backend.Repositories.CourseRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepo courseRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @Autowired
    private S3Service s3Service;

    @Value("${aws.s3.thumbnail-bucket}")
    private String bucketName;

    @Value("${image.website.url}")
    private String imageWebsiteUrl;

    @Autowired
    private ModelMapper modelMapper;

    public CourseLabelDto createCourse(CourseDto courseDto, Instructor instructor) {
        try {
            Course course = new Course();
            modelMapper.map(courseDto, course);
            if (courseDto.getCategoryId() != null)
                categoryRepo.findById(courseDto.getCategoryId()).ifPresent(course::setCategory);
            course.setInstructor(instructor);

            Course savedCourse = courseRepo.save(course);

            CourseLabelDto courseLabelDto = modelMapper.map(savedCourse, CourseLabelDto.class);
            courseLabelDto.setInstructorName(instructor.getName());
            courseLabelDto.setInstructorId(instructor.getId());

            return courseLabelDto;
        } catch (ObjectOptimisticLockingFailureException e) {
            // Handle optimistic locking failure gracefully
            System.out.println("Optimistic locking conflict: " + e.getMessage());
            throw new RuntimeException("The entity was modified or deleted by another transaction.", e);
        } catch (Exception e) {
            System.out.println("ERROR " + e);
            throw new RuntimeException(e);
        }
    }


    public void updateCourse(Long courseId, CourseUpdateDto courseUpdateDto, Instructor instructor) {
        try {
            Course course = courseRepo.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            if (!course.getInstructor().getId().equals(instructor.getId()))
                throw new RuntimeException("You are not authorized to update this course");
            modelMapper.map(courseUpdateDto, course);

            if (courseUpdateDto.getCategoryId() != null) {
                categoryRepo.findById(courseUpdateDto.getCategoryId()).ifPresent(course::setCategory);
            }
            Course savedCourse = courseRepo.save(course);
            modelMapper.map(savedCourse, CourseLabelDto.class);
        } catch (Exception e) {
            throw new RuntimeException("Error updating course: " + e.getMessage(), e);
        }
    }

    public URL getThumbnailPutUrl(Long courseId, Instructor instructor) {
        try {
            Course course = courseRepo.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            if (!course.getInstructor().getId().equals(instructor.getId()))
                throw new RuntimeException("You are not authorized to update this course");

            String key = getThumbnailUrlKey(courseId, instructor.getId());

            return s3Service.generatePresignedUrlForPutObject(bucketName, key);

        } catch (Exception e) {
            throw new RuntimeException("Error getting thumbnail URL: " + e.getMessage(), e);
        }
    }

    public void thumbnailSaveUpdate(Long courseId, Instructor instructor) {
        try {
            String key = getThumbnailUrlKey(courseId, instructor.getId());
            Course course = courseRepo.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            if (!course.getInstructor().getId().equals(instructor.getId()))
                throw new RuntimeException("You are not authorized to update this course");
            course.setThumbnailUrl(imageWebsiteUrl + key);
            courseRepo.save(course);
        } catch (Exception e) {
            throw new RuntimeException("Error saving thumbnail URL: " + e.getMessage(), e);
        }
    }

    public List<CourseLabelDto> getAllCourses() {
        try {
            List<Course> courses = courseRepo.findAll();
            return courses.stream().filter(course -> course.getIsPublished() != null && course.getIsPublished()).map(course -> {
                CourseLabelDto courseLabelDto = modelMapper.map(course, CourseLabelDto.class);
                courseLabelDto.setInstructorName(course.getInstructor().getName());
                courseLabelDto.setInstructorId(course.getInstructor().getId());
                return courseLabelDto;
            }).toList();
        } catch (Exception e) {
            throw new RuntimeException("Something went wrong "+e.getMessage());
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

    public String getThumbnailUrlKey(Long courseId, Long instructorId) {
        return "upload/instructor_" + instructorId + "/course_" + courseId + "_thumbnail.jpg";
    }
}



