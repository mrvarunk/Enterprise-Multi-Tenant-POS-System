import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api'; // Corrected capitalization path & removed getAuthHeaders

export const fetchCategoriesByStore = createAsyncThunk(
    'category/fetchByStore',
    async (storeId, { rejectWithValue }) => {
        try {
            // The interceptor automatically attaches the Bearer token behind the scenes
            const response = await api.get(`/api/categories/store/${storeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load store categories");
        }
    }
);