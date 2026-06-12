import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Receipt } from 'lucide-react';

export default function OrderDetailsModal({ order, isOpen, onClose }) {
    if (!order) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 text-primary rounded-full">
                            <Receipt className="h-5 w-5" />
                        </div>
                        <div>
                            <DialogTitle>Receipt #{order.id}</DialogTitle>
                            <DialogDescription>
                                Processed on {new Date(order.createdAt).toLocaleString()}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-4 space-y-6">
                    {/* Financial Summary Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-secondary/30 rounded-xl border border-border">
                            <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                            <p className="font-bold">{order.paymentType}</p>
                        </div>
                        <div className="p-4 bg-secondary/30 rounded-xl border border-border">
                            <p className="text-sm text-muted-foreground mb-1">Cashier ID</p>
                            <p className="font-bold">{order.cashierId}</p>
                        </div>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                            <p className="text-sm text-primary font-medium mb-1">Total Paid</p>
                            <p className="font-bold text-xl text-primary">₹{order.totalAmount.toFixed(2)}</p>
                        </div>
                    </div>

                    {/* Line Items Table */}
                    <div>
                        <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Purchased Items</h3>
                        <div className="border border-border rounded-xl overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Item Name</TableHead>
                                        <TableHead className="text-center">Qty</TableHead>
                                        <TableHead className="text-right">Unit Price</TableHead>
                                        <TableHead className="text-right">Line Total</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.items?.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.productName}</TableCell>
                                            <TableCell className="text-center">{item.quantity}</TableCell>
                                            <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                                            <TableCell className="text-right font-semibold">
                                                ₹{(item.price * item.quantity).toFixed(2)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    {/* Print Button Placeholder */}
                    <div className="flex justify-end pt-4 border-t border-border">
                        <button
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            onClick={() => window.print()}
                        >
                            Print Copy
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}