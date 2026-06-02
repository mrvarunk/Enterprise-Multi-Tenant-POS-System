package com.pos.saas.service;

import com.pos.saas.dto.UserDTO;
import java.util.List;

public interface EmployeeService {
    UserDTO createStoreEmployee(Long storeId, UserDTO employee) throws Exception;
    UserDTO createBranchEmployee(Long branchId, UserDTO employee) throws Exception;
    UserDTO updateEmployee(Long employeeId, UserDTO employeeDetails) throws Exception;
    void deleteEmployee(Long employeeId) throws Exception;
    List<UserDTO> findStoreEmployees(Long storeId) throws Exception;
    List<UserDTO> findBranchEmployees(Long branchId) throws Exception;
}