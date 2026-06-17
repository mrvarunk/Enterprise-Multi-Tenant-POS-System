import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, CreditCard, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';
import { createOrder } from '../../redux/features/order/orderThunk';
import {
    clearCart,
    selectTotal,
    selectTax,
    selectDiscountAmount,
    selectCartItems
} from '@/redux/features/cart/cartSlice.js';

export default function CheckoutModal({ isOpen, onClose }) {
    const dispatch = useDispatch();

    // Selectors
    const cartItems = useSelector(selectCartItems);
    const totalAmount = useSelector(selectTotal);
    const taxAmount = useSelector(selectTax);
    const discountAmount = useSelector(selectDiscountAmount);
    const { user } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.order);

    // Local State
    const [paymentMethod, setPaymentMethod] = useState('CASH');
    const [amountTendered, setAmountTendered] = useState(totalAmount.toString());
    const [isSuccess, setIsSuccess] = useState(false);

    // Sync tendered amount when modal opens or total updates
    // Sync tendered amount when modal opens or total updates
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAmountTendered(totalAmount.toString());
    }, [isOpen, totalAmount]);

    // Calculate Change Due
    const tendered = parseFloat(amountTendered) || 0;
    const changeDue = Math.max(0, tendered - totalAmount);
    const isPaymentValid = paymentMethod === 'CASH' ? (tendered >= totalAmount) : true;

    const handleCheckout = async () => {
        if (!isPaymentValid) return;

        const orderData = {
            paymentType: paymentMethod,
            taxAmount: taxAmount,
            discountAmount: discountAmount,
            totalAmount: totalAmount,
            items: cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                price: item.product.sellingPrice
            }))
        };

        try {
            await dispatch(createOrder({
                orderData,
                cashierId: user.id
            })).unwrap();

            setIsSuccess(true);
            setTimeout(() => {
                dispatch(clearCart());
                setIsSuccess(false);
                onClose();
            }, 2500);

        } catch (error) {
            console.error("Transaction Failed:", error);
            alert("Checkout Failed: " + error);
        }
    };

    if (!isOpen) return null;

    if (isSuccess) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="bg-white p-8 rounded-xl border border-zinc-200 flex flex-col items-center space-y-4 shadow-2xl">
                    <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                    <h2 className="text-xl font-bold text-zinc-900">Transaction Logged</h2>
                    <p className="text-sm text-zinc-500 text-center">Registry session records successfully updated.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-xl overflow-hidden border border-zinc-200 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-zinc-100">
                    <h2 className="text-sm font-semibold tracking-tight uppercase text-zinc-900">Settle Balance</h2>
                    <button onClick={onClose} className="p-1.5 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer text-zinc-400 hover:text-zinc-900">
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Grand Total Display */}
                    <div className="flex flex-col items-center justify-center py-4 bg-zinc-50 rounded-lg border border-zinc-200">
                        <p className="text-[10px] tracking-widest uppercase text-zinc-500 mb-1">Total Outstanding</p>
                        <h1 className="text-3xl font-bold text-[#D4A017] tracking-tight tabular-nums">₹{totalAmount.toFixed(2)}</h1>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            onClick={() => setPaymentMethod('CASH')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all cursor-pointer ${paymentMethod === 'CASH' ? 'bg-[#D4A017] text-[#09090B] border-[#D4A017] shadow-sm' : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100/50'}`}
                        >
                            <Banknote className="h-5 w-5 mb-1.5" />
                            <span className="font-semibold text-xs uppercase tracking-wide">Cash</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('CARD')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all cursor-pointer ${paymentMethod === 'CARD' ? 'bg-[#D4A017] text-[#09090B] border-[#D4A017] shadow-sm' : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100/50'}`}
                        >
                            <CreditCard className="h-5 w-5 mb-1.5" />
                            <span className="font-semibold text-xs uppercase tracking-wide">Card</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('UPI')}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all cursor-pointer ${paymentMethod === 'UPI' ? 'bg-[#D4A017] text-[#09090B] border-[#D4A017] shadow-sm' : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-100/50'}`}
                        >
                            <Smartphone className="h-5 w-5 mb-1.5" />
                            <span className="font-semibold text-xs uppercase tracking-wide">UPI</span>
                        </button>
                    </div>

                    {/* Cash Tendered Input (Only show if CASH is selected) */}
                    {paymentMethod === 'CASH' && (
                        <div className="space-y-3 bg-zinc-50 p-3 rounded-lg border border-zinc-200">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-zinc-500 uppercase">Amount Tendered</label>
                                <input
                                    type="number"
                                    value={amountTendered}
                                    onChange={(e) => setAmountTendered(e.target.value)}
                                    className="w-28 text-right p-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:border-[#D4A017] text-sm tabular-nums shadow-sm"
                                />
                            </div>
                            <div className="flex items-center justify-between text-base font-bold border-t border-zinc-200 pt-3">
                                <span className="text-xs uppercase font-semibold text-zinc-500">Change Due:</span>
                                <span className={changeDue > 0 ? "text-emerald-600 tabular-nums" : "text-zinc-400 tabular-nums"}>
                                    ₹{changeDue.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Checkout Action Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={!isPaymentValid || loading}
                        className={`w-full py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
                            isPaymentValid && !loading
                                ? 'bg-[#D4A017] text-[#09090B] hover:bg-[#c29113] shadow-sm cursor-pointer'
                                : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                        }`}
                    >
                        {loading ? 'Processing Transaction...' : 'Settle & Print Receipt'}
                    </button>
                </div>
            </div>
        </div>
    );
}