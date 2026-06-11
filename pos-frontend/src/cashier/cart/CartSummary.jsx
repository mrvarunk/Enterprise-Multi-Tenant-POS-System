import React from 'react';
import { useSelector } from 'react-redux';
import {
    selectSubtotal,
    selectTax,
    selectDiscountAmount,
    selectTotal
} from '@/redux/features/cart/cartSlice.js';

export default function CartSummary() {
    const subtotal = useSelector(selectSubtotal);
    const tax = useSelector(selectTax);
    const discountAmount = useSelector(selectDiscountAmount);
    const total = useSelector(selectTotal);

    return (
        <div className="space-y-2.5 p-4 bg-secondary/30 rounded-xl border border-border/40">
            {/* Subtotal Segment */}
            <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Operational Tax Segment */}
            <div className="flex justify-between text-xs font-medium">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">₹{tax.toFixed(2)}</span>
            </div>

            {/* Conditional Discount Line Item */}
            {discountAmount > 0 && (
                <div className="flex justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 px-2 py-1 rounded-md">
                    <span>Applied Discount</span>
                    <span>- ₹{discountAmount.toFixed(2)}</span>
                </div>
            )}

            {/* Final Grand Total Settlement Block */}
            <div className="flex justify-between items-center text-base font-black border-t border-border pt-3 mt-1 text-foreground">
                <span>Total Due</span>
                <span className="text-lg tracking-tight text-primary">
                    ₹{total.toFixed(2)}
                </span>
            </div>
        </div>
    );
}