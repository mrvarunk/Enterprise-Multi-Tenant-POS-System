package com.pos.saas.service;

import com.pos.saas.dto.InventoryDTO;
import java.util.List;

public interface InventoryService {
    InventoryDTO createInventory(InventoryDTO inventoryDTO) throws Exception;
    InventoryDTO updateInventory(Long id, InventoryDTO inventoryDTO) throws Exception;
    void deleteInventory(Long id) throws Exception;
    InventoryDTO getInventoryById(Long id) throws Exception;
    InventoryDTO getInventoryByProductAndBranchId(Long productId, Long branchId) throws Exception;
    List<InventoryDTO> getAllInventoryByBranch(Long branchId);
}