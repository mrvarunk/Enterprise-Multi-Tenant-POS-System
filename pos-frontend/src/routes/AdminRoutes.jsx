import { Routes, Route } from 'react-router-dom';
import AdminDashboardLayout from '../admin/AdminDashboardLayout';
import AdminOverviewPage from '../admin/AdminOverviewPage.jsx';
import InventoryManagement from '../admin/inventory/InventoryManagement';
import EmployeeManagement from '../admin/employees/EmployeeManagement';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminDashboardLayout />}>
                <Route index element={<AdminOverviewPage />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="employees" element={<EmployeeManagement />} />
            </Route>
        </Routes>
    );
}