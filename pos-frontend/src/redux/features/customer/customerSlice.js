import { createSlice } from '@reduxjs/toolkit';
import { createCustomer, updateCustomer, deleteCustomer, fetchCustomerById, fetchAllCustomers } from './customerThunk';

const initialState = {
    customers: [],
    selectedCustomer: null,
    loading: false,
    error: null
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        clearSelectedCustomer: (state) => {
            state.selectedCustomer = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchAllCustomers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCustomers.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = action.payload;
            })
            .addCase(fetchAllCustomers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create Customer Hook
            .addCase(createCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers.push(action.payload);
            })
            // Update Customer Immutable Mutation
            .addCase(updateCustomer.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.customers.findIndex(c => c.id === action.payload.id);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
                if (state.selectedCustomer && state.selectedCustomer.id === action.payload.id) {
                    state.selectedCustomer = action.payload;
                }
            })
            // Delete Filtering Context
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.customers = state.customers.filter(c => c.id !== action.payload);
                if (state.selectedCustomer && state.selectedCustomer.id === action.payload) {
                    state.selectedCustomer = null;
                }
            })
            // Fetch Specific Profile Match
            .addCase(fetchCustomerById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCustomer = action.payload;
            });
    }
});

export const { clearSelectedCustomer } = customerSlice.actions;
export default customerSlice.reducer;