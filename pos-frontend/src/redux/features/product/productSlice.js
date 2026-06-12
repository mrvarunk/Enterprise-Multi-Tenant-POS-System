import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsByStore, searchProducts, createProduct, updateProduct, deleteProduct } from './productThunk';

const initialState = {
    products: [],
    searchResults: [],
    loading: false,
    error: null,
    // Add an action loading state for buttons
    actionLoading: false
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        clearSearchResults: (state) => {
            state.searchResults = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Products By Store
            .addCase(fetchProductsByStore.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsByStore.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductsByStore.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Admin: Create Product
            .addCase(createProduct.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.products.push(action.payload); // Add new item to the UI instantly
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })

            // Admin: Update Product
            .addCase(updateProduct.pending, (state) => {
                state.actionLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.actionLoading = false;
                // Find and replace the old product with the updated one
                const index = state.products.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.actionLoading = false;
                state.error = action.payload;
            })

            // Admin: Delete Product
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(p => p.id !== action.payload);
            })

            // Search Products
            .addCase(searchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearSearchResults } = productSlice.actions;
export default productSlice.reducer;