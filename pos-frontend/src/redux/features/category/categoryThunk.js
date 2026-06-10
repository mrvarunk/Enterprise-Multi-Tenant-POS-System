import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const fetchCategoriesByStore = createAsyncThunk(
    'category/fetchByStore',
    async (storeId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/categories/store/${storeId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load store categories");
        }
    }
);