import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const createOrder = createAsyncThunk(
    'order/create',
    async ({ orderData, cashierId }, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.post(`/api/orders/cashier/${cashierId}`, orderData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to process transaction.");
        }
    }
);

export const getOrdersByBranch = createAsyncThunk(
    'order/getByBranch',
    async (branchId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/orders/branch/${branchId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch branch orders.");
        }
    }
);

export const getTodayOrdersByBranch = createAsyncThunk(
    'order/getTodayByBranch',
    async (branchId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/orders/branch/${branchId}/today`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch today's orders.");
        }
    }
);

export const getRecentOrders = createAsyncThunk(
    'order/getRecent',
    async (branchId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/orders/branch/${branchId}/recent`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch recent orders.");
        }
    }
);