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
        <div className="space-y-3 py-4">
            {/* Subtotal Segment */}
            <div className="flex justify-between text-sm font-medium">
                <span className="text-zinc-500">Subtotal</span>
                <span className="text-zinc-900 tabular-nums">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Operational Tax Segment */}
            <div className="flex justify-between text-sm font-medium">
                <span className="text-zinc-500">GST (18%)</span>
                <span className="text-zinc-900 tabular-nums">₹{tax.toFixed(2)}</span>
            </div>

            {/* Conditional Discount Line Item */}
            {discountAmount > 0 && (
                <div className="flex justify-between text-sm font-medium text-emerald-600">
                    <span>Applied Discount</span>
                    <span className="tabular-nums">- ₹{discountAmount.toFixed(2)}</span>
                </div>
            )}

            {/* Final Grand Total Settlement Block */}
            <div className="flex justify-between items-center text-base font-semibold border-t border-zinc-200 pt-3 mt-1 text-zinc-900">
                <span>Total Due</span>
                <span className="text-xl font-bold tracking-tight text-[#D4A017] tabular-nums">
                    ₹{total.toFixed(2)}
                </span>
            </div>
        </div>
    );
}