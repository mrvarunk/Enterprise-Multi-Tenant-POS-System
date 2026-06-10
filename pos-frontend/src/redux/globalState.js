import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import customerReducer from './features/customer/customerSlice';
import productReducer from './features/product/productSlice';
import categoryReducer from './features/category/categorySlice';
import cartReducer from './features/cart/cartSlice';
import orderReducer from './features/order/orderSlice';
import shiftReducer from './features/shift/shiftSlice';
import refundReducer from './features/refund/refundSlice';
import employeeReducer from './features/employee/employeeSlice'; // <-- Mounted Employee Roster

const globalState = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        customer: customerReducer,
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer,
        order: orderReducer,
        shift: shiftReducer,
        refund: refundReducer,
        employee: employeeReducer // <-- Exposed to Admin UI layout dispatchers
    }
});

export default globalState;