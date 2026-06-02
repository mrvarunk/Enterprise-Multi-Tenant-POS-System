package com.pos.saas.controller;

import com.pos.saas.payload.dto.InventoryDTO;
import com.pos.saas.payload.response.ApiResponse;
import com.pos.saas.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inventories")
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryDTO> createInventory(@RequestBody InventoryDTO inventoryDTO) throws Exception {
        InventoryDTO createdInventory = inventoryService.createInventory(inventoryDTO);
        return ResponseEntity.ok(createdInventory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryDTO> updateInventory(
            @PathVariable Long id,
            @RequestBody InventoryDTO inventoryDTO) throws Exception {
        InventoryDTO updatedInventory = inventoryService.updateInventory(id, inventoryDTO);
        return ResponseEntity.ok(updatedInventory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteInventory(@PathVariable Long id) throws Exception {
        inventoryService.deleteInventory(id);
        ApiResponse res = new ApiResponse();
        res.setMessage("Inventory deleted successfully");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<InventoryDTO>> getAllInventoriesByBranch(@PathVariable Long branchId) {
        List<InventoryDTO> inventories = inventoryService.getAllInventoryByBranch(branchId);
        return ResponseEntity.ok(inventories);
    }

    @GetMapping("/product/{productId}/branch/{branchId}")
    public ResponseEntity<InventoryDTO> getInventoryByProductAndBranch(
            @PathVariable Long productId,
            @PathVariable Long branchId) throws Exception {
        InventoryDTO inventory = inventoryService.getInventoryByProductAndBranchId(productId, branchId);
        return ResponseEntity.ok(inventory);
    }
}