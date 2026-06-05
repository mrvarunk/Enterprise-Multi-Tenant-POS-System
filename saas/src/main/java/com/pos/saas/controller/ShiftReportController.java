package com.pos.saas.controller;

import com.pos.saas.dto.ShiftReportDTO;
import com.pos.saas.service.ShiftReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/shift-reports")
public class ShiftReportController {

    private final ShiftReportService shiftReportService;

    @PostMapping("/start/cashier/{cashierId}")
    public ResponseEntity<ShiftReportDTO> startShift(@PathVariable Long cashierId) throws Exception {
        ShiftReportDTO report = shiftReportService.startShift(cashierId);
        return ResponseEntity.ok(report);
    }

    @PutMapping("/end/{shiftId}")
    public ResponseEntity<ShiftReportDTO> endShift(@PathVariable Long shiftId) throws Exception {
        ShiftReportDTO report = shiftReportService.endShift(shiftId);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/live/cashier/{cashierId}")
    public ResponseEntity<ShiftReportDTO> getLiveShiftProgress(@PathVariable Long cashierId) throws Exception {
        ShiftReportDTO progress = shiftReportService.getLiveShiftProgress(cashierId);
        return ResponseEntity.ok(progress);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShiftReportDTO> getShiftReportById(@PathVariable Long id) throws Exception {
        ShiftReportDTO report = shiftReportService.getShiftReportById(id);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/cashier/{cashierId}")
    public ResponseEntity<List<ShiftReportDTO>> getReportsByCashier(@PathVariable Long cashierId) {
        List<ShiftReportDTO> reports = shiftReportService.getShiftReportsByCashier(cashierId);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<ShiftReportDTO>> getReportsByBranch(@PathVariable Long branchId) {
        List<ShiftReportDTO> reports = shiftReportService.getShiftReportsByBranch(branchId);
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/cashier/{cashierId}/date")
    public ResponseEntity<ShiftReportDTO> getShiftByDate(
            @PathVariable Long cashierId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) throws Exception {
        ShiftReportDTO report = shiftReportService.getShiftByCashierAndDate(cashierId, date);
        return ResponseEntity.ok(report);
    }
}