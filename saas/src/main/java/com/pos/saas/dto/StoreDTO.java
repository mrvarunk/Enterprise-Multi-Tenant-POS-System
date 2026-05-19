package com.pos.saas.dto;

import com.pos.saas.domain.StoreStatus;
import com.pos.saas.model.StoreContact;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class StoreDTO {
    private Long id;
    private String brand;
    private UserDTO storeAdmin;
    private String description;
    private String storeType;
    private StoreStatus status;
    private StoreContact contact;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}