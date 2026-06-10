import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Format: { product, quantity }
    selectedCustomer: null,
    note: '',
    discount: {
        type: 'PERCENTAGE', // PERCENTAGE or FIXED
        value: 0
    },
    paymentMethod: 'CASH', // CASH, CARD, UPI
    heldOrders: [],
    currentOrder: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.product.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ product, quantity: 1 });
            }
        },
        updateCartItemQuantity: (state, action) => {
            const { productId, quantity } = action.payload;

            if (quantity <= 0) {
                state.items = state.items.filter(item => item.product.id !== productId);
            } else {
                const item = state.items.find(item => item.product.id === productId);
                if (item) {
                    item.quantity = quantity;
                }
            }
        },
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter(item => item.product.id !== productId);
        },
        setSelectedCustomer: (state, action) => {
            state.selectedCustomer = action.payload;
        },
        setNote: (state, action) => {
            state.note = action.payload;
        },
        setDiscount: (state, action) => {
            state.discount = action.payload;
        },
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
        holdOrder: (state) => {
            if (state.items.length > 0) {
                const heldOrder = {
                    id: Date.now(),
                    items: [...state.items],
                    customer: state.selectedCustomer,
                    note: state.note,
                    discount: { ...state.discount },
                    timestamp: new Date().toISOString()
                };
                state.heldOrders.push(heldOrder);

                // Clear active cart values
                state.items = [];
                state.selectedCustomer = null;
                state.note = '';
                state.discount = { type: 'PERCENTAGE', value: 0 };
                state.paymentMethod = 'CASH';
            }
        },
        resumeOrder: (state, action) => {
            const orderId = action.payload;
            const orderToResume = state.heldOrders.find(order => order.id === orderId);

            if (orderToResume) {
                state.items = orderToResume.items;
                state.selectedCustomer = orderToResume.customer;
                state.note = orderToResume.note;
                state.discount = orderToResume.discount;

                // Remove from held listing queue
                state.heldOrders = state.heldOrders.filter(order => order.id !== orderId);            }
        },
        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        },
        clearCart: (state) => {
            state.items = [];
            state.selectedCustomer = null;
            state.note = '';
            state.discount = { type: 'PERCENTAGE', value: 0 };
            state.paymentMethod = 'CASH';
            state.currentOrder = null;
        }
    }
});

// Structural Selectors for Component Consumptions
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.items.reduce((acc, item) => acc + item.quantity, 0);
export const selectSelectedCustomer = (state) => state.cart.selectedCustomer;
export const selectNote = (state) => state.cart.note;
export const selectDiscount = (state) => state.cart.discount;
export const selectPaymentMethod = (state) => state.cart.paymentMethod;
export const selectHeldOrders = (state) => state.cart.heldOrders;
export const selectCurrentOrder = (state) => state.cart.currentOrder;

// Dynamic Financial Calculation Metrics Selectors
export const selectSubtotal = (state) => {
    return state.cart.items.reduce((total, item) => total + (item.product.sellingPrice * item.quantity), 0);
};

export const selectTax = (state) => {
    const subtotal = selectSubtotal(state);
    return subtotal * 0.18; // Enforces standard fallback 18% corporate operational taxation rate
};

export const selectDiscountAmount = (state) => {
    const subtotal = selectSubtotal(state);
    const { type, value } = state.cart.discount;
    if (type === 'PERCENTAGE') {
        return (subtotal * value) / 100;
    }
    return value; // FIXED discount value context encapsulation fallback matching numeric structures
};

export const selectTotal = (state) => {
    const subtotal = selectSubtotal(state);
    const tax = selectTax(state);
    const discountAmount = selectDiscountAmount(state);
    return Math.max(0, (subtotal + tax) - discountAmount);
};

export const {
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    setSelectedCustomer,
    setNote,
    setDiscount,
    setPaymentMethod,
    holdOrder,
    resumeOrder,
    setCurrentOrder,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;