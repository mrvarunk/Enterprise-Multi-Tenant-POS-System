import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api'; // Corrected path capitalization to match filesystem

// 1. Fetch all products belonging to a specific store
export const fetchProductsByStore = createAsyncThunk(
    'product/fetchByStore',
    async (storeId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/products/store/${storeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load store products");
        }
    }
);

// 2. Create a brand new inventory product
export const createProduct = createAsyncThunk(
    'product/create',
    async (productData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/products', productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add product record.");
        }
    }
);

// 3. Update existing product parameters via ID
export const updateProduct = createAsyncThunk(
    'product/update',
    async ({ productId, productData }, { rejectWithValue }) => {
        try {
            const response = await api.patch(`/api/products/${productId}`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update product details.");
        }
    }
);

// 4. Delete a product from inventory by ID
export const deleteProduct = createAsyncThunk(
    'product/delete',
    async (productId, { rejectWithValue }) => {
        try {
            await api.delete(`/api/products/${productId}`);
            return productId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove product from inventory.");
        }
    }
);

// 5. Search for products within a specific store using a text keyword
export const searchProducts = createAsyncThunk(
    'product/search',
    async ({ storeId, keyword }, { rejectWithValue }) => {
        try {
            // Reaches out to GET /api/products/search?storeId=X&keyword=Y in ProductController
            const response = await api.get('/api/products/search', {
                params: { storeId, keyword }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Product search query failed.");
        }
    }
);