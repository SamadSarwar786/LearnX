package com.learnx.learnx_backend.Models;

import com.learnx.learnx_backend.Enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "lessons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false)
    private String title;

    @Lob
    private String description; // Using @Lob for potentially large text content

    @Column(nullable = false)
    private String thumbnailUrl;
//
    @Column(nullable = false)
    private String videoUrl;  //videoKey

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

}