import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { fetchProductsByStore } from '../redux/features/product/productThunk';
import { fetchCategoriesByStore } from '../redux/features/category/categoryThunk';
import ProductCard from './terminal/ProductCard';
import CartSection from './cart/CartSection';
import CheckoutModal from './terminal/CheckoutModal';

export default function CreateOrderPage() {
    const dispatch = useDispatch();

    // Selectors to extract active slices from globalState
    const { products, loading: productsLoading } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    const { user } = useSelector((state) => state.auth);

    // Local UI control states
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Dynamic initial loading hook anchored to cashier contextual profile metadata
    useEffect(() => {
        if (user?.storeId) {
            dispatch(fetchProductsByStore(user.storeId));
            dispatch(fetchCategoriesByStore(user.storeId));
        }
    }, [dispatch, user]);

    // Client-side computation filtering item records matching user selections
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.barcode.includes(searchQuery);
        const matchesCategory = selectedCategory === 'ALL' || (product.category && product.category.id === selectedCategory);

        return matchesSearch && matchesCategory;
    });

    // Callback trigger handler passed into the child Cart Section component
    const handleProceedPayment = () => {
        setIsCheckoutOpen(true);
    };

    return (
        <div className="flex h-full w-full gap-4 overflow-hidden">

            {/* LEFT SECTION: Product Catalog Selection Space */}
            <div className="flex flex-1 flex-col overflow-hidden bg-card rounded-xl border border-border shadow-sm">

                {/* Real-time Filter Controls Header Layout */}
                <div className="p-4 border-b border-border space-y-4 bg-secondary/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products by name or barcode..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm placeholder:text-muted-foreground"
                        />
                    </div>

                    {/* Horizontal Scrolling Category Filter Pills */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                selectedCategory === 'ALL'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                        >
                            All Items
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-primary text-primary-foreground shadow-sm'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Framework Scroll Box Content Panel */}
                <div className="flex-1 overflow-y-auto p-4">
                    {productsLoading ? (
                        <div className="flex h-full items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col h-full items-center justify-center text-muted-foreground">
                            <Search className="h-12 w-12 mb-4 opacity-20" />
                            <p className="text-sm font-medium">No matching products found in stock.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-20">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SECTION: Cart Engine Dock Container */}
            <div className="hidden lg:block w-96 flex-shrink-0 rounded-xl overflow-hidden border border-border">
                <CartSection onProceedPayment={handleProceedPayment} />
            </div>

            {/* OVERLAY SECTION: Declarative Transaction Modal */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
            />

        </div>
    );
}