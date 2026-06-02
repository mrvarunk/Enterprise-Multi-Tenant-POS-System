package com.pos.saas.service;

import com.pos.saas.dto.BranchDTO;
import java.util.List;

public interface BranchService {
    BranchDTO createBranch(BranchDTO branchDTO);
    BranchDTO getBranchById(Long id);
    List<BranchDTO> getAllBranchesByStoreId(Long storeId);
    BranchDTO updateBranch(Long id, BranchDTO branchDTO);
    void deleteBranch(Long id);
}