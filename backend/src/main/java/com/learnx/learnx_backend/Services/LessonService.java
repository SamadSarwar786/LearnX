package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.RequestDtos.LessonDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LessonResponseDto;
import com.learnx.learnx_backend.Enums.Role;
import com.learnx.learnx_backend.Exceptions.ResourceNotFoundException;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Lesson;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Repositories.LessonRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.util.List;
import java.util.Objects;

@Service
public class LessonService {

    private final S3Service s3Service;
    private final EnrollmentService enrollmentService;
    private final LessonRepo lessonRepo;
    private final CourseService courseService;
    private final CloudFrontService cloudFrontService;
    private final ModelMapper modelMapper;

    public LessonService(S3Service s3Service , EnrollmentService enrollmentService, LessonRepo lessonRepo, CourseService courseService,CloudFrontService cloudFrontService, ModelMapper modelMapper){
        this.s3Service = s3Service;
        this.enrollmentService = enrollmentService;
        this.lessonRepo = lessonRepo;
        this.courseService = courseService;
        this.cloudFrontService = cloudFrontService;
        this.modelMapper = modelMapper;
    }

    @Value("${aws.s3.video-bucket}")
    private String videoBucketName;

    @Value("${aws.s3.thumbnail-bucket}")
    private String thumbnailBucketName;

    public LessonResponseDto getAllLessons(Long courseId, User user) {
        try {
            List<Lesson> lessons = lessonRepo.findAllByCourseId(courseId);
            LessonResponseDto res = new LessonResponseDto();
            if (user != null && enrollmentService.isUserEnrolled(courseId, user.getId())) {
                res.setIsPaid(true);
            }
            res.setLessons(lessons);
            return res;
        } catch (Exception e) {
            throw new RuntimeException("Error while getting lessons " + e.getMessage(), e);
        }
    }


    public String getLessonURL(Long lessonId, User user) {
        Lesson lesson = lessonRepo.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        if (!lesson.getIsFree()) {
            if(user == null)
                throw new ResourceNotFoundException("User not found");
            if (user.getRole() == Role.STUDENT && !enrollmentService.isUserEnrolled(lesson.getCourse().getId(), user.getId())) {
                throw new ResourceNotFoundException("Student not enrolled in course");
            }
            if (user.getRole() == Role.INSTRUCTOR && !Objects.equals(lesson.getCourse().getInstructor().getId(), user.getId())) {
                throw new ResourceNotFoundException("this course does not belong to instructor");
            }
        }
        if (lesson.getVideoUrl().isEmpty()) {
            throw new ResourceNotFoundException("lesson is url is empty");
        }
//        return s3Service.generatePreSignedUrlForGetObject(videoBucketName, lesson.getVideoUrl()).toString();
        return cloudFrontService.generateCloudFrontSignedUrl(lesson.getVideoUrl());
    }

    public void createLesson(Long courseId, LessonDto lessonDto, Instructor instructor) {
        try {
            Course course = courseService.getCourseById(courseId);
            if (course == null) throw new ResourceNotFoundException("course not found with this is id");

            if (!Objects.equals(course.getInstructor().getId(), instructor.getId())) {
                throw new ResourceNotFoundException("this course does not belong to instructor");
            }

            Lesson lesson = new Lesson();
            modelMapper.map(lessonDto, lesson);
            lesson.setCourse(course);
            lessonRepo.save(lesson);
        } catch (Exception e) {
            throw new RuntimeException("getting error creating lesson " + e.getMessage(), e);
        }
    }

    public URL getVideoPutUrl(Long lessonId, Long courseId, Instructor instructor) {
        try {
            String key = generateKey(lessonId, courseId, instructor.getId());
            return s3Service.generatePresignedUrlForPutObject(videoBucketName, key);
        } catch (Exception e) {
            throw new RuntimeException("getting error creating lesson video url " + e.getMessage(), e);
        }
    }

    public void videoSaveUpdate(Long lessonId, Long courseId, Instructor instructor) {
        try {
            String key = generateKey(lessonId, courseId, instructor.getId());
            Lesson lesson = lessonRepo.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("lesson not found"));
            if (!lesson.getCourse().getId().equals(courseId))
                throw new ResourceNotFoundException("course id not matching with lesson course id");

            // should check more if lesson is of instructor

            lesson.setVideoUrl(key);
            lessonRepo.save(lesson);
        } catch (Exception e) {
            throw new RuntimeException("getting error updating lesson video url " + e.getMessage(), e);
        }
    }

    public void updateLesson(Long lessonId, Long courseId, LessonDto lessonDto, Instructor instructor) {
        try {
            Course course = courseService.getCourseById(courseId);
            if (course == null)
                throw new ResourceNotFoundException("course not found with this id");
            if (!course.getInstructor().getId().equals(instructor.getId()))
                throw new ResourceNotFoundException("this course does not belong to instructor");
            Lesson lesson = lessonRepo.findById(lessonId).orElseThrow(() -> new ResourceNotFoundException("lesson not found with this id " + lessonId));
            if (!Objects.equals(lesson.getCourse().getId(), courseId))
                throw new ResourceNotFoundException("this lesson does not belong to course");

            modelMapper.map(lessonDto, lesson);
            lessonRepo.save(lesson);
        } catch (Exception e) {
            throw new RuntimeException("error updating lesson" + e.getMessage(), e);
        }
    }

    String generateKey(Long lessonId, Long courseId, Long instructorId) {
        return "upload/instructor_" + instructorId + "/course_" + courseId + "/lesson_" + lessonId;
    }

}
