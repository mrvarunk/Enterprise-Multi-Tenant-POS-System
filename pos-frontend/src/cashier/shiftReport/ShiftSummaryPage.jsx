import { useEffect } from 'react';
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
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-zinc-200 border-t-zinc-900"></div>
            </div>
        );
    }

    if (!currentShift) {
        return (
            <div className="flex flex-col h-full items-center justify-center text-zinc-500 space-y-4">
                <Clock className="h-16 w-16 text-zinc-200" />
                <h2 className="text-xl font-semibold text-zinc-900">No Active Shift Found</h2>
                <p className="text-zinc-500">Please contact your store manager if you believe this is an error.</p>
            </div>
        );
    }

    // Calculate payment type breakdowns from paymentSummaries DTO mapping
    const paymentSummaries = currentShift.paymentSummaries || [];
    const cashSummary = paymentSummaries.find(p => p.paymentType === 'CASH') || { totalAmount: 0 };
    const cardSummary = paymentSummaries.find(p => p.paymentType === 'CARD') || { totalAmount: 0 };
    const upiSummary = paymentSummaries.find(p => p.paymentType === 'UPI') || { totalAmount: 0 };

    const cashSales = cashSummary.totalAmount || 0;
    const cardSales = cardSummary.totalAmount || 0;
    const upiSales = upiSummary.totalAmount || 0;
    const totalSales = currentShift.totalSales || 0;

    const expectedCash = cashSales - (currentShift.totalRefunds || 0);
    const startTimeStr = currentShift.shiftStartTime || currentShift.startTime;

    return (
        <div className="max-w-4xl mx-auto space-y-6 text-zinc-900">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Shift Summary</h1>
                    <p className="text-sm text-zinc-500">Started at: {startTimeStr ? new Date(startTimeStr).toLocaleString() : 'N/A'}</p>
                </div>
                <div>
                    {!isActive ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-medium">
                            <CheckCircle2 className="h-5 w-5" />
                            Shift Closed
                        </div>
                    ) : (
                        <Button variant="destructive" size="lg" onClick={handleEndShift} disabled={loading}>
                            <Clock className="mr-2 h-5 w-5" />
                            Close Register & End Shift
                        </Button>
                    )}
                </div>
            </div>

            {/* Top Level Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white border border-zinc-100 rounded-xl shadow-sm flex flex-col justify-between">
                    <p className="text-sm font-medium text-zinc-500 mb-4">Total Shift Revenue</p>
                    <h2 className="text-3xl font-semibold text-zinc-900 tabular-nums">₹{totalSales.toFixed(2)}</h2>
                    <p className="text-xs text-zinc-500 mt-2">{currentShift.totalOrders} Transactions Processed</p>
                </div>

                <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-xl shadow-sm flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm font-medium text-zinc-700">Expected Cash in Drawer</p>
                        <Calculator className="h-5 w-5 text-zinc-500" />
                    </div>
                    <h2 className="text-3xl font-semibold text-zinc-900 tabular-nums">₹{expectedCash.toFixed(2)}</h2>
                    <p className="text-xs text-zinc-500 mt-2">Physical cash must match this exact amount</p>
                </div>
            </div>

            {/* Payment Breakdown Grid */}
            <h3 className="text-lg font-semibold mt-8 mb-4 text-zinc-900">Tender Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="p-4 bg-white border border-zinc-100 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-zinc-50 rounded-lg">
                        <Banknote className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Cash Sales</p>
                        <p className="text-xl font-semibold tabular-nums">₹{cashSales.toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-4 bg-white border border-zinc-100 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-zinc-50 rounded-lg">
                        <CreditCard className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">Card Sales</p>
                        <p className="text-xl font-semibold tabular-nums">₹{cardSales.toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-4 bg-white border border-zinc-100 rounded-xl flex items-center gap-4">
                    <div className="p-3 bg-zinc-50 rounded-lg">
                        <Smartphone className="h-6 w-6 text-zinc-600" />
                    </div>
                    <div>
                        <p className="text-sm text-zinc-500">UPI Sales</p>
                        <p className="text-xl font-semibold tabular-nums">₹{upiSales.toFixed(2)}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}