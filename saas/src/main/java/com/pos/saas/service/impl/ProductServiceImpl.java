package com.pos.saas.service.impl;

import com.pos.saas.dto.ProductDTO;
import com.pos.saas.mapper.ProductMapper;
import com.pos.saas.model.Product;
import com.pos.saas.model.Store;
import com.pos.saas.model.User;
import com.pos.saas.repository.ProductRepository;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;

    @Override
    public ProductDTO createProduct(ProductDTO productDTO, User user) throws Exception {
        Store store = storeRepository.findById(productDTO.getStoreId())
                .orElseThrow(() -> new Exception("Store not found"));

        Product product = ProductMapper.toEntity(productDTO, store);
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toDTO(savedProduct);
    }

    @Override
    public ProductDTO getProductById(Long id) throws Exception {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found"));
        return ProductMapper.toDTO(product);
    }

    @Override
    public ProductDTO updateProduct(Long id, ProductDTO productDTO, User user) throws Exception {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found"));

        if (productDTO.getName() != null) existingProduct.setName(productDTO.getName());
        if (productDTO.getDescription() != null) existingProduct.setDescription(productDTO.getDescription());
        if (productDTO.getSkuId() != null) existingProduct.setSkuId(productDTO.getSkuId());
        if (productDTO.getImage() != null) existingProduct.setImage(productDTO.getImage());
        if (productDTO.getMrp() != 0) existingProduct.setMrp(productDTO.getMrp());
        if (productDTO.getSellingPrice() != 0) existingProduct.setSellingPrice(productDTO.getSellingPrice());
        if (productDTO.getBrand() != null) existingProduct.setBrand(productDTO.getBrand());

        existingProduct.setUpdatedAt(LocalDateTime.now());
        Product updatedProduct = productRepository.save(existingProduct);
        return ProductMapper.toDTO(updatedProduct);
    }

    @Override
    public void deleteProduct(Long id, User user) throws Exception {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new Exception("Product not found"));
        productRepository.delete(product);
    }

    @Override
    public List<ProductDTO> getProductsByStoreId(Long storeId) {
        List<Product> products = productRepository.findByStoreId(storeId);
        return products.stream().map(ProductMapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> searchProduct(String keyword, Long storeId) {
        List<Product> products = productRepository.searchProduct(keyword, storeId);
        return products.stream().map(ProductMapper::toDTO).collect(Collectors.toList());
    }
}