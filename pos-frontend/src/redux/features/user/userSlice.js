import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, getAllCustomersAsUsers, getAllCashiers, getUserById } from './userThunk';

const initialState = {
    userProfile: null,
    users: [],
    customers: [],
    cashiers: [],
    selectedUser: null,
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserState: (state) => {
            state.userProfile = null;
            state.selectedUser = null;
            state.users = [];
            state.customers = [];
            state.cashiers = [];
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Profile Cases
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Cashiers Cases
            .addCase(getAllCashiers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCashiers.fulfilled, (state, action) => {
                state.loading = false;
                state.cashiers = action.payload;
            })
            .addCase(getAllCashiers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Customer Users Context
            .addCase(getAllCustomersAsUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            // User By ID Context
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            });
    }
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;