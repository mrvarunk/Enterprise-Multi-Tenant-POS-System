package com.pos.saas.repository;

import com.pos.saas.model.Refund;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface RefundRepository extends JpaRepository<Refund, Long> {
    List<Refund> findByCashierId(Long cashierId);
    List<Refund> findByBranchId(Long branchId);
    List<Refund> findByShiftReportId(Long shiftReportId);

    // Fetches filtering context across historical date ranges for managers
    List<Refund> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime start, LocalDateTime end);
}