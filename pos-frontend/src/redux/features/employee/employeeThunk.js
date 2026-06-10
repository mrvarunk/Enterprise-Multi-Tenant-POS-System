import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const fetchEmployeesByBranch = createAsyncThunk(
    'employee/fetchByBranch',
    async (branchId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/employees/branch/${branchId}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load staff roster.");
        }
    }
);

export const createEmployee = createAsyncThunk(
    'employee/create',
    async (employeeData, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.post('/api/employees', employeeData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create employee account.");
        }
    }
);

export const deleteEmployee = createAsyncThunk(
    'employee/delete',
    async (employeeId, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            await api.delete(`/api/employees/${employeeId}`, config);
            return employeeId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove employee.");
        }
    }
);