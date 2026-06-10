import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import CashierRoutes from './routes/CashierRoutes';
import AdminRoutes from './routes/AdminRoutes'; // <-- ADD THIS IMPORT
import { useSelector } from 'react-redux';

function App() {
    // Read the logged-in user profile from our Redux auth slice dynamically
    const { user } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Conditional Route Guard Routing Context Tree */}
            <Route
                path="/cashier/*"
                element={user?.role === 'BRANCH_CASHIER' ? <CashierRoutes /> : <Login />}
            />

            <Route
                path="/admin/*"
                element={user?.role === 'SUPER_ADMIN' || user?.role === 'STORE_OWNER' ? <AdminRoutes /> : <Login />}
            />

            {/* Structural Wildcard Fallback Handling Pipeline */}
            <Route path="/*" element={<Login />} />
        </Routes>
    );
}

export default App;