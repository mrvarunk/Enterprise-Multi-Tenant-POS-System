package com.pos.saas.mapper;

import com.pos.saas.dto.StoreDTO;
import com.pos.saas.model.Store;
import com.pos.saas.model.User;

public class StoreMapper {

    public static StoreDTO toDTO(Store store) {
        return StoreDTO.builder()
                .id(store.getId())
                .brand(store.getBrand())
                .storeAdmin(UserMapper.toDTO(store.getStoreAdmin()))
                .description(store.getDescription())
                .storeType(store.getStoreType())
                .status(store.getStatus())
                .contact(store.getContact())
                .createdAt(store.getCreatedAt())
                .updatedAt(store.getUpdatedAt())
                .build();
    }

    public static Store toEntity(StoreDTO dto, User user) {
        return Store.builder()
                .brand(dto.getBrand())
                .description(dto.getDescription())
                .storeType(dto.getStoreType())
                .storeAdmin(user)
                .contact(dto.getContact())
                .build();
    }
}