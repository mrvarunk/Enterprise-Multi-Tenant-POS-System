package com.pos.saas.service;

import com.pos.saas.domain.StoreStatus;
import com.pos.saas.dto.StoreDTO;
import com.pos.saas.exception.UserException;
import com.pos.saas.model.User;

import java.util.List;

public interface StoreService {
    StoreDTO createStore(StoreDTO storeDTO, User user);
    StoreDTO getStoreById(Long id) throws UserException;
    List<StoreDTO> getAllStores();
    StoreDTO getStoreByAdmin() throws UserException;
    StoreDTO getStoreByEmployee() throws UserException;
    StoreDTO updateStore(Long id, StoreDTO storeDTO) throws UserException;
    void deleteStore(Long id) throws UserException;
    StoreDTO moderateStore(Long id, StoreStatus status) throws UserException;
}