package com.pos.saas.controller;

import com.pos.saas.exception.UserException;
import com.pos.saas.payload.dto.UserDto;
import com.pos.saas.payload.response.AuthResponse;
import com.pos.saas.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signupHandler(@RequestBody UserDto userDto) throws UserException {
        AuthResponse response = authService.signup(userDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody UserDto userDto) throws UserException {
        AuthResponse response = authService.login(userDto);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}