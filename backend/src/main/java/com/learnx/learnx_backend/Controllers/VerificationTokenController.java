package com.learnx.learnx_backend.Controllers;

import com.learnx.learnx_backend.Services.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VerificationTokenController {

    @Autowired
    VerificationService verificationService;

    @GetMapping("/verify")
    public String verifyToken(@RequestParam String token) {
        return verificationService.verifyToken(token);
    }
}
