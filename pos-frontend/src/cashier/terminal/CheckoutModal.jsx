import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, CreditCard, Banknote, Smartphone, CheckCircle2 } from 'lucide-react';
import { createOrder } from '../../redux/features/order/orderThunk';
import {
    clearCart,
    selectTotal,
    selectTax,
    selectDiscountAmount,
    selectCartItems
} from '../../redux/features/cart/cartSlice';

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

    // Calculate Change Due
    const tendered = parseFloat(amountTendered) || 0;
    const changeDue = Math.max(0, tendered - totalAmount);
    const isPaymentValid = tendered >= totalAmount;

    const handleCheckout = async () => {
        if (!isPaymentValid) return;

        // Format the payload to match your Spring Boot OrderDTO structure
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
            // Dispatch to the Java backend
            await dispatch(createOrder({
                orderData,
                cashierId: user.id
            })).unwrap(); // .unwrap() lets us catch the error locally

            // Show success screen and clear the UI
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
                <div className="bg-card p-10 rounded-2xl flex flex-col items-center space-y-4 animate-in zoom-in-95 duration-300">
                    <CheckCircle2 className="h-20 w-20 text-emerald-500" />
                    <h2 className="text-2xl font-bold">Payment Successful!</h2>
                    <p className="text-muted-foreground">Order has been logged in the system.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-lg bg-card rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border bg-secondary/10">
                    <h2 className="text-xl font-bold tracking-tight">Complete Payment</h2>
                    <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Grand Total Display */}
                    <div className="flex flex-col items-center justify-center py-6 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Amount Due</p>
                        <h1 className="text-5xl font-black text-primary tracking-tighter">
                            ₹{totalAmount.toFixed(2)}
                        </h1>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => setPaymentMethod('CASH')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'CASH' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                        >
                            <Banknote className="h-6 w-6 mb-2" />
                            <span className="font-semibold text-sm">Cash</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('CARD')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'CARD' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                        >
                            <CreditCard className="h-6 w-6 mb-2" />
                            <span className="font-semibold text-sm">Card</span>
                        </button>
                        <button
                            onClick={() => setPaymentMethod('UPI')}
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'UPI' ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:border-primary/50'}`}
                        >
                            <Smartphone className="h-6 w-6 mb-2" />
                            <span className="font-semibold text-sm">UPI</span>
                        </button>
                    </div>

                    {/* Cash Tendered Input (Only show if CASH is selected) */}
                    {paymentMethod === 'CASH' && (
                        <div className="space-y-4 bg-secondary/20 p-4 rounded-xl border border-border">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium">Amount Tendered</label>
                                <input
                                    type="number"
                                    value={amountTendered}
                                    onChange={(e) => setAmountTendered(e.target.value)}
                                    className="w-32 text-right p-2 rounded-md border border-input bg-background focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>
                            <div className="flex items-center justify-between text-lg font-bold">
                                <span>Change Due:</span>
                                <span className={changeDue > 0 ? "text-emerald-500" : "text-muted-foreground"}>
                                    ₹{changeDue.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Checkout Action Button */}
                    <button
                        onClick={handleCheckout}
                        disabled={!isPaymentValid || loading}
                        className={`w-full py-4 rounded-xl text-lg font-bold transition-all shadow-md ${
                            isPaymentValid && !loading
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg'
                                : 'bg-muted text-muted-foreground cursor-not-allowed'
                        }`}
                    >
                        {loading ? 'Processing Transaction...' : 'Confirm & Print Receipt'}
                    </button>
                </div>
            </div>
        </div>
    );
}