package com.pos.saas.mapper;

import com.pos.saas.model.User;
import com.pos.saas.dto.UserDTO;

public class UserMapper {
    public static UserDTO toDTO(User user) {
        UserDTO userDto = new UserDTO();
        userDto.setId(user.getId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setRole(user.getRole());
        userDto.setPhone(user.getPhone());
        userDto.setCreatedAt(user.getCreatedAt());
        userDto.setUpdatedAt(user.getUpdatedAt());
        userDto.setLastLogin(user.getLastLogin());
        
        // Extract storeId - either directly from store or from branch's store
        if (user.getStore() != null) {
            userDto.setStoreId(user.getStore().getId());
        } else if (user.getBranch() != null && user.getBranch().getStore() != null) {
            userDto.setStoreId(user.getBranch().getStore().getId());
        }
        
        // Extract branchId from branch if it exists
        userDto.setBranchId(user.getBranch() != null ? user.getBranch().getId() : null);
        
        return userDto;
    }

    // Add this new method to fix the compilation error in EmployeeServiceImpl
    public static User toEntity(UserDTO userDto) {
        if (userDto == null) return null;

        User user = new User();
        user.setId(userDto.getId());
        user.setFullName(userDto.getFullName());
        user.setEmail(userDto.getEmail());
        user.setRole(userDto.getRole());
        user.setPhone(userDto.getPhone());
        return user;
    }
}