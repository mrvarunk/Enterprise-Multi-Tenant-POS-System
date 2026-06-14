import { useEffect, useState } from 'react';
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
        const branchId = user?.branchId || 1;
        dispatch(getTodayOrdersByBranch(branchId));
    }, [dispatch, user]);

    // Filter logic for the search bar (Search by Order ID)
    const filteredOrders = todayOrders.filter(order =>
        order.id.toString().includes(searchQuery)
    );

    return (
        <div className="flex flex-col h-full space-y-6 text-zinc-900">

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Today's Transactions</h1>
                    <p className="text-sm text-zinc-500">View and audit all receipts processed during this shift.</p>
                </div>

                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by Receipt ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm"
                    />
                </div>
            </div>

            {/* Data Table */}
            <div className="flex-1 overflow-hidden bg-white border border-zinc-200 rounded-xl shadow-sm">
                {loading ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-200 border-t-zinc-900"></div>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex flex-col h-full items-center justify-center text-muted-foreground space-y-3">
                        <FileText className="h-12 w-12 text-zinc-200" />
                        <p className="text-zinc-500">No transactions found for today.</p>
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
                                    <TableRow key={order.id} className="cursor-pointer hover:bg-zinc-50" onClick={() => setSelectedOrder(order)}>
                                        <TableCell className="font-medium text-zinc-900 tabular-nums">#{order.id}</TableCell>
                                        <TableCell>
                                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </TableCell>
                                        <TableCell>
                                            <span className="px-2.5 py-1 bg-zinc-50 text-zinc-700 border border-zinc-100 rounded-md text-xs font-medium">
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