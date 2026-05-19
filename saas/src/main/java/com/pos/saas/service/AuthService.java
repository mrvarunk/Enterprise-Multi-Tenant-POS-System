package com.pos.saas.service;

import com.pos.saas.exception.UserException;
import com.pos.saas.dto.UserDTO;
import com.pos.saas.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse signup(UserDTO userDto) throws UserException;
    AuthResponse login(UserDTO userDto) throws UserException;
}