import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2 } from 'lucide-react';
import { fetchEmployeesByBranch, deleteEmployee } from '../../redux/features/employee/employeeThunk';
import EmployeeModal from './EmployeeModal';

export default function EmployeeManagement() {
    const dispatch = useDispatch();
    const { employees, loading } = useSelector((state) => state.employee);
    const { user } = useSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const branchId = user?.branchId || 1;
        dispatch(fetchEmployeesByBranch(branchId));
    }, [dispatch, user]);

    const handleDelete = (employeeId, name) => {
        if (employeeId === user.id) {
            alert("You cannot delete your own admin account.");
            return;
        }
        if (window.confirm(`Revoke POS access for ${name}?`)) {
            dispatch(deleteEmployee(employeeId));
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Staff Roster</h1>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500 mt-1">Terminal Credentials & Access</p>
                </div>
                <div>
                    <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg text-sm font-medium shadow-md transition-all">
                        <Plus size={14} /> Add Employee
                    </button>
                </div>
            </div>

            {/* Roster Table */}
            <div className="w-full bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-50 border-b border-zinc-200 text-xs text-zinc-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-3">Employee Name</th>
                                <th className="px-5 py-3">Email Address</th>
                                <th className="px-5 py-3">Phone</th>
                                <th className="px-5 py-3">System Role</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-zinc-500">Loading staff ledger...</td>
                                </tr>
                            ) : employees.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-sm text-zinc-500">No active staff accounts registered.</td>
                                </tr>
                            ) : (
                                employees.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-zinc-50 transition-colors">
                                        <td className="px-5 py-4 text-zinc-900">{emp.fullName}</td>
                                        <td className="px-5 py-4 text-zinc-500">{emp.email}</td>
                                        <td className="px-5 py-4 font-mono text-zinc-500 tabular-nums">{emp.phone || '—'}</td>
                                        <td className="px-5 py-4">
                                            <span className="inline-block px-2 py-1 text-[10px] uppercase tracking-wider font-medium bg-zinc-50 border border-zinc-100 rounded-md text-zinc-500">
                                                {(emp.role || '').replace('ROLE_', '').replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button onClick={() => handleDelete(emp.id, emp.fullName)} className="p-1.5 text-zinc-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}