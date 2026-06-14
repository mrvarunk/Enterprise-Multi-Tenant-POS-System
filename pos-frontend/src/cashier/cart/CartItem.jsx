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
        <div className="flex items-center justify-between p-3 border-b border-zinc-100 hover:bg-zinc-50 transition-colors select-none">
            {/* Product Meta Info */}
            <div className="flex-1 pr-2">
                <h4 className="text-sm font-semibold line-clamp-1 text-zinc-900">{item.product.name}</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5 tabular-nums">₹{(item.product.sellingPrice || 0).toFixed(2)}</p>
            </div>

            {/* Quantity Controls & Math Layout */}
            <div className="flex items-center gap-3">
                {/* Minimalist Stepper */}
                <div className="flex items-center gap-2">
                    <button type="button" onClick={handleDecrease} className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
                        <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-zinc-900 tabular-nums">{item.quantity}</span>
                    <button type="button" onClick={handleIncrease} className="text-zinc-400 hover:text-zinc-900 transition-colors cursor-pointer">
                        <Plus size={14} />
                    </button>
                </div>

                {/* Line Item Aggregate Cost */}
                <p className="text-sm font-bold tabular-nums w-16 text-right text-zinc-900">₹{((item.product.sellingPrice || 0) * item.quantity).toFixed(2)}</p>

                {/* Trash Trigger */}
                <button type="button" onClick={handleRemove} className="text-zinc-400 hover:text-red-500 transition-colors cursor-pointer ml-1">
                    <Trash2 size={14} />
                </button>
            </div>
        </div>
    );
}