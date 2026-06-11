import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api'; // Corrected capitalization path & removed getAuthHeaders

export const fetchEmployeesByBranch = createAsyncThunk(
    'employee/fetchByBranch',
    async (branchId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/employees/branch/${branchId}`);
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
            const response = await api.post('/api/employees', employeeData);
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
            await api.delete(`/api/employees/${employeeId}`);
            return employeeId;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove employee.");
        }
    }
);