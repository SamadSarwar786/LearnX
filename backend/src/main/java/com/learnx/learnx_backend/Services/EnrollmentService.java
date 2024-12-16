package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Dtos.ResponseDtos.CourseSalesDto;
import com.learnx.learnx_backend.Models.Course;
import com.learnx.learnx_backend.Models.Enrollment;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Repositories.CourseRepo;
import com.learnx.learnx_backend.Repositories.EnrollmentRepo;
import com.learnx.learnx_backend.Repositories.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepo enrollmentRepo;
    @Autowired
    private StudentRepo studentRepos;
    @Autowired
    private CourseRepo courseRepo;

    public Enrollment enrollStudent(Student student, Long courseId) throws Exception {
        Course course = courseRepo.findById(courseId).orElseThrow(() -> new IllegalArgumentException("Invalid course ID"));

        if(isUserEnrolled(course.getId(),student.getId())){
            throw new Exception("Student is already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setEnrollmentDateTime(LocalDateTime.now());

//        // Set payment details if applicable
//        Payment payment = new Payment();
//        payment.setAmount(course.getPrice());
//        payment.setTransactionId(paymentDetails.getTransactionId());
//        // Set additional payment details
//        enrollment.setPayment(payment);

        return enrollmentRepo.save(enrollment);
    }


    public List<CourseSalesDto> getCoursesWithSalesByInstructor(Long instructorId) {
        List<Object[]> results = enrollmentRepo.findCoursesWithSalesByInstructor(instructorId);

        // Map results to DTO
        return results.stream().map(result -> {
            CourseSalesDto dto = new CourseSalesDto();
            dto.setCourseId((Long) result[0]);
            dto.setCourseTitle((String) result[1]);
            dto.setSalesCount((Long) result[2]);
            return dto;
        }).toList();
    }

    public boolean isUserEnrolled(Long courseId, Long studentId) {
        return enrollmentRepo.findByCourseIdAndStudentId(courseId, studentId).isPresent();
    }
}
