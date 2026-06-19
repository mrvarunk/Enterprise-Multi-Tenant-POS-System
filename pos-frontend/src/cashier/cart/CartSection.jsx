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
        <div className="flex flex-col h-full w-full bg-white select-none relative shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">

            {/* Header Area */}
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-white/80 backdrop-blur-md shrink-0 z-10 sticky top-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#D4A017]/10 rounded-lg">
                        <ShoppingCart size={18} className="text-[#D4A017]" />
                    </div>
                    <h2 className="text-base font-bold tracking-tight text-zinc-900">Current Order</h2>
                </div>
                <span className="bg-[#D4A017] text-zinc-900 font-bold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-md tabular-nums shadow-sm">
                    {totalUniqueItems} {totalUniqueItems === 1 ? 'Item' : 'Items'}
                </span>
            </div>

            {/* Scrollable Cart List Area */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-hide bg-zinc-50/30">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-400 space-y-4">
                        <div className="p-6 bg-zinc-100/50 rounded-full shadow-inner">
                            <ShoppingCart size={28} className="text-zinc-300" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-1.5 p-2">
                        {cartItems.map((item) => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Aggregation Footer Panel */}
            {cartItems.length > 0 && (
                <div className="bg-white flex flex-col border-t border-zinc-100 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] z-20">
                    <div className="px-5 pt-2">
                        <CartSummary />
                    </div>

                    <div className="grid grid-cols-2 gap-3 px-5 pb-5 mt-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-zinc-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                            onClick={() => dispatch(clearCart())}
                        >
                            <Trash2 size={14} className="mr-2" /> Void
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-zinc-600 hover:text-[#D4A017] hover:border-[#D4A017]/30 hover:bg-[#D4A017]/5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                            onClick={() => dispatch(holdOrder())}
                        >
                            <Hand size={14} className="mr-2" /> Hold
                        </Button>
                    </div>

                    {/* Primary Gateway Trigger (Edge-to-Edge) */}
                    <button
                        className="w-full py-5 bg-zinc-900 text-white font-black text-sm uppercase tracking-[0.2em] transition-all hover:bg-zinc-800 flex items-center justify-center gap-3 cursor-pointer shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] group"
                        onClick={onProceedPayment}
                    >
                        <CreditCard size={18} className="text-[#D4A017] group-hover:scale-110 transition-transform" />
                        Pay Now
                    </button>
                </div>
            )}
        </div>
    );
}