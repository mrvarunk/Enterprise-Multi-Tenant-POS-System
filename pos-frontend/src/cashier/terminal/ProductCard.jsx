import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice.js';
import { Package } from 'lucide-react';

export default function ProductCard({ product }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Prevent adding out-of-stock items
        if (product.stockQuantity > 0) {
            dispatch(addToCart(product));
        }
    };

    const isOutOfStock = product.stockQuantity <= 0;

    return (
        <div
            onClick={handleAddToCart}
            className={`relative flex flex-col p-4 border rounded-xl transition-all select-none
                ${isOutOfStock
                ? 'opacity-50 cursor-not-allowed bg-secondary/20 border-border'
                : 'cursor-pointer hover:border-primary hover:shadow-md bg-card border-border'
            }`}
        >
            {/* Product Image Placeholder */}
            <div className="flex h-24 w-full items-center justify-center rounded-lg bg-secondary/50 mb-3">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover rounded-lg" />
                ) : (
                    <Package className="h-10 w-10 text-muted-foreground opacity-50" />
                )}
            </div>

            {/* Product Details */}
            <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{product.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{product.barcode}</p>
            </div>

            {/* Price and Stock Layout */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <span className="font-bold text-base tracking-tight">₹{product.sellingPrice.toFixed(2)}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                    isOutOfStock
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                }`}>
                    {isOutOfStock ? 'Out of Stock' : `${product.stockQuantity} in stock`}
                </span>
            </div>
        </div>
    );
}