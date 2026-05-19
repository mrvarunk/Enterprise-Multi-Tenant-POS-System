package com.pos.saas.service;

import com.pos.saas.exception.UserException;
import com.pos.saas.model.User;
import java.util.List;

public interface UserService {
    User getUserFromJwtToken(String jwtToken) throws UserException;
    User getCurrentUser() throws UserException;
    User getUserByEmail(String email) throws UserException;
    User getUserById(Long id) throws UserException;
    List<User> getAllUsers();
}