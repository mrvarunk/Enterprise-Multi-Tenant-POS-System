import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingCart, X } from 'lucide-react';
import { fetchProductsByStore } from '../redux/features/product/productThunk';
import { fetchCategoriesByStore } from '../redux/features/category/categoryThunk';
import { selectCartItems } from '../redux/features/cart/cartSlice';
import ProductCard from './terminal/ProductCard';
import CartSection from './cart/CartSection';
import CheckoutModal from './terminal/CheckoutModal';

export default function CreateOrderPage() {
    const dispatch = useDispatch();

    // Selectors
    const { products, loading: productsLoading } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    const { user } = useSelector((state) => state.auth);
    const cartItems = useSelector(selectCartItems);

    // Local UI states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);

    useEffect(() => {
        const storeId = user?.storeId || 1;
        dispatch(fetchProductsByStore(storeId));
        dispatch(fetchCategoriesByStore(storeId));
    }, [dispatch, user]);

    const filteredProducts = products.filter(product => {
        const nameMatch = product.name ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
        const barcodeMatch = product.barcode ? product.barcode.includes(searchQuery) : false;
        const matchesSearch = nameMatch || barcodeMatch;
        const matchesCategory = selectedCategory === 'ALL' || (product.category && String(product.category.id) === String(selectedCategory));

        return matchesSearch && matchesCategory;
    });

    const handleProceedPayment = () => {
        setIsMobileCartOpen(false);
        setIsCheckoutOpen(true);
    };

    const totalUniqueItems = cartItems.length;

    return (
        <div className="flex h-full w-full overflow-hidden">

            {/* LEFT SECTION: Product Catalog (70%) */}
            <div className="flex w-full lg:w-[70%] flex-col overflow-hidden bg-[#FAFAFA]">

                {/* Sticky Header: Search & Categories */}
                <div className="p-4 border-b border-zinc-200 bg-white z-10 sticky top-0 space-y-4 shrink-0 shadow-sm">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search products by name or barcode..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-zinc-200 rounded-lg focus:outline-none focus:border-[#D4A017] text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors"
                        />
                    </div>

                    {/* Scrolling Category Filter Pills */}
                    <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`whitespace-nowrap px-1 py-1 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                                selectedCategory === 'ALL'
                                    ? 'text-[#D4A017] border-[#D4A017]'
                                    : 'text-zinc-500 border-transparent hover:text-zinc-900'
                            }`}
                        >
                            All Items
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`whitespace-nowrap px-1 py-1 text-sm font-medium transition-colors border-b-2 cursor-pointer ${
                                    selectedCategory === category.id
                                        ? 'text-[#D4A017] border-[#D4A017]'
                                        : 'text-zinc-500 border-transparent hover:text-zinc-900'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tight Product Grid */}
                <div className="flex-1 overflow-y-auto p-4 bg-[#FAFAFA]">
                    {productsLoading ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="h-6 w-6 rounded-full border-2 border-[#D4A017] border-t-transparent animate-spin"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col h-full items-center justify-center text-zinc-400">
                            <Search className="h-10 w-10 mb-3 opacity-20" />
                            <p className="text-sm font-medium">No matching products.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SECTION: Fixed Cart Sidebar (30%) */}
            <div className="hidden lg:flex w-[30%] flex-shrink-0 flex-col bg-white border-l border-zinc-200 relative z-20 h-full shadow-sm">
                <CartSection onProceedPayment={handleProceedPayment} />
            </div>

            {/* Floating Mobile Cart Button (Visible only under lg) */}
            {totalUniqueItems > 0 && (
                <button
                    onClick={() => setIsMobileCartOpen(true)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 bg-zinc-900 text-white p-3.5 rounded-full flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <ShoppingCart size={18} />
                    <span className="text-[10px] font-bold bg-white text-zinc-900 rounded-full h-5 w-5 flex items-center justify-center">
                        {totalUniqueItems}
                    </span>
                </button>
            )}

            {/* Mobile Cart Drawer */}
            {isMobileCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm lg:hidden">
                    <div className="absolute inset-0 z-10" onClick={() => setIsMobileCartOpen(false)} />
                    
                    <div className="w-80 h-full bg-white relative flex flex-col border-l border-zinc-200 z-20">
                        <button
                            onClick={() => setIsMobileCartOpen(false)}
                            className="absolute top-3 right-3 z-50 p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full cursor-pointer transition-colors"
                        >
                            <X size={16} />
                        </button>
                        <div className="flex-1 overflow-hidden">
                            <CartSection onProceedPayment={handleProceedPayment} />
                        </div>
                    </div>
                </div>
            )}

            {/* Checkout Modal */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />

        </div>
    );
}