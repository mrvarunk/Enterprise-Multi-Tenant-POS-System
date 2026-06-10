import React from 'react';
import { Menu, LogOut, Receipt } from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';
import { Button } from '../components/ui/button.jsx';

export default function POSHeader() {
    const { setSidebarOpen } = useSidebar();

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        window.location.href = '/login';
    };

    return (
        <header className="flex h-16 items-center justify-between border-b bg-card px-6 shadow-sm">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Receipt className="h-5 w-5" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">SaaS POS Terminal</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden text-right md:block">
                    <p className="text-sm font-medium leading-none">Raju Sharma</p>
                    <p className="text-xs text-muted-foreground">Active Cashier Session</p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={handleLogout}
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </header>
    );
}