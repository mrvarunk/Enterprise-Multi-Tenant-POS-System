import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api';

export const processRefund = createAsyncThunk(
    'refund/process',
    async (refundData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/refunds', refundData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to process return transaction.");
        }
    }
);

export const fetchOrderForRefund = createAsyncThunk(
    'refund/fetchOrder',
    async (orderId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/orders/${orderId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Receipt ID not found in system storage.");
        }
    }
);