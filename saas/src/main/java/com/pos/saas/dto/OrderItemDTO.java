package com.pos.saas.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private Integer quantity;
    private Double price;
    private ProductDTO product; // Nested product metadata for the frontend invoice view
}