package com.pos.saas.config;

/**
 * TenantContext holds the current request's tenant/store id in a ThreadLocal.
 * Use setTenantId/getTenantId/clear to manage lifecycle. Always clear in a finally.
 */
public final class TenantContext {
    private static final ThreadLocal<String> currentTenant = new ThreadLocal<>();

    private TenantContext() { }

    public static void setTenantId(String tenantId) {
        if (tenantId == null) {
            currentTenant.remove();
        } else {
            currentTenant.set(tenantId);
        }
    }

    public static String getTenantId() {
        String t = currentTenant.get();
        return (t == null || t.isEmpty()) ? null : t;
    }

    public static void clear() {
        currentTenant.remove();
    }
}

