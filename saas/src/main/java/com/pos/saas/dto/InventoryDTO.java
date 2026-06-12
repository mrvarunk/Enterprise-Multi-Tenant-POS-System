package com.pos.saas.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InventoryDTO {
    private Long id;
    private Long branchId;
    private Long productId;
    private Integer quantity;
}