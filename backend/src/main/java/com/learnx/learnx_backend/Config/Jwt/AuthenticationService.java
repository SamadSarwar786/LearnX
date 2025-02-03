package com.learnx.learnx_backend.Config.Jwt;

import com.learnx.learnx_backend.Dtos.RequestDtos.BaseUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.InstructorDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.LoginUserDto;
import com.learnx.learnx_backend.Dtos.RequestDtos.StudentDto;
import com.learnx.learnx_backend.Enums.Role;
import com.learnx.learnx_backend.Enums.Status;
import com.learnx.learnx_backend.Exceptions.ResourceNotFoundException;
import com.learnx.learnx_backend.Exceptions.UserAlreadyExistsException;
import com.learnx.learnx_backend.Models.Instructor;
import com.learnx.learnx_backend.Models.Student;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Repositories.InstructorRepo;
import com.learnx.learnx_backend.Repositories.StudentRepo;
import com.learnx.learnx_backend.Repositories.UserRepo;
import com.learnx.learnx_backend.Services.EmailService;
import com.learnx.learnx_backend.Services.VerificationService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private UserRepo userRepo;
    private InstructorRepo instructorRepo;
    private StudentRepo studentRepo;
    private PasswordEncoder passwordEncoder;
    private ModelMapper modelMapper;
    private EmailService emailService;
    private VerificationService verificationService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            UserRepo userRepo,
            InstructorRepo instructorRepo,
            StudentRepo studentRepo,
            ModelMapper modelMapper,
            EmailService emailService,
            VerificationService verificationService
    ) {
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
        this.instructorRepo = instructorRepo;
        this.studentRepo = studentRepo;
        this.modelMapper = modelMapper;
        this.emailService = emailService;
        this.verificationService = verificationService;
    }

    public User authenticate(LoginUserDto loginUserDto) {
        User user = userRepo.findByEmail(loginUserDto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("email not found"));
        if(user.getStatus().equals(Status.PENDING)){
            sendVerificationEmail(user);
            throw new UsernameNotFoundException("Please verify your email and then login again");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginUserDto.getEmail(),
                            loginUserDto.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            throw new ResourceNotFoundException("User is not active, Please verify your email");
        }

        return user;
    }

    public <T extends BaseUserDto, U extends User> U signUp(T baseUserDto) {
        Optional<User> optionalUser = userRepo.findByEmail(baseUserDto.getEmail());
        User user = null;
        if (optionalUser.isPresent()) {
            user = optionalUser.get();
            if (user.getStatus() == Status.ACTIVE) {
                throw new UserAlreadyExistsException();
            }
        }

        if (baseUserDto instanceof InstructorDto) {
            Instructor instructor = null;
            if (user instanceof Instructor){
                instructor = (Instructor) user;
            }
            else instructor = new Instructor();
            modelMapper.map(baseUserDto, instructor);
            instructor.setPassword(passwordEncoder.encode(instructor.getPassword()));
            instructor.setRole(Role.INSTRUCTOR);
            instructor.setStatus(Status.PENDING);
            Instructor savedInstructor = instructorRepo.save(instructor);
            sendVerificationEmail(savedInstructor);
            return (U) savedInstructor;
        } else if (baseUserDto instanceof StudentDto) {
            Student student = null;
            if(user instanceof Student){
                student = (Student) user;
            }
            else student = new Student();
            modelMapper.map(baseUserDto, student);
            student.setPassword(passwordEncoder.encode(student.getPassword()));
            student.setRole(Role.STUDENT);
            student.setStatus(Status.PENDING);
            Student savedStudent = studentRepo.save(student);
            sendVerificationEmail(savedStudent);
            return (U) savedStudent;
        } else {
            throw new IllegalArgumentException("Unsupported user type.");
        }
    }

    void sendVerificationEmail(User user) {
       String token = verificationService.generateToken(user);
       emailService.sendEmail(user.getEmail(), "Welcome to LearnX", "Thank you for registering with LearnX. We are excited to have you on board! , Please verify you email by clicking on the link below: \n" + "http://localhost:8080/verify?token=" + token);
    }
}