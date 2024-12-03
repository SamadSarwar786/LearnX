package com.learnx.learnx_backend.Models;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "enrollments")
@Data
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnore  // to prevent infinite recursion (circular reference) when serializing the object to JSON
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore  // to prevent infinite recursion (circular reference) when serializing the object to JSON
    private Course course;

    private LocalDateTime EnrollmentDateTime; // Tracks when the student enrolled

}
