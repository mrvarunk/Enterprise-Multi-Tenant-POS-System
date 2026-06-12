import { createSlice } from '@reduxjs/toolkit';
import { createOrder, getOrdersByBranch, getTodayOrdersByBranch, getRecentOrders } from './orderThunk';

const initialState = {
    orders: [],
    todayOrders: [],
    recentOrders: [],
    selectedOrder: null,
    loading: false,
    error: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearOrderState: (state) => {
            state.orders = [];
            state.todayOrders = [];
            state.recentOrders = [];
            state.selectedOrder = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Order
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                // Add the new order to the top of the recent orders list
                state.recentOrders.unshift(action.payload);
                state.todayOrders.unshift(action.payload);
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Recent Orders
            .addCase(getRecentOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getRecentOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.recentOrders = action.payload;
            })
            .addCase(getRecentOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get Today's Orders
            .addCase(getTodayOrdersByBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTodayOrdersByBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.todayOrders = action.payload;
            })
            .addCase(getTodayOrdersByBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All Branch Orders
            .addCase(getOrdersByBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOrdersByBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(getOrdersByBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;