package com.learnx.learnx_backend.Config.Jwt;

import com.learnx.learnx_backend.Dtos.RequestDtos.BaseUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.InstructorDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.LoginUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.StudentDto;
import com.learnx.learnx_backend.Enums.Role;
import com.learnx.learnx_backend.Exceptions.UserAlreadyExistsException;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Repositories.InstructorRepo;
import com.learnx.learnx_backend.Repositories.StudentRepo;
import com.learnx.learnx_backend.Repositories.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private UserRepo userRepo;

    private InstructorRepo instructorRepo = null;

    private StudentRepo studentRepo;

    private PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            UserRepo userRepo,
            InstructorRepo instructorRepo,
            StudentRepo studentRepo
    ) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.instructorRepo = instructorRepo;
        this.studentRepo = studentRepo;
    }

    public User authenticate(LoginUserDto loginUserDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );

        return userRepo.findByEmail(loginUserDto.getEmail())
                .orElseThrow();
    }

    public <T extends BaseUserDto, U extends User> U signUp(T baseUserDto) {

        if (userRepo.findByEmail(baseUserDto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException();
        }

        if (baseUserDto instanceof InstructorDto) {
            Instructor instructor = new Instructor();
            instructor.setEmail(baseUserDto.getEmail());
            instructor.setPassword(passwordEncoder.encode(baseUserDto.getPassword()));
            instructor.setName(baseUserDto.getName());
            instructor.setRole(Role.INSTRUCTOR);
            instructor.setProfession(((InstructorDto) baseUserDto).getProfession());
            return (U) instructorRepo.save(instructor);
        } else if (baseUserDto instanceof StudentDto) {
            Student student = new Student();
            student.setEmail(baseUserDto.getEmail());
            student.setPassword(passwordEncoder.encode(baseUserDto.getPassword()));
            student.setName(baseUserDto.getName());
            student.setRole(Role.STUDENT);
            student.setDegree(((StudentDto) baseUserDto).getDegree());
            return (U) studentRepo.save(student);
        } else {
            throw new IllegalArgumentException("Unsupported user type.");
        }
    }
}