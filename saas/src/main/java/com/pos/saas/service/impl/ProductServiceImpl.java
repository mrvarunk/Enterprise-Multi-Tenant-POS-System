package com.pos.saas.service.impl;

import com.pos.saas.config.TenantContext;
import com.pos.saas.dto.ProductDTO;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.mapper.ProductMapper;
import com.pos.saas.model.Product;
import com.pos.saas.model.Store;
import com.pos.saas.model.User;
import com.pos.saas.repository.CategoryRepository;
import com.pos.saas.repository.ProductRepository;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;

    @Override
    @CachePut(value = "products", keyGenerator = "tenantAwareKeyGenerator")
    @CacheEvict(value = "productsByStore", keyGenerator = "tenantAwareKeyGenerator", beforeInvocation = false)
    public ProductDTO createProduct(ProductDTO productDTO, User user) throws Exception {
        Store store = storeRepository.findById(productDTO.getStoreId())
                .orElseThrow(() -> new Exception("Store not found"));

        Product product = ProductMapper.toEntity(productDTO, store);
        if (productDTO.getCategoryId() != null) {
            categoryRepository.findById(productDTO.getCategoryId())
                    .ifPresent(product::setCategory);
        }
        Product savedProduct = productRepository.save(product);
        return ProductMapper.toDTO(savedProduct);
    }

    @Override
    @Cacheable(value = "products", keyGenerator = "tenantAwareKeyGenerator")
    public ProductDTO getProductById(Long id) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Product not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Product product = productRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return ProductMapper.toDTO(product);
    }

    @Override
    @CachePut(value = "products", keyGenerator = "tenantAwareKeyGenerator")
    @CacheEvict(value = "productsByStore", keyGenerator = "tenantAwareKeyGenerator")
    public ProductDTO updateProduct(Long id, ProductDTO productDTO, User user) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Product not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Product existingProduct = productRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (productDTO.getName() != null) existingProduct.setName(productDTO.getName());
        if (productDTO.getDescription() != null) existingProduct.setDescription(productDTO.getDescription());
        if (productDTO.getBarcode() != null) existingProduct.setBarcode(productDTO.getBarcode());
        if (productDTO.getImage() != null) existingProduct.setImage(productDTO.getImage());
        if (productDTO.getMrp() != 0) existingProduct.setMrp(productDTO.getMrp());
        if (productDTO.getSellingPrice() != 0) existingProduct.setSellingPrice(productDTO.getSellingPrice());
        if (productDTO.getBrand() != null) existingProduct.setBrand(productDTO.getBrand());
        if (productDTO.getCostPrice() != 0) existingProduct.setCostPrice(productDTO.getCostPrice());
        if (productDTO.getStockQuantity() != null) existingProduct.setStockQuantity(productDTO.getStockQuantity());
        if (productDTO.getCategoryId() != null) {
            categoryRepository.findById(productDTO.getCategoryId())
                    .ifPresent(existingProduct::setCategory);
        }

        existingProduct.setUpdatedAt(LocalDateTime.now());
        Product updatedProduct = productRepository.save(existingProduct);
        return ProductMapper.toDTO(updatedProduct);
    }

    @Override
    @org.springframework.cache.annotation.Caching(evict = {
            @CacheEvict(value = "products", keyGenerator = "tenantAwareKeyGenerator"),
            @CacheEvict(value = "productsByStore", keyGenerator = "tenantAwareKeyGenerator")
    })
    public void deleteProduct(Long id, User user) throws Exception {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Product not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Product product = productRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepository.delete(product);
    }

    @Override
    @Cacheable(value = "productsByStore", keyGenerator = "tenantAwareKeyGenerator")
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