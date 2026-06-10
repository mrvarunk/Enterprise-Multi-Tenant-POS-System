import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { fetchOrderForRefund, processRefund } from '../../redux/features/refund/refundThunk';
import { resetRefundState } from '../../redux/features/refund/refundSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';

export default function RefundPage() {
    const dispatch = useDispatch();

    // Global Redux State Selectors
    const { orderToRefund, loading, processing, success, error } = useSelector((state) => state.refund);
    const { user } = useSelector((state) => state.auth);

    // Local Component States
    const [receiptIdInput, setReceiptIdInput] = useState('');
    const [selectedItems, setSelectedItems] = useState({}); // Format: { orderItemId: quantityToReturn }
    const [reason, setReason] = useState('');

    // Clear operational frames whenever page unmounts
    useEffect(() => {
        return () => { dispatch(resetRefundState()); };
    }, [dispatch]);

    const handleSearchOrder = (e) => {
        e.preventDefault();
        if (receiptIdInput.trim()) {
            dispatch(fetchOrderForRefund(receiptIdInput.trim()));
            setSelectedItems({});
        }
    };

    const handleQuantityChange = (itemId, maxQty, value) => {
        const qty = Math.min(maxQty, Math.max(0, parseInt(value) || 0));
        setSelectedItems({ ...selectedItems, [itemId]: qty });
    };

    // Calculate dynamic processing refund values on-the-fly
    const calculateRefundTotal = () => {
        if (!orderToRefund || !orderToRefund.items) return 0;
        return orderToRefund.items.reduce((total, item) => {
            const returnQty = selectedItems[item.id] || 0;
            return total + (item.price * returnQty);
        }, 0);
    };

    const handleProcessReturn = () => {
        const itemsPayload = Object.keys(selectedItems)
            .filter(itemId => selectedItems[itemId] > 0)
            .map(itemId => ({
                orderItemId: parseInt(itemId),
                quantity: selectedItems[itemId]
            }));

        if (itemsPayload.length === 0) {
            alert("Please select at least one item quantity to refund.");
            return;
        }

        if (!reason.trim()) {
            alert("Please provide an official audit reason for this return.");
            return;
        }

        const refundPayload = {
            orderId: orderToRefund.id,
            cashierId: user.id,
            reason: reason,
            refundAmount: calculateRefundTotal(),
            items: itemsPayload
        };

        dispatch(processRefund(refundPayload));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Returns & Adjustments</h1>
                <p className="text-sm text-muted-foreground">Reverse active customer receipts, update localized inventory catalogs, and log refunds.</p>
            </div>

            {/* Receipt Verification Bar */}
            <form onSubmit={handleSearchOrder} className="flex gap-3 bg-card p-4 border border-border rounded-xl shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Enter unique Receipt ID code (e.g., 48201)..."
                        value={receiptIdInput}
                        onChange={(e) => setReceiptIdInput(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Find Receipt'}
                </Button>
            </form>

            {/* Error Message Layout */}
            {error && (
                <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive text-sm rounded-xl border border-destructive/20 font-medium">
                    <AlertTriangle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {/* Success Animation Notification Frame */}
            {success && (
                <div className="flex flex-col items-center justify-center p-8 bg-card border border-border rounded-xl space-y-3 shadow-sm">
                    <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
                    <h3 className="text-lg font-bold">Refund Processed Successfully!</h3>
                    <p className="text-sm text-muted-foreground text-center">Cash register drawers balance limits adjusted and stock levels automatically restocked.</p>
                </div>
            )}

            {/* Active Return Working Layout Area */}
            {orderToRefund && (
                <div className="space-y-6 bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in-50 duration-200">
                    <div className="flex justify-between border-b border-border pb-4">
                        <div>
                            <h3 className="font-bold">Original Order Summary</h3>
                            <p className="text-xs text-muted-foreground">Original Total: ₹{orderToRefund.totalAmount.toFixed(2)} | Method: {orderToRefund.paymentType}</p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground bg-secondary px-2.5 py-1 rounded-md h-fit">ID: #{orderToRefund.id}</span>
                    </div>

                    {/* Return Item Adjustment Table */}
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Details</TableHead>
                                <TableHead className="text-center">Purchased Qty</TableHead>
                                <TableHead className="text-right">Unit Price</TableHead>
                                <TableHead className="text-right w-36">Return Qty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orderToRefund.items?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.productName}</TableCell>
                                    <TableCell className="text-center font-semibold">{item.quantity}</TableCell>
                                    <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                        <input
                                            type="number"
                                            min="0"
                                            max={item.quantity}
                                            value={selectedItems[item.id] || 0}
                                            onChange={(e) => handleQuantityChange(item.id, item.quantity, e.target.value)}
                                            className="w-20 text-right p-1.5 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary text-sm"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Operational Reason & Dynamic Summary Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold">Audit Reason for Refund</label>
                            <textarea
                                placeholder="State reason (e.g., Defective manufacturing line, size mismatch rollback)..."
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows={3}
                                className="w-full p-2.5 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            />
                        </div>

                        <div className="flex flex-col justify-between items-end p-4 bg-secondary/30 rounded-xl border border-border">
                            <div className="text-right">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Refund to Disburse</p>
                                <h1 className="text-3xl font-black text-primary tracking-tight">₹{calculateRefundTotal().toFixed(2)}</h1>
                            </div>
                            <Button
                                className="w-full md:w-auto px-8"
                                disabled={processing || calculateRefundTotal() === 0}
                                onClick={handleProcessReturn}
                            >
                                <RotateCcw size={16} className="mr-2" /> {processing ? 'Reversing...' : 'Execute Cash Release'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}