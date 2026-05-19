package com.pos.saas.service.impl;

import com.pos.saas.domain.StoreStatus;
import com.pos.saas.dto.StoreDTO;
import com.pos.saas.exception.UserException;
import com.pos.saas.mapper.StoreMapper;
import com.pos.saas.model.Store;
import com.pos.saas.model.StoreContact;
import com.pos.saas.model.User;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.service.StoreService;
import com.pos.saas.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public StoreDTO createStore(StoreDTO storeDTO, User user) {
        Store store = StoreMapper.toEntity(storeDTO, user);
        Store savedStore = storeRepository.save(store);
        return StoreMapper.toDTO(savedStore);
    }

    @Override
    public StoreDTO getStoreById(Long id) throws UserException {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new UserException("Store not found"));
        return StoreMapper.toDTO(store);
    }

    @Override
    public List<StoreDTO> getAllStores() {
        return storeRepository.findAll()
                .stream()
                .map(StoreMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StoreDTO getStoreByAdmin() throws UserException {
        User currentUser = userService.getCurrentUser();
        Store store = storeRepository.findByStoreAdminId(currentUser.getId());
        return StoreMapper.toDTO(store);
    }

    @Override
    public StoreDTO getStoreByEmployee() throws UserException {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null) {
            throw new UserException("You don't have permission to access the store");
        }
        return StoreMapper.toDTO(currentUser.getStore());
    }

    @Override
    public StoreDTO updateStore(Long id, StoreDTO storeDTO) throws UserException {
        User currentUser = userService.getCurrentUser();
        Store existingStore = storeRepository.findByStoreAdminId(currentUser.getId());

        if (existingStore == null) {
            throw new UserException("Store not found");
        }

        if (storeDTO.getBrand() != null) existingStore.setBrand(storeDTO.getBrand());
        if (storeDTO.getDescription() != null) existingStore.setDescription(storeDTO.getDescription());
        if (storeDTO.getStoreType() != null) existingStore.setStoreType(storeDTO.getStoreType());

        if (storeDTO.getContact() != null) {
            StoreContact contact = StoreContact.builder()
                    .address(storeDTO.getContact().getAddress())
                    .phone(storeDTO.getContact().getPhone())
                    .email(storeDTO.getContact().getEmail())
                    .build();
            existingStore.setContact(contact);
        }

        existingStore.setUpdatedAt(LocalDateTime.now());
        Store updatedStore = storeRepository.save(existingStore);
        return StoreMapper.toDTO(updatedStore);
    }

    @Override
    public void deleteStore(Long id) throws UserException {
        User currentUser = userService.getCurrentUser();
        Store store = storeRepository.findByStoreAdminId(currentUser.getId());
        if (store == null) {
            throw new UserException("Store not found");
        }
        storeRepository.delete(store);
    }

    @Override
    public StoreDTO moderateStore(Long id, StoreStatus status) throws UserException {
        Store store = storeRepository.findById(id)
                .orElseThrow(() -> new UserException("Store not found"));
        store.setStatus(status);
        Store updatedStore = storeRepository.save(store);
        return StoreMapper.toDTO(updatedStore);
    }
}