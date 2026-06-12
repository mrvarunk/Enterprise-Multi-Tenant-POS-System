package com.pos.saas.repository;

import com.pos.saas.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByBranchId(Long branchId);
    List<Order> findByCashierId(Long cashierId);

    // IDOR Protection: Verify order belongs to tenant's store via branch relationship
    @SuppressWarnings({"unused", "Since15"})
    Optional<Order> findByIdAndBranch_StoreId(Long id, Long storeId);

    // Tracks daily shift revenue matching operational bounds
    List<Order> findByBranchIdAndCreatedAtBetween(Long branchId, LocalDateTime start, LocalDateTime end);

    // Populates the "Recent Orders" component inside terminal views
    List<Order> findTop5ByBranchIdOrderByCreatedAtDesc(Long branchId);
}