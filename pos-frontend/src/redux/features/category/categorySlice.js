import { createSlice } from '@reduxjs/toolkit';
import { fetchCategoriesByStore } from './categoryThunk';

const initialState = {
    categories: [],
    loading: false,
    error: null
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesByStore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoriesByStore.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategoriesByStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;