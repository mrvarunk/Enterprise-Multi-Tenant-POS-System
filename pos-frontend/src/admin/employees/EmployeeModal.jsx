import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { createEmployee } from '../../redux/features/employee/employeeThunk';

export default function EmployeeModal({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { actionLoading } = useSelector(state => state.employee);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        role: 'BRANCH_CASHIER'
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Link the employee to the same business boundaries as the current administrator
        const payload = {
            ...formData,
            storeId: user.storeId,
            branchId: user.branchId
        };

        await dispatch(createEmployee(payload));
        setFormData({ firstName: '', lastName: '', email: '', password: '', phoneNumber: '', role: 'BRANCH_CASHIER' });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">First Name</label>
                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="John" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">Last Name</label>
                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="john.doe@store.com" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold">Account Password</label>
                        <input required type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="••••••••" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">Phone Number</label>
                            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm" placeholder="9876543210" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold">System Access Role</label>
                            <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 border border-input rounded-md bg-background text-sm">
                                <option value="BRANCH_CASHIER">Branch Cashier</option>
                                <option value="STORE_OWNER">Store Manager / Owner</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-border mt-6">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={actionLoading}>
                            {actionLoading ? 'Creating...' : 'Register Employee'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}