package com.pos.saas.config;

import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * KeyGenerator that prefixes cache keys with tenant id to avoid cross-tenant cache leaks.
 */
@Component("tenantAwareKeyGenerator")
public class TenantAwareKeyGenerator implements KeyGenerator {

    @Override
    public Object generate(Object target, Method method, Object... params) {
        String tenant = TenantContext.getTenantId();
        if (tenant == null || tenant.isEmpty()) {
            tenant = "GLOBAL";
        }
        StringBuilder key = new StringBuilder();
        key.append(tenant).append(":")
                .append(target.getClass().getSimpleName()).append(":")
                .append(method.getName()).append(":")
                .append(Arrays.deepToString(params));

        return key.toString();
    }
}

