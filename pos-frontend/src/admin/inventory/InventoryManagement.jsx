import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { fetchProductsByStore, deleteProduct } from '../../redux/features/product/productThunk';
import { fetchCategoriesByStore } from '../../redux/features/category/categoryThunk';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
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
         if (user?.storeId) {
             dispatch(fetchProductsByStore(user.storeId));
             dispatch(fetchCategoriesByStore(user.storeId));
         }
     }, [dispatch, user]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.barcode.includes(searchQuery);
        const matchesCategory = selectedCategory === 'ALL' || (product.category && product.category.id === selectedCategory);
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Stock Control</h1>
                    <p className="text-sm text-muted-foreground">Manage inventory levels, pricing, and new product lines.</p>
                </div>
                <Button onClick={handleAddNew} className="shadow-md">
                    <Plus className="mr-2 h-4 w-4" /> Add New Product
                </Button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by product name or barcode..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full sm:w-48 p-2 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    <option value="ALL">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Inventory Table */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>SKU / Barcode</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Cost (₹)</TableHead>
                            <TableHead className="text-right">Price (₹)</TableHead>
                            <TableHead className="text-center">Stock</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={7} className="text-center py-10">Loading inventory...</TableCell></TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow><TableCell colSpan={7} className="text-center py-10 text-muted-foreground">No products found.</TableCell></TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">{product.barcode}</TableCell>
                                    <TableCell><span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md">{product.category?.name || 'Uncategorized'}</span></TableCell>
                                    <TableCell className="text-right">₹{product.costPrice.toFixed(2)}</TableCell>
                                    <TableCell className="text-right font-semibold">₹{product.sellingPrice.toFixed(2)}</TableCell>
                                    <TableCell className="text-center">
                                        <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${product.stockQuantity <= 10 ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-600'}`}>
                                            {product.stockQuantity <= 10 && <AlertTriangle size={12} />}
                                            {product.stockQuantity}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(product.id, product.name)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Mount the Modal here */}
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productToEdit={productToEdit}
            />
        </div>
    );
}