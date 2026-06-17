package com.pos.saas.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Lightweight DTO for listing Audit Logs on a dashboard.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuditLogSummaryResponse {
    private UUID id;
    private String username;
    private String action;
    private String entityType;
    private LocalDateTime timestamp;
    private String ipAddress;
}
