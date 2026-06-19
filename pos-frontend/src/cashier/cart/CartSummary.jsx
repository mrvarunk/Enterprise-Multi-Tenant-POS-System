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
        <div className="space-y-2.5 py-3">
            {/* Subtotal Segment */}
            <div className="flex justify-between text-[13px] font-bold text-zinc-500">
                <span>Subtotal</span>
                <span className="text-zinc-700 tabular-nums">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Operational Tax Segment */}
            <div className="flex justify-between text-[13px] font-bold text-zinc-500">
                <span>GST (18%)</span>
                <span className="text-zinc-700 tabular-nums">₹{tax.toFixed(2)}</span>
            </div>

            {/* Conditional Discount Line Item */}
            {discountAmount > 0 && (
                <div className="flex justify-between text-[13px] font-black text-emerald-600 bg-emerald-50/50 -mx-5 px-5 py-2 border-y border-emerald-100/50">
                    <span>Applied Discount</span>
                    <span className="tabular-nums">- ₹{discountAmount.toFixed(2)}</span>
                </div>
            )}

            {/* Final Grand Total Settlement Block */}
            <div className="flex justify-between items-center text-base font-semibold border-t-2 border-dashed border-zinc-200 pt-3 mt-2">
                <span className="text-zinc-800 font-black uppercase tracking-widest text-xs">Total Due</span>
                <span className="text-2xl font-black tracking-tighter text-[#D4A017] tabular-nums drop-shadow-sm">
                    ₹{total.toFixed(2)}
                </span>
            </div>
        </div>
    );
}