import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, FileText } from 'lucide-react';
import { getTodayOrdersByBranch } from '@/redux/features/order/orderThunk.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import OrderDetailsModal from './OrderDetailsModal';

export default function OrderHistory() {
    const dispatch = useDispatch();

    // Selectors
    const { todayOrders, loading } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.auth);

    // Local State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Fetch orders when the screen loads
    useEffect(() => {
        if (user?.branchId) {
            dispatch(getTodayOrdersByBranch(user.branchId));
        }
    }, [dispatch, user]);

    // Filter logic for the search bar (Search by Order ID)
    const filteredOrders = todayOrders.filter(order =>
        order.id.toString().includes(searchQuery)
    );

    return (
        <div className="flex flex-col h-full space-y-6">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Today's Transactions</h1>
                    <p className="text-sm text-muted-foreground">View and audit all receipts processed during this shift.</p>
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by Receipt ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-card border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-hidden bg-card border border-border rounded-xl shadow-sm">
                {loading ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex flex-col h-full items-center justify-center text-muted-foreground space-y-3">
                        <FileText className="h-12 w-12 opacity-20" />
                        <p>No transactions found for today.</p>
                    </div>
                ) : (
                    <div className="h-full overflow-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Receipt ID</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead>Items Count</TableHead>
                                    <TableHead className="text-right">Total Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOrders.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        className="cursor-pointer hover:bg-secondary/50"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        <TableCell className="font-medium text-primary">#{order.id}</TableCell>
                                        <TableCell>
                                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2.5 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium">
                                                {order.paymentType}
                                            </span>
                                        </TableCell>
                                        <TableCell>{order.items?.length || 0} items</TableCell>
                                        <TableCell className="text-right font-bold">
                                            ₹{order.totalAmount.toFixed(2)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>

            {/* Modal Injection */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={!!selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </div>
    );
}