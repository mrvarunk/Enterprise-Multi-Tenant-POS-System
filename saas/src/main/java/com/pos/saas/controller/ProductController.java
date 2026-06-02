package com.pos.saas.controller;

import com.pos.saas.dto.ProductDTO;
import com.pos.saas.payload.response.ApiResponse;
import com.pos.saas.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
            @RequestBody ProductDTO productDTO,
            @RequestHeader("Authorization") String jwt) throws Exception {

        // Temporarily passing null for user until complete integration
        ProductDTO createdProduct = productService.createProduct(productDTO, null);
        return ResponseEntity.ok(createdProduct);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductDTO>> getProductByStoreId(@PathVariable Long storeId) {
        return ResponseEntity.ok(productService.getProductsByStoreId(storeId));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductDTO productDTO) throws Exception {
        return ResponseEntity.ok(productService.updateProduct(id, productDTO, null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProduct(@PathVariable Long id) throws Exception {
        productService.deleteProduct(id, null);
        ApiResponse response = new ApiResponse();
        response.setMessage("Product deleted successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProduct(
            @RequestParam("storeId") Long storeId,
            @RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(productService.searchProduct(keyword, storeId));
    }
}