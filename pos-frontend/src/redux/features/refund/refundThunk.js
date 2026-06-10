import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const processRefund = createAsyncThunk(
    'refund/process',
    async (refundData, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            // Reaches out to the backend RefundController
            const response = await api.post('/api/refunds', refundData, config);
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
            const config = getAuthHeaders();
            const response = await api.get(`/api/orders/${orderId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Receipt ID not found in system storage.");
        }
    }
);