import React from 'react';
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
        <div className="flex items-center justify-between p-3 border-b border-border hover:bg-secondary/20 transition-colors select-none">
            {/* Product Meta Info */}
            <div className="flex-1 pr-2">
                <h4 className="text-sm font-semibold line-clamp-1 text-foreground">
                    {item.product.name}
                </h4>
                <p className="text-xs text-muted-foreground">
                    ₹{item.product.sellingPrice.toFixed(2)}
                </p>
            </div>

            {/* Quantity Controls & Math Layout */}
            <div className="flex items-center gap-3">
                {/* Stepper Buttons */}
                <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden shadow-sm">
                    <button
                        type="button"
                        onClick={handleDecrease}
                        className="p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                    </span>
                    <button
                        type="button"
                        onClick={handleIncrease}
                        className="p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* Line Item Aggregate Cost */}
                <p className="text-sm font-bold w-20 text-right text-foreground">
                    ₹{(item.product.sellingPrice * item.quantity).toFixed(2)}
                </p>

                {/* Hard Drop Clear Trigger */}
                <button
                    type="button"
                    onClick={handleRemove}
                    className="text-muted-foreground hover:text-destructive p-1.5 rounded-md hover:bg-destructive/5 transition-colors cursor-pointer"
                >
                    <Trash2 size={15} />
                </button>
            </div>
        </div>
    );
}