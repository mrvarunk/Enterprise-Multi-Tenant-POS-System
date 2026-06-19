import { Minus, Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '@/redux/features/cart/cartSlice.js';

export default function CartItem({ item }) {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(updateCartItemQuantity({
            productId: item.product.id,
            quantity: item.quantity + 1
        }));
    };

    const handleDecrease = () => {
        dispatch(updateCartItemQuantity({
            productId: item.product.id,
            quantity: item.quantity - 1
        }));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.product.id));
    };

    return (
        <div className="flex items-center justify-between p-3.5 mb-1 bg-white border border-zinc-100 hover:border-zinc-200 shadow-sm rounded-xl hover:shadow-md transition-all select-none group">
            {/* Product Meta Info */}
            <div className="flex-1 pr-3">
                <h4 className="text-[13px] font-bold line-clamp-2 leading-snug text-zinc-800 group-hover:text-zinc-950 transition-colors">{item.product.name}</h4>
                <p className="text-[11px] font-bold text-zinc-400 mt-1 tabular-nums tracking-wide">₹{(item.product.sellingPrice || 0).toFixed(2)}</p>
            </div>

            {/* Quantity Controls & Math Layout */}
            <div className="flex items-center gap-4">
                {/* Minimalist Stepper */}
                <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200/60 rounded-lg p-0.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
                    <button type="button" onClick={handleDecrease} className="text-zinc-400 hover:text-zinc-900 bg-white shadow-sm rounded-md p-1 transition-all cursor-pointer hover:scale-105 active:scale-95">
                        <Minus size={14} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center text-xs font-black text-zinc-900 tabular-nums">{item.quantity}</span>
                    <button type="button" onClick={handleIncrease} className="text-zinc-400 hover:text-zinc-900 bg-white shadow-sm rounded-md p-1 transition-all cursor-pointer hover:scale-105 active:scale-95">
                        <Plus size={14} strokeWidth={3} />
                    </button>
                </div>

                {/* Line Item Aggregate Cost */}
                <div className="flex flex-col items-end">
                    <p className="text-[15px] font-black tabular-nums text-right text-zinc-900">
                        ₹{((item.product.sellingPrice || 0) * item.quantity).toFixed(2)}
                    </p>
                </div>

                {/* Trash Trigger */}
                <button type="button" onClick={handleRemove} className="text-zinc-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all cursor-pointer ml-1 opacity-50 group-hover:opacity-100 scale-95 group-hover:scale-100">
                    <Trash2 size={16} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}