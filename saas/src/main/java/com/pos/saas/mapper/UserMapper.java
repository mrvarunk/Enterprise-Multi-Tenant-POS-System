package com.pos.saas.mapper;

import com.pos.saas.model.User;
import com.pos.saas.payload.dto.UserDto;

public class UserMapper {
    public static UserDto toDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setPhone(user.getPhone());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setLastLogin(user.getLastLogin());
        return userDto;
    }
}