import { createAsyncThunk } from '@reduxjs/toolkit';
import api, { getAuthHeaders } from '../../../utils/api';

export const createCustomer = createAsyncThunk(
    'customer/create',
    async (customerData, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.post('/api/customers', customerData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create customer");
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/update',
    async ({ id, customerData }, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.put(`/api/customers/${id}`, customerData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update customer");
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/delete',
    async (id, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            await api.delete(`/api/customers/${id}`, config);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete customer");
        }
    }
);

export const fetchCustomerById = createAsyncThunk(
    'customer/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get(`/api/customers/${id}`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch customer");
        }
    }
);

export const fetchAllCustomers = createAsyncThunk(
    'customer/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const config = getAuthHeaders();
            const response = await api.get('/api/customers', config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch all customers");
        }
    }
);