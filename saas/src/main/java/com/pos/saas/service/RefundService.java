package com.pos.saas.service;

import com.pos.saas.dto.RefundDTO;
import java.time.LocalDateTime;
import java.util.List;

public interface RefundService {
    RefundDTO createRefund(RefundDTO refundDTO, Long cashierId) throws Exception;
    List<RefundDTO> getAllRefunds();
    List<RefundDTO> getRefundsByCashier(Long cashierId);
    List<RefundDTO> getRefundsByBranch(Long branchId);
    List<RefundDTO> getRefundsByShiftReport(Long shiftReportId);
    List<RefundDTO> getRefundsByCashierAndDateRange(Long cashierId, LocalDateTime start, LocalDateTime end);
    RefundDTO getRefundById(Long id) throws Exception;
    void deleteRefund(Long id) throws Exception;
}