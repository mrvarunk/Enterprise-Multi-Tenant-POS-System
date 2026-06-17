package com.pos.saas.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation to mark methods for which an audit log should be generated.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogAuditable {

    /**
     * The action being performed, e.g., "CREATE", "UPDATE", "DELETE".
     */
    String action();

    /**
     * The type of entity being operated on, e.g., "INVOICE", "PRODUCT".
     */
    String entityType();
}
