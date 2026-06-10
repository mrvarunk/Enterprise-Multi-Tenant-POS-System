import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
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
                        <label className="text-sm font-medium">Product Name</label>
                        <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="e.g. Organic Whole Milk" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Barcode (SKU)</label>
                            <input required name="barcode" value={formData.barcode} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="123456789" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Category</label>
                            <select required name="categoryId" value={formData.categoryId} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm">
                                <option value="">Select Category...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Cost Price (₹)</label>
                            <input required type="number" step="0.01" name="costPrice" value={formData.costPrice} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Selling Price (₹)</label>
                            <input required type="number" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium">Stock Qty</label>
                            <input required type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-border mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={actionLoading}>
                            {actionLoading ? 'Saving...' : productToEdit ? 'Save Changes' : 'Add Product'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}