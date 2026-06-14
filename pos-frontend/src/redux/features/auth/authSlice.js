import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authThunk';

// Safely parse persisted user from localStorage
const loadUser = () => {
    try {
        const stored = localStorage.getItem('USER');
        return stored ? JSON.parse(stored) : null;
    } catch {
        return null;
    }
};

const initialState = {
    user: loadUser(),
    jwt: localStorage.getItem('JWT') || null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.jwt = null;
            localStorage.removeItem('JWT');
            localStorage.removeItem('USER');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt;
                state.user = action.payload.user;
                // Persist user so it survives page refresh
                localStorage.setItem('USER', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;