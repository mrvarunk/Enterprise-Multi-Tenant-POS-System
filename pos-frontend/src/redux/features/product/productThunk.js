import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/api'; // Standard interceptor instance

export const fetchProductsByStore = createAsyncThunk(
    'product/fetchByStore',
    async (storeId, { rejectWithValue }) => {
        try {
            // No custom config payload required! The interceptor handles it invisibly.
            const response = await api.get(`/api/products/store/${storeId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load store products");
        }
    }
);