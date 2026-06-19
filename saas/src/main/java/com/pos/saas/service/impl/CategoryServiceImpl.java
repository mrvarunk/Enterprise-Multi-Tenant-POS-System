package com.pos.saas.service.impl;

import com.pos.saas.config.TenantContext;
import com.pos.saas.dto.CategoryDTO;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.mapper.CategoryMapper;
import com.pos.saas.model.Category;
import com.pos.saas.model.Store;
import com.pos.saas.repository.CategoryRepository;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;

    @Override
    @CacheEvict(value = "categoriesByStore", keyGenerator = "tenantAwareKeyGenerator", beforeInvocation = false)
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Store store = storeRepository.findById(categoryDTO.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + categoryDTO.getStoreId()));

        Category category = CategoryMapper.toEntity(categoryDTO, store);
        Category savedCategory = categoryRepository.save(category);
        return CategoryMapper.toDTO(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    @Cacheable(value = "categoriesByStore", keyGenerator = "tenantAwareKeyGenerator")
    public List<CategoryDTO> getCategoriesByStore(Long storeId) {
        return categoryRepository.findByStoreId(storeId).stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @CacheEvict(value = "categoriesByStore", keyGenerator = "tenantAwareKeyGenerator")
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Category not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Category category = categoryRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        category.setName(categoryDTO.getName());
        Category updatedCategory = categoryRepository.save(category);
        return CategoryMapper.toDTO(updatedCategory);
    }

    @Override
    @CacheEvict(value = "categoriesByStore", keyGenerator = "tenantAwareKeyGenerator")
    public void deleteCategory(Long id) {
        String tenantId = TenantContext.getTenantId();
        if (tenantId == null) {
            throw new ResourceNotFoundException("Category not found");
        }
        Long storeId = Long.parseLong(tenantId);
        Category category = categoryRepository.findByIdAndStoreId(id, storeId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        categoryRepository.delete(category);
    }
}