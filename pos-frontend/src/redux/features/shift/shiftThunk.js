import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const startShift = createAsyncThunk(
    'shift/start',
    async (cashierId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.post(`/api/shift-reports/start/cashier/${cashierId}`, {}, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to start shift.");
        }
    }
);

export const getLiveShift = createAsyncThunk(
    'shift/getLive',
    async (cashierId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/shift-reports/live/cashier/${cashierId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch active shift data.");
        }
    }
);

export const endShift = createAsyncThunk(
    'shift/end',
    async (shiftId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.put(`/api/shift-reports/end/${shiftId}`, {}, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to end shift.");
        }
    }
);