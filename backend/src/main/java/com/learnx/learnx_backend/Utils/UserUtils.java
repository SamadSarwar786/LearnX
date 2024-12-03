package com.learnx.learnx_backend.Utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.learnx.learnx_backend.Models.User;

public class UserUtils {

    public static User getLoggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null; // No user is logged in
        }
        return (User) authentication.getPrincipal(); // Assuming `User` implements `UserDetails`
    }
}
