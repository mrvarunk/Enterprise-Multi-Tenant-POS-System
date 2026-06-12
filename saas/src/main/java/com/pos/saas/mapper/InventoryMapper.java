package com.pos.saas.mapper;

import com.pos.saas.model.Branch;
import com.pos.saas.model.Inventory;
import com.pos.saas.model.Product;
import com.pos.saas.dto.InventoryDTO;

public class InventoryMapper {

    public static InventoryDTO toDTO(Inventory inventory) {
        return InventoryDTO.builder()
                .id(inventory.getId())
                .branchId(inventory.getBranch() != null ? inventory.getBranch().getId() : null)
                .productId(inventory.getProduct() != null ? inventory.getProduct().getId() : null)
                .quantity(inventory.getQuantity())
                .build();
    }

    public static Inventory toEntity(InventoryDTO dto, Branch branch, Product product) {
        return Inventory.builder()
                .branch(branch)
                .product(product)
                .quantity(dto.getQuantity())
                .build();
    }
}