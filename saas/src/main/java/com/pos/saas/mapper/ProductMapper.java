package com.pos.saas.mapper;

import com.pos.saas.dto.ProductDTO;
import com.pos.saas.model.Product;
import com.pos.saas.model.Store;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        ProductDTO.CategoryDTO categoryDTO = null;
        if (product.getCategory() != null) {
            categoryDTO = ProductDTO.CategoryDTO.builder()
                    .id(product.getCategory().getId())
                    .name(product.getCategory().getName())
                    .build();
        }

        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .barcode(product.getBarcode())
                .description(product.getDescription())
                .costPrice(product.getCostPrice())
                .mrp(product.getMrp())
                .sellingPrice(product.getSellingPrice())
                .brand(product.getBrand())
                .storeId(product.getStore() != null ? product.getStore().getId() : null)
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .category(categoryDTO)
                .image(product.getImage())
                .stockQuantity(product.getStockQuantity())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public static Product toEntity(ProductDTO dto, Store store) {
        return Product.builder()
                .name(dto.getName())
                .barcode(dto.getBarcode())
                .description(dto.getDescription())
                .costPrice(dto.getCostPrice())
                .mrp(dto.getMrp())
                .sellingPrice(dto.getSellingPrice())
                .brand(dto.getBrand())
                .stockQuantity(dto.getStockQuantity())
                .store(store)
                .build();
    }
}