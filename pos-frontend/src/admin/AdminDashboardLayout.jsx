import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Boxes, Users, LogOut, Menu, X, ShieldAlert } from 'lucide-react';

export default function AdminDashboardLayout() {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const adminNavItems = [
        { path: "/admin", icon: LayoutDashboard, label: "Overview Panel" },
        { path: "/admin/inventory", icon: Boxes, label: "Stock Control" },
        { path: "/admin/employees", icon: Users, label: "Staff Roster" }
    ];

    const handleLogout = () => {
        localStorage.removeItem('JWT');
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-zinc-950">

            {/* Desktop Static Sidebar Panel */}
            <aside className="hidden md:flex flex-col w-64 bg-zinc-900 text-zinc-100 border-r border-zinc-800 p-4 justify-between">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 px-2 py-4 border-b border-zinc-800">
                        <ShieldAlert className="h-6 w-6 text-primary" />
                        <span className="font-black tracking-tight text-lg">Admin Workspace</span>
                    </div>
                    <nav className="space-y-1">
                        {adminNavItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                                        isActive ? 'bg-primary text-primary-foreground' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                                    }`}
                                >
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:bg-destructive/10 hover:text-destructive transition-colors w-full"
                >
                    <LogOut size={18} />
                    <span>Exit Panel</span>
                </button>
            </aside>

            {/* Main Operational Container */}
            <div className="flex flex-1 flex-col overflow-hidden">

                {/* Mobile Navigation Header Row Bar */}
                <header className="flex md:hidden h-16 bg-card border-b px-6 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-primary" />
                        <span className="font-bold text-sm">POS Manager</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1.5 hover:bg-secondary rounded-md">
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </header>

                {/* Main Dynamic Viewport Injection Window */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}