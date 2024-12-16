package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.LessonDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LessonResponseDto;
import com.learnx.learnx_backend.Enums.Role;
import com.learnx.learnx_backend.Enums.Status;
import com.learnx.learnx_backend.Exceptions.ResourceNotFoundException;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Lesson;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Repositories.LessonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.Objects;
import java.util.UUID;

@Service
public class LessonService {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private LessonRepo lessonRepo;

    @Autowired
    private CourseService courseService;

    @Value("${aws.s3.bucket}")
    private String bucketName;

    public String getLessonURL(Long lessonId, User user) {
        Lesson lesson = lessonRepo.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        if (user.getRole() == Role.STUDENT && !enrollmentService.isUserEnrolled(lesson.getCourse().getId(), user.getId())) {
            throw new ResourceNotFoundException("Student not enrolled in course");
        }
        if (user.getRole() == Role.INSTRUCTOR && lesson.getCourse().getInstructor().getId() != user.getId()) {
            throw new ResourceNotFoundException("this course does not belong to instructor");
        }
        return s3Service.generatePreSignedUrlForGetObject(bucketName, lesson.getVideoUrl()).toString();
    }

    public LessonResponseDto saveLessonAndGetPutUrl(Instructor instructor, Long courseId, LessonDto lessonDto) {
        Course course = courseService.getCourseById(courseId);
        if (course == null) throw new ResourceNotFoundException("course not found with this is id");

        if (!Objects.equals(course.getInstructor().getId(), instructor.getId())) {
            throw new ResourceNotFoundException("this course does not belong to instructor");
        }
        String uuidLesson = UUID.randomUUID().toString();
        String videoUrl = generateVideoUrl(instructor.getId(), course.getId(), uuidLesson);
        Lesson lesson = Lesson.builder().title(lessonDto.getTitle())
                .description(lessonDto.getDescription())
                .course(course)
                .videoUrl(videoUrl)
                .thumbnailUrl("abc")
                .status(Status.PENDING)
                .build();

        Lesson savedLesson = lessonRepo.save(lesson);

        URL url = s3Service.generatePresignedUrlForPutObject(bucketName, lesson.getVideoUrl());

        return new LessonResponseDto(savedLesson.getId(), savedLesson.getTitle(), url.toString());
    }

    public boolean updateLessonStatus(Long lessonId) {
        Lesson lesson = lessonRepo.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("lesson not found with this id " + lessonId));
        lesson.setStatus(Status.ACTIVE);
        try {
            lessonRepo.save(lesson);
            return true;
        } catch (Exception e) {
            System.out.println("error "+e);
            return false;
        }
    }
    String generateVideoUrl(Long instructorId, Long courseId, String uuidLesson) {
        return "/upload/instructor-" + instructorId + "/course-" + courseId + "/lesson-" + uuidLesson;
    }

}
