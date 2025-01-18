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
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
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

    @Column(nullable = false)
    private Long sequenceNumber;

    @Column
    private String description;

    @Column(nullable = false)
    @JsonIgnore
    private String videoUrl;  //videoKey

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

}