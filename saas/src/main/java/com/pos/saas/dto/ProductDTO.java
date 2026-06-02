package com.pos.saas.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ProductDTO {
    private Long id;
    private String name;
    private String skuId;
    private String description;
    private double mrp;
    private double sellingPrice;
    private String brand;
    private String image;
    private Long storeId;
    private Long categoryId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}