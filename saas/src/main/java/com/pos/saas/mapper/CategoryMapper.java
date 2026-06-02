package com.pos.saas.mapper;

import com.pos.saas.dto.CategoryDTO;
import com.pos.saas.model.Category;
import com.pos.saas.model.Store;

public class CategoryMapper {

    public static CategoryDTO toDTO(Category category) {
        if (category == null) {
            return null;
        }
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .storeId(category.getStore() != null ? category.getStore().getId() : null)
                .build();
    }

    public static Category toEntity(CategoryDTO dto, Store store) {
        if (dto == null) {
            return null;
        }
        return Category.builder()
                .id(dto.getId())
                .name(dto.getName())
                .store(store)
                .build();
    }
}