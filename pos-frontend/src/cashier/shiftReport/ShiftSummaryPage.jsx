import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Clock, Banknote, CreditCard, Smartphone, Calculator, CheckCircle2 } from 'lucide-react';
import { getLiveShift, endShift } from '../../redux/features/shift/shiftThunk';
import { Button } from '../../components/ui/button';

export default function ShiftSummaryPage() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { currentShift, isActive, loading } = useSelector((state) => state.shift);

    // Fetch the live shift data whenever this page is opened
    useEffect(() => {
        if (user?.id) {
            dispatch(getLiveShift(user.id));
        }
    }, [dispatch, user]);

    const handleEndShift = () => {
        if (window.confirm("Are you sure you want to close your register and end your shift? You cannot undo this.")) {
            dispatch(endShift(currentShift.id));
        }
    };

    if (loading && !currentShift) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!currentShift) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-muted-foreground space-y-4">
                <Clock className="h-16 w-16 opacity-20" />
                <h2 className="text-xl font-semibold text-foreground">No Active Shift Found</h2>
                <p>Please contact your store manager if you believe this is an error.</p>
            </div>
        );
    }

    // Helper to calculate expected cash in drawer (assuming start drawer was 0 for simplicity)
    const expectedCash = currentShift.totalCashSales - (currentShift.totalRefunds || 0);

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Shift Summary</h1>
                    <p className="text-sm text-muted-foreground">
                        Started at: {new Date(currentShift.startTime).toLocaleString()}
                    </p>
                </div>
                <div>
                    {!isActive ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 rounded-lg font-bold">
                            <CheckCircle2 className="h-5 w-5" />
                            Shift Closed
                        </div>
                    ) : (
                        <Button
                            variant="destructive"
                            size="lg"
                            onClick={handleEndShift}
                            disabled={loading}
                        >
                            <Clock className="mr-2 h-5 w-5" />
                            Close Register & End Shift
                        </Button>
                    )}
                </div>
            </div>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-card border border-border rounded-xl shadow-sm flex flex-col justify-between">
                    <p className="text-sm font-medium text-muted-foreground mb-4">Total Shift Revenue</p>
                    <h2 className="text-4xl font-black text-primary">₹{currentShift.totalSalesAmount.toFixed(2)}</h2>
                    <p className="text-xs text-muted-foreground mt-2">{currentShift.totalOrders} Transactions Processed</p>
                </div>

                <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-bold text-primary">Expected Cash in Drawer</p>
                        <Calculator className="h-5 w-5 text-primary opacity-50" />
                    </div>
                    <h2 className="text-4xl font-black text-primary">₹{expectedCash.toFixed(2)}</h2>
                    <p className="text-xs text-primary/70 mt-2">Physical cash must match this exact amount</p>
                </div>
            </div>

            {/* Payment Breakdown Grid */}
            <h3 className="text-lg font-bold mt-8 mb-4">Tender Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="p-4 bg-card border border-border rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                        <Banknote className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Cash Sales</p>
                        <p className="text-xl font-bold">₹{currentShift.totalCashSales.toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-4 bg-card border border-border rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                        <CreditCard className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Card Sales</p>
                        <p className="text-xl font-bold">₹{currentShift.totalCardSales.toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-4 bg-card border border-border rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-secondary rounded-lg">
                        <Smartphone className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">UPI Sales</p>
                        <p className="text-xl font-bold">₹{currentShift.totalUpiSales.toFixed(2)}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}