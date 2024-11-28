package com.learnx.learnx_backend.Exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException() {
        super("User already Exists");
    }
}
