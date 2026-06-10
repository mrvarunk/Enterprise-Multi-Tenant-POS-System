import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Receipt, RotateCcw, Clock, ShoppingCart } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';

export default function Sidebar({ onClose }) {
    const location = useLocation();

    // The routes allowed for the Cashier terminal
    const navItems = [
        { path: "/cashier", icon: ShoppingCart, label: "POS Terminal" },
        { path: "/cashier/orders", icon: Clock, label: "Order History" },
        { path: "/cashier/returns", icon: RotateCcw, label: "Returns" },
        { path: "/cashier/shift-summary", icon: Receipt, label: "Shift Summary" }
    ];

    return (
        <div className="flex h-full w-64 flex-col border-r border-border bg-sidebar p-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold text-sidebar-foreground">POS System</h1>
                <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div className="flex-1 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3 rounded-md px-3 py-3 transition-colors ${
                                isActive
                                    ? 'bg-primary text-primary-foreground font-medium'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}