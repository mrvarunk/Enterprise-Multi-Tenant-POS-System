import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import CashierRoutes from './routes/CashierRoutes';
import AdminRoutes from './routes/AdminRoutes'; // <-- ADD THIS IMPORT
import CommandCenterLayout from './command-center/CommandCenterLayout';
import CommandCenterPage from './command-center/CommandCenterPage';
import { useSelector } from 'react-redux';

function App() {
    // Read the logged-in user profile from our Redux auth slice dynamically
    const { user } = useSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* TEMP preview route — remove before shipping */}
            <Route path="/preview" element={<CommandCenterLayout />}>
                <Route index element={<CommandCenterPage />} />
            </Route>


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
