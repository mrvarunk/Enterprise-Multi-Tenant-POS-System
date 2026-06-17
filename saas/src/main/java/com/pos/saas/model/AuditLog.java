package com.pos.saas.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Entity representing an asynchronous audit log entry.
 */
@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "tenant_id", nullable = false)
    private Long tenantId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "username")
    private String username;

    @Column(nullable = false)
    private String action; // CREATE, UPDATE, DELETE, LOGIN, LOGOUT, VIEW

    @Column(name = "entity_type", nullable = false)
    private String entityType; // PRODUCT, ORDER, CUSTOMER, USER, INVENTORY

    @Column(name = "entity_id")
    private String entityId;

    @Column(name = "old_value", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private String oldValue;

    @Column(name = "new_value", columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    private String newValue;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "request_path")
    private String requestPath;

    @Column(name = "http_method")
    private String httpMethod;

    @Column(nullable = false)
    private LocalDateTime timestamp;
}
