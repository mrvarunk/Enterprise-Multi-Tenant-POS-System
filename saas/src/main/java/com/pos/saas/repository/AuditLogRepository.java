package com.pos.saas.repository;

import com.pos.saas.model.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Repository for managing AuditLog persistence and providing search functionalities.
 */
@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, UUID>, JpaSpecificationExecutor<AuditLog> {

    Page<AuditLog> findByTenantId(Long tenantId, Pageable pageable);

    Page<AuditLog> findByTenantIdAndUserId(Long tenantId, Long userId, Pageable pageable);

    Page<AuditLog> findByTenantIdAndAction(Long tenantId, String action, Pageable pageable);

    Page<AuditLog> findByTenantIdAndEntityType(Long tenantId, String entityType, Pageable pageable);

    Page<AuditLog> findByTenantIdAndTimestampBetween(Long tenantId, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}
