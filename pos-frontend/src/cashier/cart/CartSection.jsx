import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, Hand, Trash2, CreditCard } from 'lucide-react';
import { selectCartItems, clearCart, holdOrder } from '../../redux/features/cart/cartSlice';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { Button } from '../../components/ui/button.jsx';

export default function CartSection({ onProceedPayment }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const totalUniqueItems = cartItems.length;

    return (
        <div className="flex flex-col h-full w-full bg-white select-none">

            {/* Header Area */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 shrink-0">
                <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-[#D4A017]" />
                    <h2 className="text-sm font-semibold tracking-tight text-zinc-900">Current Order</h2>
                </div>
                <span className="bg-[#D4A017]/10 text-[#D4A017] text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border border-[#D4A017]/20 tabular-nums">
                    {totalUniqueItems} {totalUniqueItems === 1 ? 'Variety' : 'Varieties'}
                </span>
            </div>

            {/* Scrollable Cart List Area */}
            <div className="flex-1 overflow-y-auto p-0">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-3">
                        <div className="p-4 bg-zinc-50 rounded-full">
                            <ShoppingCart size={24} className="opacity-30" />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-wider">Cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-0">
                        {cartItems.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Aggregation Footer Panel */}
            {cartItems.length > 0 && (
                <div className="bg-white flex flex-col border-t border-zinc-200">
                    <div className="px-4">
                        <CartSummary />
                    </div>

                    <div className="grid grid-cols-2 gap-3 px-4 pb-4">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-zinc-500 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-50 rounded-md text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
                            onClick={() => dispatch(clearCart())}
                        >
                            <Trash2 size={13} className="mr-1.5" /> Void
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-zinc-500 hover:text-zinc-900 border-zinc-200 hover:bg-zinc-50 rounded-md text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
                            onClick={() => dispatch(holdOrder())}
                        >
                            <Hand size={13} className="mr-1.5" /> Hold
                        </Button>
                    </div>

                    {/* Primary Gateway Trigger (Edge-to-Edge) */}
                    <button
                        className="w-full py-5 bg-[#D4A017] text-[#09090B] font-bold text-base uppercase tracking-wider transition-colors hover:bg-[#c29113] flex items-center justify-center gap-2 cursor-pointer shadow-inner"
                        onClick={onProceedPayment}
                    >
                        <CreditCard size={18} />
                        Pay Now
                    </button>
                </div>
            )}
        </div>
    );
}