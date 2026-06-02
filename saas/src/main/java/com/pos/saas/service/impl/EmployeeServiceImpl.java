package com.pos.saas.service.impl;

import com.pos.saas.domain.UserRole;
import com.pos.saas.mapper.UserMapper;
import com.pos.saas.model.Branch;
import com.pos.saas.model.Store;
import com.pos.saas.model.User;
import com.pos.saas.dto.UserDTO;
import com.pos.saas.repository.BranchRepository;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.repository.UserRepository;
import com.pos.saas.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final UserRepository userRepository;
    private final StoreRepository storeRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO createStoreEmployee(Long storeId, UserDTO EmployeeDTO) throws Exception {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new Exception("Store not found"));

        if (EmployeeDTO.getRole() == UserRole.ROLE_BRANCH_MANAGER) {
            if (EmployeeDTO.getBranchId() == null) {
                throw new Exception("Branch ID is required to create a branch manager");
            }
        }

        User user = UserMapper.toEntity(EmployeeDTO);
        user.setStore(store);
        user.setPassword(passwordEncoder.encode(EmployeeDTO.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        Branch branch = null;
        if (EmployeeDTO.getBranchId() != null) {
            branch = branchRepository.findById(EmployeeDTO.getBranchId())
                    .orElseThrow(() -> new Exception("Branch not found"));
            user.setBranch(branch);
        }

        User savedEmployee = userRepository.save(user);

        if (EmployeeDTO.getRole() == UserRole.ROLE_BRANCH_MANAGER && branch != null) {
            branch.setManager(savedEmployee);
            branchRepository.save(branch);
        }

        return UserMapper.toDTO(savedEmployee);
    }

    @Override
    public UserDTO createBranchEmployee(Long branchId, UserDTO EmployeeDTO) throws Exception {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new Exception("Branch not found"));

        if (EmployeeDTO.getRole() != UserRole.ROLE_BRANCH_CASHIER &&
                EmployeeDTO.getRole() != UserRole.ROLE_BRANCH_MANAGER) {
            throw new Exception("Role not supported for branch employee");
        }

        User user = UserMapper.toEntity(EmployeeDTO);
        user.setBranch(branch);
        user.setStore(branch.getStore());
        user.setPassword(passwordEncoder.encode(EmployeeDTO.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        User savedEmployee = userRepository.save(user);

        if (EmployeeDTO.getRole() == UserRole.ROLE_BRANCH_MANAGER) {
            branch.setManager(savedEmployee);
            branchRepository.save(branch);
        }

        return UserMapper.toDTO(savedEmployee);
    }

    @Override
    public UserDTO updateEmployee(Long employeeId, UserDTO employeeDetails) throws Exception {
        User existingEmployee = userRepository.findById(employeeId)
                .orElseThrow(() -> new Exception("Employee not exist with given ID"));

        if (employeeDetails.getEmail() != null) {
            existingEmployee.setEmail(employeeDetails.getEmail());
        }
        if (employeeDetails.getFullName() != null) {
            existingEmployee.setFullName(employeeDetails.getFullName());
        }
        if (employeeDetails.getPassword() != null) {
            existingEmployee.setPassword(passwordEncoder.encode(employeeDetails.getPassword()));
        }
        if (employeeDetails.getRole() != null) {
            existingEmployee.setRole(employeeDetails.getRole());
        }
        if (employeeDetails.getBranchId() != null) {
            Branch branch = branchRepository.findById(employeeDetails.getBranchId())
                    .orElseThrow(() -> new Exception("Branch not found"));
            existingEmployee.setBranch(branch);
        }

        existingEmployee.setUpdatedAt(LocalDateTime.now());
        User updatedEmployee = userRepository.save(existingEmployee);
        return UserMapper.toDTO(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long employeeId) throws Exception {
        User existingEmployee = userRepository.findById(employeeId)
                .orElseThrow(() -> new Exception("Employee not found"));
        userRepository.delete(existingEmployee);
    }

    @Override
    public List<UserDTO> findStoreEmployees(Long storeId) throws Exception {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new Exception("Store not found"));

        List<User> employees = userRepository.findByStoreId(storeId);

        return employees.stream()
                .filter(user -> user.getRole() == UserRole.ROLE_STORE_MANAGER || user.getRole() == UserRole.ROLE_BRANCH_MANAGER)
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserDTO> findBranchEmployees(Long branchId) throws Exception {
        Branch branch = branchRepository.findById(branchId)
                .orElseThrow(() -> new Exception("Branch not found"));

        List<User> employees = userRepository.findByBranchId(branchId);

        return employees.stream()
                .map(UserMapper::toDTO)
                .collect(Collectors.toList());
    }
}