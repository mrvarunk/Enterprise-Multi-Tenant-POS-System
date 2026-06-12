package com.pos.saas.repository;

import com.pos.saas.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findByStoreId(Long storeId);

    // IDOR Protection: Verify branch belongs to tenant's store
    @SuppressWarnings("unused")
    Optional<Branch> findByIdAndStoreId(Long id, Long storeId);
}