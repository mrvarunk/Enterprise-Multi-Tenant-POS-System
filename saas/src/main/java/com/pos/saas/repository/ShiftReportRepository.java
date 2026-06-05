package com.pos.saas.repository;

import com.pos.saas.model.ShiftReport;
import com.pos.saas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShiftReportRepository extends JpaRepository<ShiftReport, Long> {
    List<ShiftReport> findByCashierId(Long cashierId);
    List<ShiftReport> findByBranchId(Long branchId);

    // Finds the current unclosed shift for a cashier session
    Optional<ShiftReport> findTopByCashierAndShiftEndTimeIsNullOrderByShiftStartTimeDesc(User cashier);

    // Safety verification check to block multiple shift initializations on the same active day
    Optional<ShiftReport> findByCashierAndShiftStartTimeBetween(User cashier, LocalDateTime start, LocalDateTime end);
}