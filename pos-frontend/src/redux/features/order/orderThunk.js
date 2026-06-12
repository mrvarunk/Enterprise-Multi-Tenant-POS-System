import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api';

export const createOrder = createAsyncThunk(
    'order/create',
    async ({ orderData, cashierId }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/orders/cashier/${cashierId}`, orderData);
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
            console.log(`Fetching orders for branch: ${branchId}`);
            const response = await api.get(`/api/orders/branch/${branchId}`);
            console.log('Orders fetched:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            return rejectWithValue(error.response?.data?.message || "Failed to fetch branch orders.");
        }
    }
);

export const getTodayOrdersByBranch = createAsyncThunk(
    'order/getTodayByBranch',
    async (branchId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/orders/branch/${branchId}/today`);
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
            const response = await api.get(`/api/orders/branch/${branchId}/recent`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch recent orders.");
        }
    }
);