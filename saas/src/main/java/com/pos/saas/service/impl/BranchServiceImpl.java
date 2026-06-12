package com.pos.saas.service.impl;

import com.pos.saas.config.TenantContext;
import com.pos.saas.dto.BranchDTO;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.mapper.BranchMapper;
import com.pos.saas.model.Branch;
import com.pos.saas.model.Store;
import com.pos.saas.model.User;
import com.pos.saas.repository.BranchRepository;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.repository.UserRepository;
import com.pos.saas.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final StoreRepository storeRepository;
    private final UserRepository userRepository;

    @Override
    public BranchDTO createBranch(BranchDTO dto) {
        Store store = storeRepository.findById(dto.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + dto.getStoreId()));

        User manager = null;
        if (dto.getManagerId() != null) {
            manager = userRepository.findById(dto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Manager not found"));
        }

        Branch branch = BranchMapper.toEntity(dto, store, manager);
        Branch savedBranch = branchRepository.save(branch);
        return BranchMapper.toDTO(savedBranch);
    }

    @Override
    public BranchDTO getBranchById(Long id) {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Branch not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Branch branch = branchRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));
        return BranchMapper.toDTO(branch);
    }

    @Override
    public List<BranchDTO> getAllBranchesByStoreId(Long storeId) {
        return branchRepository.findByStoreId(storeId).stream()
                .map(BranchMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BranchDTO updateBranch(Long id, BranchDTO dto) {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Branch not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Branch existingBranch = branchRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));

        existingBranch.setName(dto.getName());
        existingBranch.setAddress(dto.getAddress());
        existingBranch.setPhone(dto.getPhone());
        existingBranch.setEmail(dto.getEmail());
        existingBranch.setWorkingDays(dto.getWorkingDays());
        existingBranch.setOpenTime(dto.getOpenTime());
        existingBranch.setCloseTime(dto.getCloseTime());

        // Update manager if requested
        if (dto.getManagerId() != null &&
                (existingBranch.getManager() == null || !existingBranch.getManager().getId().equals(dto.getManagerId()))) {
            User manager = userRepository.findById(dto.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("Manager not found"));
            existingBranch.setManager(manager);
        }

        Branch updatedBranch = branchRepository.save(existingBranch);
        return BranchMapper.toDTO(updatedBranch);
    }

    @Override
    public void deleteBranch(Long id) {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Branch not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Branch branch = branchRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Branch not found"));
        branchRepository.delete(branch);
    }
}