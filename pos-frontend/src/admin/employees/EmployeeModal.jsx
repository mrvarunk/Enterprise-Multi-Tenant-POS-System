import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
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

        // Map frontend fields to backend DTO fields (fullName, phone, proper UserRole enum name)
        const payload = {
            fullName: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            password: formData.password,
            phone: formData.phoneNumber,
            role: formData.role === 'STORE_OWNER' ? 'ROLE_BRANCH_MANAGER' : 'ROLE_BRANCH_CASHIER',
            storeId: user?.storeId || 1,
            branchId: user?.branchId || 1
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
                            <label className="text-sm font-medium text-zinc-900">First Name</label>
                            <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="John" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Last Name</label>
                            <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-900">Email Address</label>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="john.doe@store.com" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-zinc-900">Account Password</label>
                        <input required type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="••••••••" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">Phone Number</label>
                            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" placeholder="9876543210" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-zinc-900">System Access Role</label>
                            <select name="role" value={formData.role} onChange={handleInputChange} className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                                <option value="BRANCH_CASHIER">Branch Cashier</option>
                                <option value="STORE_OWNER">Store Manager / Owner</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-2 border-t border-zinc-200 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50">Cancel</button>
                        <button type="submit" disabled={actionLoading} className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium shadow-md">
                            {actionLoading ? 'Creating...' : 'Register Employee'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}