package com.pos.saas.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Long id;
    private String name;
    private String barcode;
    private String description;
    private double costPrice;
    private double mrp;
    private double sellingPrice;
    private String brand;
    private String image;
    private Integer stockQuantity;
    private Long storeId;
    private Long categoryId;
    private CategoryDTO category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    public static class CategoryDTO implements Serializable {
        private static final long serialVersionUID = 1L;
        private Long id;
        private String name;
    }
}