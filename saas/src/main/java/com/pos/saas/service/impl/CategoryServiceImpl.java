package com.pos.saas.service.impl;

import com.pos.saas.dto.CategoryDTO;
import com.pos.saas.exception.ResourceNotFoundException;
import com.pos.saas.exception.UnauthorizedException;
import com.pos.saas.mapper.CategoryMapper;
import com.pos.saas.model.Category;
import com.pos.saas.model.Store;
import com.pos.saas.repository.CategoryRepository;
import com.pos.saas.repository.StoreRepository;
import com.pos.saas.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;

    @Override
    public CategoryDTO createCategory(CategoryDTO categoryDTO) {
        Store store = storeRepository.findById(categoryDTO.getStoreId())
                .orElseThrow(() -> new ResourceNotFoundException("Store not found with id: " + categoryDTO.getStoreId()));

        Category category = CategoryMapper.toEntity(categoryDTO, store);
        Category savedCategory = categoryRepository.save(category);
        return CategoryMapper.toDTO(savedCategory);
    }

    @Override
    public List<CategoryDTO> getCategoriesByStore(Long storeId) {
        return categoryRepository.findByStoreId(storeId).stream()
                .map(CategoryMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        category.setName(categoryDTO.getName());
        Category updatedCategory = categoryRepository.save(category);
        return CategoryMapper.toDTO(updatedCategory);
    }

    @Override
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        // Contextual authorization logic check built around [04:51:19]
        boolean isAdmin = true; // Placeholder for actual security context evaluation
        boolean isManager = false;

        if (!isAdmin && !isManager) {
            throw new UnauthorizedException("You do not have permission to delete this category.");
        }

        categoryRepository.delete(category);
    }
}