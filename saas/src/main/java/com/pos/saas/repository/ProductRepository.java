package com.pos.saas.repository;

import com.pos.saas.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByStoreId(Long storeId);

    // IDOR Protection: Verify product belongs to tenant's store
    @SuppressWarnings("unused")
    Optional<Product> findByIdAndStoreId(Long id, Long storeId);

    @Query("SELECT p FROM Product p WHERE p.store.id = :storeId AND " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.barcode) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Product> searchProduct(@Param("keyword") String keyword, @Param("storeId") Long storeId);
}