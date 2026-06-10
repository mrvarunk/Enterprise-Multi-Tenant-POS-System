import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const getUserProfile = createAsyncThunk(
    'user/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get('/api/employees/profile', config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
        }
    }
);

export const getAllCustomersAsUsers = createAsyncThunk(
    'user/getAllCustomersAsUsers',
    async (_, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get('/api/employees/customer', config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch system user customers");
        }
    }
);

export const getAllCashiers = createAsyncThunk(
    'user/getAllCashiers',
    async (branchId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/employees/branch/${branchId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch cashiers");
        }
    }
);

export const getUserById = createAsyncThunk(
    'user/getById',
    async (userId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/employees/${userId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch user by ID");
        }
    }
);