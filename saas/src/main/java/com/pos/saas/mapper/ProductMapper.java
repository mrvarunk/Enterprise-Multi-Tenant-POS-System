package com.pos.saas.mapper;

import com.pos.saas.dto.ProductDTO;
import com.pos.saas.model.Product;
import com.pos.saas.model.Store;

public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .skuId(product.getSkuId())
                .description(product.getDescription())
                .mrp(product.getMrp())
                .sellingPrice(product.getSellingPrice())
                .brand(product.getBrand())
                .storeId(product.getStore() != null ? product.getStore().getId() : null)
                .image(product.getImage())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public static Product toEntity(ProductDTO dto, Store store) {
        return Product.builder()
                .name(dto.getName())
                .skuId(dto.getSkuId())
                .description(dto.getDescription())
                .mrp(dto.getMrp())
                .sellingPrice(dto.getSellingPrice())
                .brand(dto.getBrand())
                .store(store)
                .build();
    }
}