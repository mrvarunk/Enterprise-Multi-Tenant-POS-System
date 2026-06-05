package com.pos.saas.controller;

import com.pos.saas.dto.RefundDTO;
import com.pos.saas.payload.response.ApiResponse;
import com.pos.saas.service.RefundService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/refunds")
public class RefundController {

    private final RefundService refundService;

    @PostMapping("/cashier/{cashierId}")
    public ResponseEntity<RefundDTO> createRefund(
            @RequestBody RefundDTO refundDTO,
            @PathVariable Long cashierId) throws Exception {
        RefundDTO createdRefund = refundService.createRefund(refundDTO, cashierId);
        return ResponseEntity.ok(createdRefund);
    }

    @GetMapping
    public ResponseEntity<List<RefundDTO>> getAllRefunds() {
        List<RefundDTO> refunds = refundService.getAllRefunds();
        return ResponseEntity.ok(refunds);
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<RefundDTO>> getRefundsByCashier(@PathVariable Long cashierId) {
        List<RefundDTO> refunds = refundService.getRefundsByCashier(cashierId);
        return ResponseEntity.ok(refunds);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<RefundDTO>> getRefundsByBranch(@PathVariable Long branchId) {
        List<RefundDTO> refunds = refundService.getRefundsByBranch(branchId);
        return ResponseEntity.ok(refunds);
    }

    @GetMapping("/shift/{shiftReportId}")
    public ResponseEntity<List<RefundDTO>> getRefundsByShiftReport(@PathVariable Long shiftReportId) {
        List<RefundDTO> refunds = refundService.getRefundsByShiftReport(shiftReportId);
        return ResponseEntity.ok(refunds);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<RefundDTO> getRefundById(@PathVariable Long id) throws Exception {
        RefundDTO refund = refundService.getRefundById(id);
        return ResponseEntity.ok(refund);
    }

    @GetMapping("/cashier/{cashierId}/range")
    public ResponseEntity<List<RefundDTO>> getRefundsByCashierAndRange(
            @PathVariable Long cashierId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        List<RefundDTO> refunds = refundService.getRefundsByCashierAndDateRange(cashierId, start, end);
        return ResponseEntity.ok(refunds);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteRefund(@PathVariable Long id) throws Exception {
        refundService.deleteRefund(id);
        ApiResponse response = new ApiResponse();
        response.setMessage("Refund instance records adjusted and deleted successfully");
        response.setStatus(true);
        return ResponseEntity.ok(response);
    }
}