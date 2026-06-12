package com.pos.saas.service.impl;

import com.pos.saas.config.TenantContext;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.mapper.InventoryMapper;
import com.pos.saas.model.Branch;
import com.pos.saas.model.Inventory;
import com.pos.saas.model.Product;
import com.pos.saas.payload.dto.InventoryDTO;
import com.pos.saas.repository.BranchRepository;
import com.pos.saas.repository.InventoryRepository;
import com.pos.saas.repository.ProductRepository;
import com.pos.saas.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;

    @Override
    public InventoryDTO createInventory(InventoryDTO inventoryDTO) throws Exception {
        Branch branch = branchRepository.findById(inventoryDTO.getBranchId())
                .orElseThrow(() -> new Exception("Branch not found"));

        Product product = productRepository.findById(inventoryDTO.getProductId())
                .orElseThrow(() -> new Exception("Product not exist"));

        Inventory inventory = InventoryMapper.toEntity(inventoryDTO, branch, product);
        Inventory savedInventory = inventoryRepository.save(inventory);

        return InventoryMapper.toDTO(savedInventory);
    }

    @Override
    public InventoryDTO updateInventory(Long id, InventoryDTO inventoryDTO) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Inventory not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Inventory existingInventory = inventoryRepository.findByIdAndBranch_StoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));

        existingInventory.setQuantity(inventoryDTO.getQuantity());
        Inventory updatedInventory = inventoryRepository.save(existingInventory);

        return InventoryMapper.toDTO(updatedInventory);
    }

    @Override
    public void deleteInventory(Long id) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Inventory not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Inventory inventory = inventoryRepository.findByIdAndBranch_StoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
        inventoryRepository.delete(inventory);
    }

    @Override
    public InventoryDTO getInventoryById(Long id) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Inventory not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Inventory inventory = inventoryRepository.findByIdAndBranch_StoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found"));
        return InventoryMapper.toDTO(inventory);
    }

    @Override
    public InventoryDTO getInventoryByProductAndBranchId(Long productId, Long branchId) throws Exception {
        Inventory inventory = inventoryRepository.findByProductIdAndBranchId(productId, branchId);
        if (inventory == null) {
            throw new Exception("Inventory not found for this product and branch");
        }
        return InventoryMapper.toDTO(inventory);
    }

    @Override
    public List<InventoryDTO> getAllInventoryByBranch(Long branchId) {
        List<Inventory> inventories = inventoryRepository.findByBranchId(branchId);
        return inventories.stream()
                .map(InventoryMapper::toDTO)
                .collect(Collectors.toList());
    }
}