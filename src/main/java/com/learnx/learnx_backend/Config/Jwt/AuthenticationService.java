package com.learnx.learnx_backend.Config.Jwt;

import com.learnx.learnx_backend.Dtos.RequestDtos.LoginUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.RegisterUserDto;
import com.learnx.learnx_backend.Exceptions.UserAlreadyExistsException;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Repositories.UserRepo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepo userRepo;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            UserRepo userRepo,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto registerUserDto) throws Exception {
        if (userRepo.findByEmail(registerUserDto.getEmail()).isPresent()) {
            System.out.println("User already exists print");
            throw new UserAlreadyExistsException();
        }

        User user = new User();
        user.setName(registerUserDto.getName());
        user.setEmail(registerUserDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerUserDto.getPassword()));
        user.setRole(registerUserDto.getRole());

        return userRepo.save(user);
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
}