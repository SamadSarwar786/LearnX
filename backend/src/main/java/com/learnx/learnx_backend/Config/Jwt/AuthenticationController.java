package com.learnx.learnx_backend.Config.Jwt;

import com.learnx.learnx_backend.Dtos.RequestDtos.InstructorDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.LoginUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.StudentDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LoginResponse;
import com.learnx.learnx_backend.Models.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register/instructor")
    public ResponseEntity<Object> register(@Valid @RequestBody InstructorDto instructorDto) throws Exception {
        authenticationService.signUp(instructorDto);
        Map<String, Object> response = Map.of("status", "success", "message", "Instructor is registered successfully , Please verify your email");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/register/student")
    public ResponseEntity<Object> register(@Valid @RequestBody StudentDto studentDto) throws Exception {
        authenticationService.signUp(studentDto);
        Map<String, Object> response = Map.of("status", "success", "message", "Student is registered successfully , Please verify your email");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String token = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(token);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
