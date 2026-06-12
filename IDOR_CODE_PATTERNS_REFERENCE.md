# IDOR Security - Code Patterns Reference

## Pattern 1: Repository Query Method (For Direct Store Relationship)

### Example: ProductRepository
```java
// BEFORE (VULNERABLE)
Optional<Product> getProduct(Long id);  // Violates IDOR

// AFTER (SECURE)
Optional<Product> findByIdAndStoreId(Long id, Long storeId);
```

### Example: CategoryRepository
```java
// NEW METHOD
Optional<Category> findByIdAndStoreId(Long id, Long storeId);
```

### Example: BranchRepository
```java
// NEW METHOD
Optional<Branch> findByIdAndStoreId(Long id, Long storeId);
```

---

## Pattern 2: Repository Query Method (For Nested Store Relationship)

### Example: OrderRepository (Order → Branch → Store)
```java
// NEW METHOD
Optional<Order> findByIdAndBranch_StoreId(Long id, Long storeId);
```

### Example: InventoryRepository (Inventory → Branch → Store)
```java
// NEW METHOD
Optional<Inventory> findByIdAndBranch_StoreId(Long id, Long storeId);
```

---

## Pattern 3: Service Method - Readonly Get (GET endpoint)

### Template
```java
@Override
public DTOClass getResourceById(Long id) throws Exception {
    // STEP 1: Get tenant ID from context
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Resource not found");
    }
    
    // STEP 2: Convert to Long
    Long storeId = Long.parseLong(tenantId);
    
    // STEP 3: Query using tenant-aware method
    Resource resource = repository.findByIdAndStoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
    
    // STEP 4: Map to DTO and return
    return ResourceMapper.toDTO(resource);
}
```

### Real Example: ProductServiceImpl.getProductById()
```java
@Override
@Cacheable(value = "products", keyGenerator = "tenantAwareKeyGenerator")
public ProductDTO getProductById(Long id) throws Exception {
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Product not found");
    }
    Long storeId = Long.parseLong(tenantId);
    Product product = productRepository.findByIdAndStoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    return ProductMapper.toDTO(product);
}
```

---

## Pattern 4: Service Method - Write Operations (PUT/DELETE endpoints)

### Template for Update
```java
@Override
@CachePut(value = "resourceCache", keyGenerator = "tenantAwareKeyGenerator")
@CacheEvict(value = "relatedCache", keyGenerator = "tenantAwareKeyGenerator")
public DTOClass updateResource(Long id, DTOClass dto) throws Exception {
    // STEP 1: Get tenant ID
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Resource not found");
    }
    Long storeId = Long.parseLong(tenantId);
    
    // STEP 2: Query using tenant-aware method (AUTHORIZATION CHECK)
    Resource resource = repository.findByIdAndStoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
    
    // STEP 3: Modify resource
    resource.setField(dto.getField());
    // ... more field updates ...
    
    // STEP 4: Save and return
    Resource updated = repository.save(resource);
    return ResourceMapper.toDTO(updated);
}
```

### Template for Delete
```java
@Override
@org.springframework.cache.annotation.Caching(evict = {
        @CacheEvict(value = "resourceCache", keyGenerator = "tenantAwareKeyGenerator"),
        @CacheEvict(value = "relatedCache", keyGenerator = "tenantAwareKeyGenerator")
})
public void deleteResource(Long id) throws Exception {
    // STEP 1: Get tenant ID
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Resource not found");
    }
    Long storeId = Long.parseLong(tenantId);
    
    // STEP 2: Query using tenant-aware method (AUTHORIZATION CHECK)
    Resource resource = repository.findByIdAndStoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Resource not found"));
    
    // STEP 3: Delete
    repository.delete(resource);
}
```

### Real Example: ProductServiceImpl.deleteProduct()
```java
@Override
@org.springframework.cache.annotation.Caching(evict = {
        @CacheEvict(value = "products", keyGenerator = "tenantAwareKeyGenerator"),
        @CacheEvict(value = "productsByStore", keyGenerator = "tenantAwareKeyGenerator")
})
public void deleteProduct(Long id, User user) throws Exception {
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Product not found");
    }
    Long storeId = Long.parseLong(tenantId);
    Product product = productRepository.findByIdAndStoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    productRepository.delete(product);
}
```

---

## Pattern 5: Nested Relationship Example

### For Order (Order → Branch → Store)

**Repository Method:**
```java
// Uses relationship traversal syntax
Optional<Order> findByIdAndBranch_StoreId(Long id, Long storeId);
```

**Service Method:**
```java
@Override
public OrderDTO getOrderById(Long id) throws Exception {
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Order not found");
    }
    Long storeId = Long.parseLong(tenantId);
    
    // Traverses: Order.branch.store.id
    Order order = orderRepository.findByIdAndBranch_StoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    return OrderMapper.toDTO(order);
}
```

### For Inventory (Inventory → Branch → Store)

**Repository Method:**
```java
// Same pattern for nested relationships
Optional<Inventory> findByIdAndBranch_StoreId(Long id, Long storeId);
```

**Service Method:**
```java
@Override
public InventoryDTO getInventoryById(Long id) throws Exception {
    String tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
        throw new ResourceNotFoundException("Inventory not found");
    }
    Long storeId = Long.parseLong(tenantId);
    
    // Traverses: Inventory.branch.store.id
    Inventory inventory = inventoryRepository.findByIdAndBranch_StoreId(id, storeId)
            .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
    return InventoryMapper.toDTO(inventory);
}
```

---

## Key Principles to Remember

### 1. ALWAYS Use Tenant-Aware Queries
```java
// ❌ WRONG - Vulnerable to IDOR
repository.findById(id)

// ✅ CORRECT - Tenant-aware
repository.findByIdAndStoreId(id, tenantId)
```

### 2. ALWAYS Validate Tenant Context
```java
// ❌ WRONG - Missing null check
Long storeId = Long.parseLong(TenantContext.getTenantId());

// ✅ CORRECT - Safe null handling
String tenantId = TenantContext.getTenantId();
if (tenantId == null) {
    throw new ResourceNotFoundException("Resource not found");
}
Long storeId = Long.parseLong(tenantId);
```

### 3. ALWAYS Use Generic Error Messages
```java
// ❌ WRONG - Leaks information
throw new ResourceNotFoundException("Product " + id + " not found");

// ✅ CORRECT - Generic message
throw new ResourceNotFoundException("Product not found");
```

### 4. ALWAYS Check Authorization Before Modifying
```java
// ✅ CHECK FIRST
Product product = repository.findByIdAndStoreId(id, tenantId)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

// ✅ THEN MODIFY
product.setName(newName);
repository.save(product);

// ❌ WRONG - Would allow modification of foreign resources
Product product = repository.findById(id).get();
product.setName(newName);
repository.save(product);
```

---

## Import Statements Required

### For Service Classes
```java
import com.pos.saas.config.TenantContext;
import com.pos.saas.exception.ResourceNotFoundException;
```

### For Repository Interfaces
```java
import java.util.Optional;
```

---

## Testing the Implementation

### Test 1: Valid Tenant Access
```bash
# User from Store 1 accessing own resource
curl -X GET http://localhost:5000/api/products/42 \
  -H "Authorization: Bearer <STORE1_JWT>"

# Expected: 200 OK with product data
```

### Test 2: Invalid Tenant Access
```bash
# User from Store 2 accessing Store 1's resource
curl -X GET http://localhost:5000/api/products/42 \
  -H "Authorization: Bearer <STORE2_JWT>"

# Expected: 404 Not Found (generic message, no ID info)
```

### Test 3: Update Protection
```bash
# User from Store 2 trying to update Store 1's product
curl -X PUT http://localhost:5000/api/products/42 \
  -H "Authorization: Bearer <STORE2_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Name"}'

# Expected: 404 Not Found (tenant check prevents modification)
# Actual database: Product remains unchanged
```

### Test 4: Delete Protection
```bash
# User from Store 2 trying to delete Store 1's product
curl -X DELETE http://localhost:5000/api/products/42 \
  -H "Authorization: Bearer <STORE2_JWT>"

# Expected: 404 Not Found
# Actual database: Product is not deleted
```

---

## Quick Checklist for Adding IDOR Protection to New Resources

When adding a new resource to the system, ensure:

- [ ] Add tenant-aware repository query method
  - `Optional<Resource> findByIdAnd[TENANT_RELATIONSHIP]`
- [ ] Update GET endpoint service method
  - Add TenantContext retrieval
  - Add null check
  - Use tenant-aware query
  - Use generic error message
- [ ] Update PUT endpoint service method
  - Same pattern as GET
  - Add modification logic
  - Add cache eviction if applicable
- [ ] Update DELETE endpoint service method
  - Same pattern as GET
  - Add deletion logic
  - Add cache eviction if applicable
- [ ] Add imports
  - `TenantContext`
  - `ResourceNotFoundException`
  - `Optional` (for repository)
- [ ] Test with cross-tenant scenarios
  - Valid access
  - Invalid access (different tenant)
  - Verify generic error messages

---

## Relationship Types

### Type 1: Direct Relationship
```
Resource → Store
```
**Query:** `findByIdAndStoreId(id, storeId)`

Resources:
- Product
- Category
- Branch

### Type 2: Nested Relationship (Two levels)
```
Resource → Intermediate → Store
```
**Query:** `findByIdAnd[Intermediate]_StoreId(id, storeId)`

Resources:
- Order (Order → Branch → Store)
- Inventory (Inventory → Branch → Store)

### Type 3: Nested Relationship (Three or more levels)
Use the same `_` separator pattern, e.g.:
```
findByIdAnd[Level1]_[Level2]_StoreId(id, storeId)
```

---

## Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting TenantContext Check
```java
// VULNERABLE
public void deleteProduct(Long id) {
    repository.findById(id)  // No tenant check!
            .ifPresent(p -> repository.delete(p));
}
```

### ❌ Mistake 2: Leaking IDs in Error Messages
```java
// VULNERABLE - Attacker can enumerate IDs
throw new ResourceNotFoundException("Product " + id + " not found");
```

### ❌ Mistake 3: Checking Authorization After Retrieval
```java
// VULNERABLE - Still loads cross-tenant data
Product product = repository.findById(id).get();
if (!product.getStore().getId().equals(tenantId)) {
    throw new AccessDeniedException();
}
// Already loaded unauthorized data into memory!
```

### ❌ Mistake 4: Inconsistent Patterns
```java
// VULNERABLE - Mixed patterns
getProductById() uses tenant-aware query
updateProductById() uses findById()
// Different behavior = security bug
```

---

## Recommended Review Checklist

### Code Review
- [ ] All resources use tenant-aware queries
- [ ] No IDs leaked in error messages
- [ ] TenantContext properly initialized in filter
- [ ] TenantContext properly cleared in finally block
- [ ] Relationship traversal is correct (e.g., `Branch_StoreId`)
- [ ] Cache annotations use `tenantAwareKeyGenerator`

### Testing
- [ ] Unit tests with TenantContext mocking
- [ ] Integration tests with multiple stores
- [ ] Verification of generic error messages
- [ ] Performance testing (cache effectiveness)
- [ ] Load testing (concurrent tenant access)

### Security
- [ ] No bypass paths around tenant checks
- [ ] All write operations protected
- [ ] All read operations for single resources protected
- [ ] List operations scoped appropriately
- [ ] Cross-tenant cache isolation verified


