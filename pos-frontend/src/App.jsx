import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import CashierRoutes from './routes/CashierRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useSelector } from 'react-redux';
import LoadingScreen from './components/LoadingScreen';
import POSView from './cafeops/BaristaPOSView';

function App() {
    const [appReady, setAppReady] = useState(false);

    // Read the logged-in user profile from our Redux auth slice dynamically
    const { user } = useSelector((state) => state.auth);

    // Show premium loading screen on initial app load
    if (!appReady) {
        return <LoadingScreen onComplete={() => setAppReady(true)} />;
    }

    return (
        <Routes>
            {/* CafeOps Preview Route — no auth required */}
            <Route path="/pos" element={<POSView />} />

            <Route path="/login" element={<Login />} />

            {/* Conditional Route Guard Routing Context Tree */}
            <Route
                path="/cashier/*"
                element={user?.role === 'ROLE_BRANCH_CASHIER' || user?.role === 'ROLE_CASHIER' ? <CashierRoutes /> : <Login />}
            />

            <Route
                path="/admin/*"
                element={user?.role === 'ROLE_ADMIN' || user?.role === 'ROLE_STORE_MANAGER' || user?.role === 'ROLE_BRANCH_MANAGER' ? <AdminRoutes /> : <Login />}
            />

            {/* Structural Wildcard Fallback Handling Pipeline */}
            <Route path="/*" element={<Login />} />
        </Routes>
    );
}

export default App;