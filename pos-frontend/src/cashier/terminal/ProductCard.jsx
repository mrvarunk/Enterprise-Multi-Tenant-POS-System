import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice.js';
import { Package } from 'lucide-react';

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
            className={`relative flex flex-col transition-all duration-200 select-none group h-60 overflow-hidden rounded-lg shadow-sm
                ${isOutOfStock
                ? 'opacity-50 cursor-not-allowed bg-zinc-50 border border-zinc-200'
                : 'cursor-pointer hover:border-zinc-300 hover:shadow-md bg-white border border-zinc-200'
            }`}
        >
            <div className="h-[55%] w-full bg-zinc-50 border-b border-zinc-100 overflow-hidden">
                {(product.image || product.imageUrl) ? (
                    <img src={product.image || product.imageUrl} alt={product.name} className="h-full w-full object-cover transition-transform group-hover:scale-102" />
                ) : (
                    <div className="h-full w-full flex items-center justify-center">
                        <Package className="h-8 w-8 text-zinc-300" />
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col flex-1 p-3 justify-between">
                <div>
                    <h3 className="font-semibold text-sm line-clamp-2 leading-tight text-zinc-900">{product.name}</h3>
                    <p className="text-[11px] text-zinc-500 mt-0.5">{product.barcode}</p>
                </div>

                {/* Price and Stock Layout */}
                <div className="flex items-end justify-between mt-2">
                    <span className="font-bold text-base tracking-tight tabular-nums text-zinc-900">₹{(product.sellingPrice || 0).toFixed(2)}</span>
                    <span className={`text-[11px] font-medium ${
                        isOutOfStock
                            ? 'text-red-500'
                            : 'text-zinc-500'
                    }`}>
                        {isOutOfStock ? 'Out of Stock' : `${product.stockQuantity} in stock`}
                    </span>
                </div>
            </div>
        </div>
    );
}