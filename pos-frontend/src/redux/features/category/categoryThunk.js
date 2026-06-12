import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api'; // Corrected capitalization path & removed getAuthHeaders

export const fetchCategoriesByStore = createAsyncThunk(
    'category/fetchByStore',
    async (storeId, { rejectWithValue }) => {
        try {
            console.log(`Fetching categories for store: ${storeId}`);
            const response = await api.get(`/api/categories/store/${storeId}`);
            console.log('Categories fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            return rejectWithValue(error.response?.data?.message || "Failed to load store categories");
        }
    }
);