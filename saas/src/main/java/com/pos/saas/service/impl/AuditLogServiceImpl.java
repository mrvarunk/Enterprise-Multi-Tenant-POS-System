package com.pos.saas.service.impl;

import com.pos.saas.config.TenantContext;
import com.pos.saas.dto.AuditLogResponse;
import com.pos.saas.dto.AuditLogSummaryResponse;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.exception.UnauthorizedException;
import com.pos.saas.model.AuditLog;
import com.pos.saas.repository.AuditLogRepository;
import com.pos.saas.service.AuditLogService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    private Long getTenantId() {
        String tenantIdStr = TenantContext.getTenantId();
        if (tenantIdStr == null || tenantIdStr.isEmpty()) {
            throw new UnauthorizedException("Tenant context is missing");
        }
        return Long.parseLong(tenantIdStr);
    }

    @Override
    public Page<AuditLogSummaryResponse> getAllAuditLogs(Pageable pageable) {
        Long tenantId = getTenantId();
        return auditLogRepository.findByTenantId(tenantId, pageable)
                .map(this::mapToSummary);
    }

    @Override
    public AuditLogResponse getAuditLogById(UUID id) {
        Long tenantId = getTenantId();
        AuditLog auditLog = auditLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Audit log not found"));

        if (!auditLog.getTenantId().equals(tenantId)) {
            throw new UnauthorizedException("You do not have permission to view this log");
        }

        return mapToResponse(auditLog);
    }

    @Override
    public Page<AuditLogSummaryResponse> searchAuditLogs(Long userId, String action, String entityType, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable) {
        Long tenantId = getTenantId();

        return auditLogRepository.findAll((root, query, criteriaBuilder) -> {
            var predicate = criteriaBuilder.conjunction();
            predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("tenantId"), tenantId));

            if (userId != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("userId"), userId));
            }
            if (action != null && !action.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("action"), action));
            }
            if (entityType != null && !entityType.isEmpty()) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.equal(root.get("entityType"), entityType));
            }
            if (startDate != null && endDate != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.between(root.get("timestamp"), startDate, endDate));
            } else if (startDate != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.greaterThanOrEqualTo(root.get("timestamp"), startDate));
            } else if (endDate != null) {
                predicate = criteriaBuilder.and(predicate, criteriaBuilder.lessThanOrEqualTo(root.get("timestamp"), endDate));
            }

            return predicate;
        }, pageable).map(this::mapToSummary);
    }

    private AuditLogSummaryResponse mapToSummary(AuditLog log) {
        return AuditLogSummaryResponse.builder()
                .id(log.getId())
                .username(log.getUsername())
                .action(log.getAction())
                .entityType(log.getEntityType())
                .timestamp(log.getTimestamp())
                .ipAddress(log.getIpAddress())
                .build();
    }

    private AuditLogResponse mapToResponse(AuditLog log) {
        return AuditLogResponse.builder()
                .id(log.getId())
                .tenantId(log.getTenantId())
                .userId(log.getUserId())
                .username(log.getUsername())
                .action(log.getAction())
                .entityType(log.getEntityType())
                .entityId(log.getEntityId())
                .oldValue(log.getOldValue())
                .newValue(log.getNewValue())
                .ipAddress(log.getIpAddress())
                .requestPath(log.getRequestPath())
                .httpMethod(log.getHttpMethod())
                .timestamp(log.getTimestamp())
                .build();
    }
}
