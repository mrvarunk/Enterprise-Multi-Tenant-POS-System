import { createSlice } from '@reduxjs/toolkit';
import { getLiveShift, endShift } from './shiftThunk';

const initialState = {
    currentShift: null,
    isActive: false,
    loading: false,
    error: null
};

const shiftSlice = createSlice({
    name: 'shift',
    initialState,
    reducers: {
        clearShiftState: (state) => {
            state.currentShift = null;
            state.isActive = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Get Live Shift
            .addCase(getLiveShift.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLiveShift.fulfilled, (state, action) => {
                state.loading = false;
                state.currentShift = action.payload;
                state.isActive = action.payload && !action.payload.endTime;
            })
            .addCase(getLiveShift.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isActive = false;
            })
            // End Shift
            .addCase(endShift.fulfilled, (state, action) => {
                state.currentShift = action.payload;
                state.isActive = false;
            });
    }
});

export const { clearShiftState } = shiftSlice.actions;
export default shiftSlice.reducer;