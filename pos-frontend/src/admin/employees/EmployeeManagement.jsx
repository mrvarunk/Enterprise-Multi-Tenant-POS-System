import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, Trash2, UserCircle } from 'lucide-react';
import { fetchEmployeesByBranch, deleteEmployee } from '../../redux/features/employee/employeeThunk';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import EmployeeModal from './EmployeeModal'; // We will build this brief modal next

export default function EmployeeManagement() {
    const dispatch = useDispatch();
    const { employees, loading } = useSelector((state) => state.employee);
    const { user } = useSelector((state) => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (user?.branchId) {
            dispatch(fetchEmployeesByBranch(user.branchId));
        }
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
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Staff Roster</h1>
                    <p className="text-sm text-muted-foreground">Manage cashier accounts and terminal access.</p>
                </div>
                <Button onClick={() => setIsModalOpen(true)} className="shadow-md">
                    <Plus className="mr-2 h-4 w-4" /> Add New Employee
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee Name</TableHead>
                            <TableHead>Email Address</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>System Role</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={5} className="text-center py-10">Loading staff data...</TableCell></TableRow>
                        ) : employees.length === 0 ? (
                            <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">No employees found.</TableCell></TableRow>
                        ) : (
                            employees.map((emp) => (
                                <TableRow key={emp.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <UserCircle className="h-5 w-5 text-muted-foreground" />
                                        {emp.firstName} {emp.lastName}
                                    </TableCell>
                                    <TableCell>{emp.email}</TableCell>
                                    <TableCell>{emp.phoneNumber || 'N/A'}</TableCell>
                                    <TableCell>
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${emp.role === 'STORE_OWNER' ? 'bg-primary/10 text-primary' : 'bg-secondary text-secondary-foreground'}`}>
                                            {emp.role.replace('_', ' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(emp.id, emp.firstName)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <EmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}