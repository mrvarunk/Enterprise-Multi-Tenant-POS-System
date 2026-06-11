import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api';

export const startShift = createAsyncThunk(
    'shift/start',
    async (cashierId, { rejectWithValue }) => {
        try {
            const response = await api.post(`/api/shift-reports/start/cashier/${cashierId}`, {});
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
            const response = await api.get(`/api/shift-reports/live/cashier/${cashierId}`);
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
            const response = await api.put(`/api/shift-reports/end/${shiftId}`, {});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to end shift.");
        }
    }
);