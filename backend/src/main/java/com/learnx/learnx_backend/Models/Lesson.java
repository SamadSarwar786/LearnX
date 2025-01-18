package com.learnx.learnx_backend.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learnx.learnx_backend.Enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "lessons")
@Data
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    @JsonIgnore
    private Course course;

    @Column(nullable = false)
    private String title;

    private String description;
    private Boolean isPublished = false;
    private Boolean isFree = false;

    @JsonIgnore
    private String videoUrl;  //videoKey

}