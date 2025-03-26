package com.example.project.service;

import com.example.project.controller.RegistrationRequest;
import com.example.project.exception.UserAlreadyExistsException;

public interface UserService {
    void registerUser(RegistrationRequest request) throws UserAlreadyExistsException;
}
