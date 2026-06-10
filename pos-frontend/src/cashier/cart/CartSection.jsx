import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Hand, Trash2, CreditCard } from 'lucide-react';
import { selectCartItems, clearCart, holdOrder } from '../../redux/features/cart/cartSlice';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Button } from '../../components/ui/button.jsx';

export default function CartSection({ onProceedPayment }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    // Calculates total unique item varieties in the queue
    const totalUniqueItems = cartItems.length;

    return (
        <div className="flex flex-col h-full w-full bg-card shadow-sm">

            {/* 1. Header State Display Bar */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/10">
                <div className="flex items-center gap-2">
                    <ShoppingCart size={20} className="text-primary" />
                    <h2 className="text-base font-bold tracking-tight">Current Order</h2>
                </div>
                <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">
                    {totalUniqueItems} {totalUniqueItems === 1 ? 'Item' : 'Items'}
                </span>
            </div>

            {/* 2. Scrollable Checkout Cart List Area */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-3">
                        <div className="p-4 bg-secondary/40 rounded-full">
                            <ShoppingCart size={32} className="opacity-40" />
                        </div>
                        <p className="text-sm font-medium">Checkout basket is empty</p>
                    </div>
                ) : (
                    <div className="space-y-0.5">
                        {cartItems.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Aggregation & Action Control Panel Footer */}
            {cartItems.length > 0 && (
                <div className="p-4 border-t border-border bg-card space-y-4 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.05)]">

                    {/* Real-time Math Breakdown Injector */}
                    <CartSummary />

                    {/* Secondary Transaction Queuing Toggles */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive border-border"
                            onClick={() => dispatch(clearCart())}
                        >
                            <Trash2 size={15} className="mr-2" /> Clear Cart
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-border"
                            onClick={() => dispatch(holdOrder())}
                        >
                            <Hand size={15} className="mr-2" /> Hold Bill
                        </Button>
                    </div>

                    {/* Primary Gateway Trigger */}
                    <Button
                        size="lg"
                        className="w-full text-sm font-bold tracking-wide shadow-sm hover:shadow transition-all"
                        onClick={onProceedPayment}
                    >
                        <CreditCard size={18} className="mr-2" /> Proceed to Payment
                    </Button>
                </div>
            )}
        </div>
    );
}