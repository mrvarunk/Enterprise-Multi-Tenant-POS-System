import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../Utils/api';

export const loginUser = createAsyncThunk(
    'auth/login',
    async (loginData, { rejectWithValue }) => {
        try {
            // Reaches out to your Spring Boot AuthController (assuming /auth/login)
            const response = await api.post('/auth/login', loginData);

            // Save the token to local storage so the user stays logged in
            if (response.data.jwt) {
                localStorage.setItem('JWT', response.data.jwt);
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to login. Please check credentials."
            );
        }
    }
);
