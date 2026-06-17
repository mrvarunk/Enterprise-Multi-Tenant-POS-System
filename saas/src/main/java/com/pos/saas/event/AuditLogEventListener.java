package com.pos.saas.event;

import com.pos.saas.model.AuditLog;
import com.pos.saas.repository.AuditLogRepository;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class AuditLogEventListener {

    private final AuditLogRepository auditLogRepository;

    public AuditLogEventListener(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Async("auditLogExecutor")
    @EventListener
    public void handleAuditLogEvent(AuditLogEvent event) {
        AuditLog auditLog = AuditLog.builder()
                .tenantId(event.getTenantId())
                .userId(event.getUserId())
                .username(event.getUsername())
                .action(event.getAction())
                .entityType(event.getEntityType())
                .entityId(event.getEntityId())
                .oldValue(event.getOldValue())
                .newValue(event.getNewValue())
                .ipAddress(event.getIpAddress())
                .requestPath(event.getRequestPath())
                .httpMethod(event.getHttpMethod())
                .timestamp(event.getTimestamp())
                .build();

        auditLogRepository.save(auditLog);
    }
}
