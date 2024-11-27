package com.learnx.learnx_backend.Models;
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
    @JoinColumn(name = "user_id", nullable = false)
    private User studentTookCourse;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course courseTaken;

    private LocalDateTime enrolledAt; // Tracks when the student enrolled

    private boolean isCompleted; // Tracks if the student has completed the course
    private boolean isPaid; // Tracks if the student has paid for the course

    private double progress;

    @PrePersist
    protected void onCreate() {
        this.enrolledAt = LocalDateTime.now();
    }
}
