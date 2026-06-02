package com.pos.saas.controller;

import com.pos.saas.payload.dto.UserDTO;
import com.pos.saas.payload.response.ApiResponse;
import com.pos.saas.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/store/{storeId}")
    public ResponseEntity<UserDTO> createStoreEmployee(
            @PathVariable Long storeId,
            @RequestBody UserDTO userDTO) throws Exception {
        UserDTO employee = employeeService.createStoreEmployee(storeId, userDTO);
        return ResponseEntity.ok(employee);
    }

    @PostMapping("/branch/{branchId}")
    public ResponseEntity<UserDTO> createBranchEmployee(
            @PathVariable Long branchId,
            @RequestBody UserDTO userDTO) throws Exception {
        UserDTO employee = employeeService.createBranchEmployee(branchId, userDTO);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateEmployee(
            @PathVariable Long id,
            @RequestBody UserDTO userDTO) throws Exception {
        UserDTO updatedEmployee = employeeService.updateEmployee(id, userDTO);
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteEmployee(@PathVariable Long id) throws Exception {
        employeeService.deleteEmployee(id);
        ApiResponse res = new ApiResponse();
        res.setMessage("Employee deleted successfully");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<UserDTO>> getStoreEmployees(
            @PathVariable Long storeId) throws Exception {
        List<UserDTO> employees = employeeService.findStoreEmployees(storeId);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<UserDTO>> getBranchEmployees(
            @PathVariable Long branchId) throws Exception {
        List<UserDTO> employees = employeeService.findBranchEmployees(branchId);
        return ResponseEntity.ok(employees);
    }
}