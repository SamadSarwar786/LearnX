package com.learnx.learnx_backend.Config.Jwt;

import com.learnx.learnx_backend.Dtos.RequestDtos.LoginUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.RegisterUserDto;
import com.learnx.learnx_backend.Dtos.ResponseDtos.LoginResponse;
import com.learnx.learnx_backend.Models.User;
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

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@Valid @RequestBody RegisterUserDto registerUserDto) throws Exception {
        User registeredUser = authenticationService.signup(registerUserDto);

        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
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
