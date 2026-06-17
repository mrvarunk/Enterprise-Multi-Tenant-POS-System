package com.pos.saas.event;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AuditLogEvent {
    private final Long tenantId;
    private final Long userId;
    private final String username;
    private final String action;
    private final String entityType;
    private final String entityId;
    private final String oldValue;
    private final String newValue;
    private final String ipAddress;
    private final String requestPath;
    private final String httpMethod;
    private final LocalDateTime timestamp;
}
