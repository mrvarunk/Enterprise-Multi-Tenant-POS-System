import { createSlice } from '@reduxjs/toolkit';
import { processRefund, fetchOrderForRefund } from './refundThunk';

const initialState = {
    orderToRefund: null,
    loading: false,
    processing: false,
    success: false,
    error: null
};

const refundSlice = createSlice({
    name: 'refund',
    initialState,
    reducers: {
        resetRefundState: (state) => {
            state.orderToRefund = null;
            state.loading = false;
            state.processing = false;
            state.success = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Lookup Order for Processing
            .addCase(fetchOrderForRefund.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.orderToRefund = null;
            })
            .addCase(fetchOrderForRefund.fulfilled, (state, action) => {
                state.loading = false;
                state.orderToRefund = action.payload;
            })
            .addCase(fetchOrderForRefund.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Execute Refund Transaction
            .addCase(processRefund.pending, (state) => {
                state.processing = true;
                state.success = false;
            })
            .addCase(processRefund.fulfilled, (state) => {
                state.processing = false;
                state.success = true;
                state.orderToRefund = null; // Clear working space layout
            })
            .addCase(processRefund.rejected, (state, action) => {
                state.processing = false;
                state.error = action.payload;
            });
    }
});

export const { resetRefundState } = refundSlice.actions;
export default refundSlice.reducer;