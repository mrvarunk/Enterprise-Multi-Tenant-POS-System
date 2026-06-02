package com.pos.saas.repository;

import com.pos.saas.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    List<User> findByStoreId(Long storeId);
    List<User> findByBranchId(Long branchId);
}