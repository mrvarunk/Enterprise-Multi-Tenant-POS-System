import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { fetchProductsByStore, deleteProduct } from '../../redux/features/product/productThunk';
import { fetchCategoriesByStore } from '../../redux/features/category/categoryThunk';
import ProductModal from './ProductModal';

export default function InventoryManagement() {
    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.product);
    const { categories } = useSelector((state) => state.category);
    const { user } = useSelector((state) => state.auth);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // Modal Control State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);

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

    const handleEdit = (product) => {
        setProductToEdit(product);
        setIsModalOpen(true);
    };

    const handleAddNew = () => {
        setProductToEdit(null);
        setIsModalOpen(true);
    };

    const handleDelete = (productId, productName) => {
        if (window.confirm(`Are you absolutely sure you want to delete ${productName}? This cannot be undone.`)) {
            dispatch(deleteProduct(productId));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-2xl font-semibold text-zinc-900">Stock Ledger</h1>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">Catalog & Inventory Management</p>
                </div>
                <div>
                    <button onClick={handleAddNew} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium shadow-md transition-all">
                        <Plus size={14} /> Add Product
                    </button>
                </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="Search stock by name or barcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-5 py-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full md:w-52 px-4 py-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900 cursor-pointer"
                >
                    <option value="ALL">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Inventory Table */}
            <div className="w-full bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3">Product Name</th>
                                <th className="px-5 py-3">SKU / Barcode</th>
                                <th className="px-5 py-3">Category</th>
                                <th className="px-5 py-3 text-right">Cost (₹)</th>
                                <th className="px-5 py-3 text-right">Price (₹)</th>
                                <th className="px-5 py-3 text-center">Stock</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-sm text-zinc-500">Loading inventory catalog...</td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-sm text-zinc-500">No products matched the active filters.</td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-5 py-4 text-zinc-900">{product.name}</td>
                                        <td className="px-5 py-4 font-mono text-xs text-zinc-500 tabular-nums">{product.barcode}</td>
                                        <td className="px-5 py-4 text-sm text-zinc-700">
                                            <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wider font-medium bg-zinc-50 border border-zinc-100 rounded-md text-zinc-500">
                                                {product.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right font-mono text-xs text-zinc-500 tabular-nums">₹{(product.costPrice || 0).toFixed(2)}</td>
                                        <td className="px-5 py-4 text-right font-mono text-xs text-zinc-900 tabular-nums">₹{(product.sellingPrice || 0).toFixed(2)}</td>
                                        <td className="px-5 py-4 text-center">
                                            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-50 border border-zinc-100">
                                                <span className={`h-2 w-2 rounded-full ${product.stockQuantity <= 10 ? 'bg-red-600' : 'bg-emerald-600'}`} />
                                                <span className="font-mono text-xs text-zinc-700 tabular-nums">{product.stockQuantity}</span>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <div className="flex justify-end gap-3">
                                                <button onClick={() => handleEdit(product)} className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors">
                                                    <Edit size={14} />
                                                </button>
                                                <button onClick={() => handleDelete(product.id, product.name)} className="p-1.5 text-zinc-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mount the Modal here */}
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} productToEdit={productToEdit} />
        </div>
    );
}