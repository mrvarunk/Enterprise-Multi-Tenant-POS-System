import { Routes, Route } from 'react-router-dom';
import CommandCenterLayout from '../command-center/CommandCenterLayout';
import CommandCenterPage from '../command-center/CommandCenterPage';
import InventoryManagement from '../admin/inventory/InventoryManagement';
import EmployeeManagement from '../admin/employees/EmployeeManagement';

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CommandCenterLayout />}>
                <Route index element={<CommandCenterPage />} />
                <Route path="inventory" element={<InventoryManagement />} />
                <Route path="employees" element={<EmployeeManagement />} />
            </Route>
        </Routes>
    );
}
