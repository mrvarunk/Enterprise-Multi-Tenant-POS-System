import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice.js';
import { Package, Plus } from 'lucide-react';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (product.stockQuantity > 0) {
            dispatch(addToCart(product));
        }
    };

    const isOutOfStock = product.stockQuantity <= 0;

    return (
        <div
            onClick={handleAddToCart}
            className={`relative flex flex-col transition-all duration-300 select-none group h-64 overflow-hidden rounded-2xl shadow-sm
                ${isOutOfStock
                ? 'opacity-60 cursor-not-allowed bg-zinc-50 border border-zinc-200/50 grayscale-[0.5]'
                : 'cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.1)] bg-white border border-zinc-200/60'
            }`}
        >
            <div className="h-[55%] w-full bg-zinc-50 border-b border-zinc-100/50 overflow-hidden relative">
                {(product.image || product.imageUrl) ? (
                    <img src={product.image || product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                ) : (
                    <div className="h-full w-full flex items-center justify-center bg-zinc-100/50">
                        <Package className="h-10 w-10 text-zinc-300 drop-shadow-sm" />
                    </div>
                )}
                
                {/* Floating Add Icon overlay */}
                {!isOutOfStock && (
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            <Plus className="h-5 w-5 text-zinc-900" />
                        </div>
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-1 p-4 justify-between bg-white z-10 relative">
                <div>
                    <h3 className="font-bold text-sm line-clamp-2 leading-snug text-zinc-900">{product.name}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-1.5 font-medium">{product.barcode}</p>
                </div>

                {/* Price and Stock Layout */}
                <div className="flex items-end justify-between mt-3 pt-3 border-t border-zinc-100">
                    <span className="font-extrabold text-[17px] tracking-tight tabular-nums text-zinc-900">
                        ₹{(product.sellingPrice || 0).toFixed(2)}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${
                        isOutOfStock
                            ? 'text-red-600 bg-red-50 border border-red-100'
                            : 'text-emerald-700 bg-emerald-50 border border-emerald-100'
                    }`}>
                        {isOutOfStock ? 'Sold Out' : `${product.stockQuantity} Left`}
                    </span>
                </div>
            </div>
        </div>
    );
}