package com.pos.saas.mapper;

import com.pos.saas.dto.BranchDTO;
import com.pos.saas.model.Branch;
import com.pos.saas.model.Store;
import com.pos.saas.model.User;

public class BranchMapper {

    public static BranchDTO toDTO(Branch branch) {
        if (branch == null) return null;

        return BranchDTO.builder()
                .id(branch.getId())
                .name(branch.getName())
                .address(branch.getAddress())
                .phone(branch.getPhone())
                .email(branch.getEmail())
                .workingDays(branch.getWorkingDays())
                .openTime(branch.getOpenTime())
                .closeTime(branch.getCloseTime())
                .storeId(branch.getStore() != null ? branch.getStore().getId() : null)
                .managerId(branch.getManager() != null ? branch.getManager().getId() : null)
                .build();
    }

    public static Branch toEntity(BranchDTO dto, Store store, User manager) {
        if (dto == null) return null;

        return Branch.builder()
                .id(dto.getId())
                .name(dto.getName())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .email(dto.getEmail())
                .workingDays(dto.getWorkingDays())
                .openTime(dto.getOpenTime())
                .closeTime(dto.getCloseTime())
                .store(store)
                .manager(manager)
                .build();
    }
}