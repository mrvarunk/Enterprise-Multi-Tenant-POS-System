package com.pos.saas.service.impl;

import com.pos.saas.config.JwtProvider;
import com.pos.saas.domain.UserRole;
import com.pos.saas.exception.UserException;
import com.pos.saas.mapper.UserMapper;
import com.pos.saas.model.User;
import com.pos.saas.dto.UserDTO;
import com.pos.saas.payload.response.AuthResponse;
import com.pos.saas.repository.UserRepository;
import com.pos.saas.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
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
    private final CustomUserServiceImpl customUserService; // Cleaned up redundant package prefix

    @Override
    public AuthResponse signup(UserDTO userDto) throws UserException {
        if (userRepository.findByEmail(userDto.getEmail()) != null) {
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

        // Authenticate properly using the custom user service details
        Authentication authentication = authenticate(userDto.getEmail(), userDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Registered successfully");
        response.setUser(UserMapper.toDTO(savedUser));

        return response;
    }

    @Override
    public AuthResponse login(UserDTO userDto) throws UserException {
        // FIX: Actually invoke the credential verification logic
        Authentication authentication = authenticate(userDto.getEmail(), userDto.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateToken(authentication);

        User user = userRepository.findByEmail(userDto.getEmail());
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Login successfully");
        response.setUser(UserMapper.toDTO(user));

        return response;
    }

    private Authentication authenticate(String email, String password) throws UserException {
        UserDetails userDetails = customUserService.loadUserByUsername(email);

        if (userDetails == null) {
            throw new UserException("Invalid email or password");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new UserException("Invalid email or password");
        }

        // Pass userDetails and authorities instead of credentials string
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}