package com.learnx.learnx_backend.Config.Jwt;

import com.learnx.learnx_backend.Dtos.RequestDtos.InstructorDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.LoginUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.StudentDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LoginResponse;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Services.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    private final EmailService emailService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService, EmailService emailService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.emailService = emailService;

    }

    @PostMapping("/register/instructor")
    public ResponseEntity<User> register(@Valid @RequestBody InstructorDto instructorDto) throws Exception {
          Instructor instructor =  authenticationService.signUp(instructorDto);
        return new ResponseEntity<>(instructor, HttpStatus.CREATED);
    }

    @PostMapping("/register/student")
    public ResponseEntity<User> register(@Valid @RequestBody StudentDto studentDto) throws Exception {

        Student student =  authenticationService.signUp(studentDto);
        // emailService.sendEmail(student.getEmail(), "Welcome to LearnX", "Thank you for registering with LearnX. We are excited to have you on board!");
        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }



    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginUserDto loginUserDto) throws Exception {
         User authenticatedUser = authenticationService.authenticate(loginUserDto);
         String token = jwtService.generateToken(authenticatedUser);

         LoginResponse loginResponse = new LoginResponse();
         loginResponse.setToken(token);
         loginResponse.setExpiresIn(jwtService.getExpirationTime());

         return ResponseEntity.ok(loginResponse);
    }
}
