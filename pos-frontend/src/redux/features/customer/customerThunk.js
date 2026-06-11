import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api';

export const createCustomer = createAsyncThunk(
    'customer/create',
    async (customerData, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/customers', customerData);
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
            const response = await api.put(`/api/customers/${id}`, customerData);
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
            await api.delete(`/api/customers/${id}`);
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
            const response = await api.get(`/api/customers/${id}`);
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
            const response = await api.get('/api/customers');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch all customers");
        }
    }
);