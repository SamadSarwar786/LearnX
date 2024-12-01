package com.learnx.learnx_backend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "instructors")
@Data
public class Instructor extends User {

    private String profession;

    @OneToMany(mappedBy = "instructor")
    private Set<Course> courses = new HashSet<>();
}
