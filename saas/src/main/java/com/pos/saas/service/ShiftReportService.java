package com.pos.saas.service;

import com.pos.saas.dto.ShiftReportDTO;
import java.time.LocalDateTime;
import java.util.List;

public interface ShiftReportService {
    ShiftReportDTO startShift(Long cashierId) throws Exception;
    ShiftReportDTO endShift(Long shiftId) throws Exception;
    ShiftReportDTO getShiftReportById(Long id) throws Exception;
    ShiftReportDTO getLiveShiftProgress(Long cashierId) throws Exception;
    List<ShiftReportDTO> getAllShiftReports();
    List<ShiftReportDTO> getShiftReportsByCashier(Long cashierId);
    List<ShiftReportDTO> getShiftReportsByBranch(Long branchId);
    ShiftReportDTO getShiftByCashierAndDate(Long cashierId, LocalDateTime date) throws Exception;
}