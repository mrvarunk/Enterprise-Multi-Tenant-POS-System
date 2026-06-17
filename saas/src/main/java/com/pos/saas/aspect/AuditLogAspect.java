package com.pos.saas.aspect;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pos.saas.annotation.LogAuditable;
import com.pos.saas.config.TenantContext;
import com.pos.saas.event.AuditLogEvent;
import com.pos.saas.model.User;
import com.pos.saas.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;

@Aspect
@Component
public class AuditLogAspect {

    private final ApplicationEventPublisher eventPublisher;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public AuditLogAspect(ApplicationEventPublisher eventPublisher, UserRepository userRepository, ObjectMapper objectMapper) {
        this.eventPublisher = eventPublisher;
        this.userRepository = userRepository;
        this.objectMapper = objectMapper;
    }

    @AfterReturning(pointcut = "@annotation(logAuditable)", returning = "result")
    public void logAudit(JoinPoint joinPoint, LogAuditable logAuditable, Object result) {
        Long userId = null;
        Long tenantId = null;
        String username = null;

        // 1. Extract User from SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof String) {
            String email = (String) authentication.getPrincipal();
            User user = userRepository.findByEmail(email);
            if (user != null) {
                userId = user.getId();
                username = user.getFullName() != null ? user.getFullName() : email;
            } else {
                username = email;
            }
        }

        // 2. Extract Tenant ID from TenantContext
        String tenantIdStr = TenantContext.getTenantId();
        if (tenantIdStr != null && !tenantIdStr.isEmpty()) {
            try {
                tenantId = Long.parseLong(tenantIdStr);
            } catch (NumberFormatException ignored) {}
        }

        // 3. Extract Http Request info
        String ipAddress = null;
        String requestPath = null;
        String httpMethod = null;
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            ipAddress = request.getHeader("X-Forwarded-For");
            if (ipAddress == null || ipAddress.isEmpty()) {
                ipAddress = request.getRemoteAddr();
            }
            requestPath = request.getRequestURI();
            httpMethod = request.getMethod();
        }

        // 4. Extract Entity ID from the returned result object or arguments
        String entityId = null;
        if (result != null) {
            try {
                java.lang.reflect.Method getIdMethod = result.getClass().getMethod("getId");
                Object id = getIdMethod.invoke(result);
                if (id != null) {
                    entityId = id.toString();
                }
            } catch (Exception ignored) {}
        }

        if (entityId == null) {
            // Try looking for an ID in the method arguments
            MethodSignature signature = (MethodSignature) joinPoint.getSignature();
            String[] parameterNames = signature.getParameterNames();
            Object[] args = joinPoint.getArgs();
            for (int i = 0; i < parameterNames.length; i++) {
                if (parameterNames[i].equalsIgnoreCase("id") && args[i] != null) {
                    entityId = args[i].toString();
                    break;
                }
            }
        }

        // 5. Serialize arguments to newValue
        String newValue = null;
        Object[] args = joinPoint.getArgs();
        if (args != null && args.length > 0) {
            try {
                // If there's a payload, it's usually the first or second argument. Just serialize the first complex one or all.
                // We'll serialize the array of arguments for completeness, ignoring simple types if we only want payload, 
                // but serializing all args is safest.
                newValue = objectMapper.writeValueAsString(args.length == 1 ? args[0] : args);
            } catch (JsonProcessingException ignored) {}
        }

        // 6. Publish the Event
        AuditLogEvent event = AuditLogEvent.builder()
                .userId(userId)
                .tenantId(tenantId)
                .username(username)
                .action(logAuditable.action())
                .entityType(logAuditable.entityType())
                .entityId(entityId)
                .newValue(newValue)
                .ipAddress(ipAddress)
                .requestPath(requestPath)
                .httpMethod(httpMethod)
                .timestamp(LocalDateTime.now())
                .build();

        eventPublisher.publishEvent(event);
    }
}
