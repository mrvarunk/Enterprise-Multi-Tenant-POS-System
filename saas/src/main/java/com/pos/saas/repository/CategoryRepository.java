package com.pos.saas.repository;

import com.pos.saas.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByStoreId(Long storeId);

    // IDOR Protection: Verify category belongs to tenant's store
    @SuppressWarnings("unused")
    Optional<Category> findByIdAndStoreId(Long id, Long storeId);

    Optional<Category> findByNameAndStoreId(String name, Long storeId);
}