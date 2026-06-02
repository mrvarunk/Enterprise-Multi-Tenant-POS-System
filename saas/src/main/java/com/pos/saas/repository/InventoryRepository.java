package com.pos.saas.repository;

import com.pos.saas.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByProductId(Long productId);

    List<Inventory> findByBranchId(Long branchId);

    Inventory findByProductIdAndBranchId(Long productId, Long branchId);
}