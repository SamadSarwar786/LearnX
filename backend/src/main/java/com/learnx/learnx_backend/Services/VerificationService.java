package com.learnx.learnx_backend.Services;

import com.learnx.learnx_backend.Enums.Status;
import com.learnx.learnx_backend.Models.User;
import com.learnx.learnx_backend.Models.VerificationToken;
import com.learnx.learnx_backend.Repositories.UserRepo;
import com.learnx.learnx_backend.Repositories.VerificationTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationService {

    @Autowired
    VerificationTokenRepo verificationTokenRepo;

    @Autowired
    UserRepo userRepo;

    public String verifyToken(String Token) {
        Optional<VerificationToken> optionalToken = verificationTokenRepo.findByToken(Token);

        if (optionalToken.isEmpty())
            return "invalid token";

        VerificationToken verificationToken = optionalToken.get();

        if (verificationToken.getExpiryDateTime().isBefore(LocalDateTime.now()))
            return "verification token has expired";

        User user = verificationToken.getUser();
        user.setStatus(Status.ACTIVE);
        userRepo.save(user);
        verificationTokenRepo.delete(verificationToken);
        return "verified";
    }

    public String generateToken(User user) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDateTime = LocalDateTime.now().plusMinutes(5);
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setUser(user);
        verificationToken.setToken(token);
        verificationToken.setExpiryDateTime(expiryDateTime);
        return verificationTokenRepo.save(verificationToken).getToken();

    }

}
