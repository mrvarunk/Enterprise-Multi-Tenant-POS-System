package com.pos.saas.service;

import com.pos.saas.exception.UserException;
import com.pos.saas.payload.dto.UserDto;
import com.pos.saas.payload.response.AuthResponse;

public interface AuthService {
    AuthResponse signup(UserDto userDto) throws UserException;
    AuthResponse login(UserDto userDto) throws UserException;
}