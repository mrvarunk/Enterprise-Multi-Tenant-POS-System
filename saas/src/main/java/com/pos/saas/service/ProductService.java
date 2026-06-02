package com.pos.saas.service;

import com.pos.saas.dto.ProductDTO;
import com.pos.saas.model.User;

import java.util.List;

public interface ProductService {
    ProductDTO createProduct(ProductDTO productDTO, User user) throws Exception;
    ProductDTO getProductById(Long id) throws Exception;
    ProductDTO updateProduct(Long id, ProductDTO productDTO, User user) throws Exception;
    void deleteProduct(Long id, User user) throws Exception;
    List<ProductDTO> getProductsByStoreId(Long storeId);
    List<ProductDTO> searchProduct(String keyword, Long storeId);
}