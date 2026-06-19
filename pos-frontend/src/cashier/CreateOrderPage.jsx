import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingCart, X, Sparkles } from 'lucide-react';
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
        <div className="flex h-full w-full overflow-hidden bg-zinc-50/50">

            {/* LEFT SECTION: Product Catalog (72%) */}
            <div className="flex w-full lg:w-[72%] flex-col overflow-hidden relative">
                
                {/* Background decorative blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#D4A017]/10 to-transparent blur-3xl -z-10 pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-zinc-200/50 to-transparent blur-3xl -z-10 pointer-events-none" />

                {/* Sticky Header: Search & Categories */}
                <div className="pt-6 px-6 pb-2 z-10 shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                            Terminal
                            <Sparkles className="h-5 w-5 text-[#D4A017]" />
                        </h1>
                    </div>

                    <div className="relative group max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#D4A017] transition-colors" />
                        <input
                            type="text"
                            placeholder="Scan barcode or search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-zinc-200/60 rounded-xl focus:outline-none focus:ring-4 focus:ring-[#D4A017]/10 focus:border-[#D4A017] text-sm text-zinc-900 placeholder:text-zinc-400 transition-all shadow-sm"
                        />
                    </div>

                    {/* Scrolling Category Filter Pills */}
                    <div className="flex gap-2.5 overflow-x-auto py-4 scrollbar-hide mt-1">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                                selectedCategory === 'ALL'
                                    ? 'bg-zinc-900 text-white shadow-md scale-105'
                                    : 'bg-white text-zinc-500 border border-zinc-200/60 hover:border-zinc-300 hover:text-zinc-900'
                            }`}
                        >
                            All Products
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`whitespace-nowrap px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                                    selectedCategory === category.id
                                        ? 'bg-zinc-900 text-white shadow-md scale-105'
                                        : 'bg-white text-zinc-500 border border-zinc-200/60 hover:border-zinc-300 hover:text-zinc-900'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tight Product Grid */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2 scrollbar-hide">
                    {productsLoading ? (
                        <div className="flex flex-col h-full items-center justify-center space-y-4">
                            <div className="h-8 w-8 rounded-full border-2 border-[#D4A017] border-t-transparent animate-spin"></div>
                            <p className="text-sm text-zinc-500 font-medium animate-pulse">Syncing catalog...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col h-full items-center justify-center text-zinc-400 bg-white/50 backdrop-blur-sm rounded-2xl border border-zinc-200/50 mx-4">
                            <Search className="h-12 w-12 mb-4 opacity-20" />
                            <p className="text-base font-semibold text-zinc-600">No matching products found</p>
                            <p className="text-sm mt-1">Try scanning a different barcode or adjust filters.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SECTION: Fixed Cart Sidebar (28%) */}
            <div className="hidden lg:flex w-[28%] flex-shrink-0 flex-col bg-white border-l border-zinc-200/60 relative z-20 h-full shadow-[rgba(0,0,0,0.02)_0px_0px_20px_0px]">
                <CartSection onProceedPayment={handleProceedPayment} />
            </div>

            {/* Floating Mobile Cart Button (Visible only under lg) */}
            {totalUniqueItems > 0 && (
                <button
                    onClick={() => setIsMobileCartOpen(true)}
                    className="lg:hidden fixed bottom-6 right-6 z-40 bg-zinc-900 text-white p-4 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 group"
                >
                    <ShoppingCart size={20} className="group-hover:-rotate-12 transition-transform" />
                    <span className="absolute -top-2 -right-2 text-[11px] font-bold bg-[#D4A017] text-zinc-900 rounded-full h-6 w-6 flex items-center justify-center shadow-md border-2 border-white">
                        {totalUniqueItems}
                    </span>
                </button>
            )}

            {/* Mobile Cart Drawer */}
            {isMobileCartOpen && (
                <div className="fixed inset-0 z-50 flex justify-end bg-zinc-900/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200">
                    <div className="absolute inset-0 z-10" onClick={() => setIsMobileCartOpen(false)} />
                    
                    <div className="w-[85vw] max-w-sm h-full bg-white relative flex flex-col border-l border-zinc-200 shadow-2xl z-20 animate-in slide-in-from-right duration-300">
                        <button
                            onClick={() => setIsMobileCartOpen(false)}
                            className="absolute top-4 right-4 z-50 p-2 text-zinc-400 hover:text-zinc-900 bg-white/80 backdrop-blur-md rounded-full shadow-sm cursor-pointer transition-all hover:scale-110"
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