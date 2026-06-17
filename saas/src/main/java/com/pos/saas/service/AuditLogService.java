package com.pos.saas.service;

import com.pos.saas.dto.AuditLogResponse;
import com.pos.saas.dto.AuditLogSummaryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.UUID;

public interface AuditLogService {

    Page<AuditLogSummaryResponse> getAllAuditLogs(Pageable pageable);

    AuditLogResponse getAuditLogById(UUID id);

    Page<AuditLogSummaryResponse> searchAuditLogs(
            Long userId,
            String action,
            String entityType,
            LocalDateTime startDate,
            LocalDateTime endDate,
            Pageable pageable
    );
}
