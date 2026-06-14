import { Routes, Route } from 'react-router-dom';
import CashierDashboardLayout from '../cashier/CashierDashboardLayout';
import CashierOverviewPage from '../cashier/CashierOverviewPage';
import CreateOrderPage from '../cashier/CreateOrderPage';
import OrderHistory from '../cashier/orderHistory/OrderHistory';
import RefundPage from '../cashier/refund/RefundPage';
import ShiftSummaryPage from '../cashier/shiftReport/ShiftSummaryPage';

export default function CashierRoutes() {
    return (
        <Routes>
            <Route path="/" element={<CashierDashboardLayout />}>
                <Route index element={<CashierOverviewPage />} />
                <Route path="dashboard" element={<CashierOverviewPage />} />
                <Route path="terminal" element={<CreateOrderPage />} />
                <Route path="orders" element={<OrderHistory />} />
                <Route path="returns" element={<RefundPage />} />
                <Route path="shift-summary" element={<ShiftSummaryPage />} />
            </Route>
        </Routes>
    );
}