package com.pos.saas.payload.response;

import com.pos.saas.dto.UserDTO;
import lombok.Data;

@Data
public class AuthResponse {
    private String jwt;
    private String message;
    private UserDTO user;
}