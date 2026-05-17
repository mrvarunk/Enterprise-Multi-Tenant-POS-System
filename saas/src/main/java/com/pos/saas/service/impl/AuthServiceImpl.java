package com.pos.saas.service.impl;

import com.pos.saas.config.JwtProvider;
import com.pos.saas.domain.UserRole;
import com.pos.saas.exception.UserException;
import com.pos.saas.mapper.UserMapper;
import com.pos.saas.model.User;
import com.pos.saas.payload.dto.UserDto;
import com.pos.saas.payload.response.AuthResponse;
import com.pos.saas.repository.UserRepository;
import com.pos.saas.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final com.josh.service.impl.CustomUserServiceImpl customUserService;

    @Override
    public AuthResponse signup(UserDto userDto) throws UserException {
        User existingUser = userRepository.findByEmail(userDto.getEmail());
        if (existingUser != null) {
            throw new UserException("Email ID already registered.");
        }

        if (userDto.getRole() == UserRole.ROLE_ADMIN) {
            throw new UserException("Role admin is not allowed.");
        }

        User newUser = new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setRole(userDto.getRole());
        newUser.setFullName(userDto.getFullName());
        newUser.setPhone(userDto.getPhone());
        newUser.setCreatedAt(LocalDateTime.now());
        newUser.setLastLogin(LocalDateTime.now());

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Registered successfully");
        response.setUser(UserMapper.toDto(savedUser));

        return response;
    }

    @Override
    public AuthResponse login(UserDto userDto) throws UserException {
        Authentication authentication = authenticate(userDto.getEmail(), userDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        User user = userRepository.findByEmail(userDto.getEmail());
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Login successfully");
        response.setUser(UserMapper.toDto(user));

        return response;
    }

    private Authentication authenticate(String email, String password) throws UserException {
        UserDetails userDetails = customUserService.loadUserByUsername(email);
        if (userDetails == null) {
            throw new UserException("Email ID doesn't exist");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new UserException("Password doesn't match");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}