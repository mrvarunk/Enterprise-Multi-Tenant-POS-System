import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { createProduct, updateProduct } from '../../redux/features/product/productThunk';

export default function ProductModal({ isOpen, onClose, productToEdit = null }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { categories } = useSelector(state => state.category);
    const { actionLoading } = useSelector(state => state.product);

    // Initial form state
    const [formData, setFormData] = useState({
        name: '',
        barcode: '',
        costPrice: '',
        sellingPrice: '',
        stockQuantity: '',
        categoryId: ''
    });

    // If we are editing, populate the form with existing data
    useEffect(() => {
        if (productToEdit) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: productToEdit.name,
                barcode: productToEdit.barcode,
                costPrice: productToEdit.costPrice,
                sellingPrice: productToEdit.sellingPrice,
                stockQuantity: productToEdit.stockQuantity,
                categoryId: productToEdit.category?.id || ''
            });
        } else {
            // Reset form for new product
            setFormData({
                name: '', barcode: '', costPrice: '', sellingPrice: '', stockQuantity: '', categoryId: ''
            });
        }
    }, [productToEdit, isOpen]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format payload to match Spring Boot DTO
        const payload = {
            ...formData,
            storeId: user.storeId, // Link product to current manager's store
            costPrice: parseFloat(formData.costPrice),
            sellingPrice: parseFloat(formData.sellingPrice),
            stockQuantity: parseInt(formData.stockQuantity)
        };

        if (productToEdit) {
            await dispatch(updateProduct({ productId: productToEdit.id, productData: payload }));
        } else {
            await dispatch(createProduct(payload));
        }

        onClose(); // Close modal on success
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{productToEdit ? 'Edit Product Details' : 'Add New Product'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-900">Product Name</label>
                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="e.g. Organic Whole Milk" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Barcode (SKU)</label>
                            <input required name="barcode" value={formData.barcode} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="123456789" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Category</label>
                            <select required name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                                <option value="">Select Category...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Cost Price (₹)</label>
                            <input required type="number" step="0.01" name="costPrice" value={formData.costPrice} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Selling Price (₹)</label>
                            <input required type="number" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Stock Qty</label>
                            <input required type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-zinc-200 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50">Cancel</button>
                        <button type="submit" disabled={actionLoading} className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium shadow-md">
                            {actionLoading ? 'Saving...' : productToEdit ? 'Save Changes' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}