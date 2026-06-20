import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';
import { LayoutDashboard, ShoppingCart, Clock, RotateCcw, Receipt, LogOut } from 'lucide-react';

import { StoreOSLogo } from '../components/StoreOSLogo';

export default function CashierDashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navItems = [
        { path: "/cashier/dashboard", icon: LayoutDashboard, label: "Console" },
        { path: "/cashier/terminal", icon: ShoppingCart, label: "POS Terminal" },
        { path: "/cashier/orders", icon: Clock, label: "Order History" },
        { path: "/cashier/returns", icon: RotateCcw, label: "Returns" },
        { path: "/cashier/shift-summary", icon: Receipt, label: "Shift Summary" }
    ];

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#FAFAFA] text-zinc-900 select-none">
            
            {/* --- TOP NAVIGATION BAR --- */}
            <header className="h-14 bg-white border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 shadow-sm">
                <div className="flex items-center gap-4">
                    <StoreOSLogo className="w-7 h-7" showText variant="light" />
 
 
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path === "/cashier/dashboard" && location.pathname === "/cashier");
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                                        isActive
                                            ? 'text-[#D4A017] bg-[#D4A017]/10'
                                            : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
 
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Active Shift</span>
                    </div>
                    <div className="h-4 w-px bg-zinc-200" />
                    <button
                        onClick={handleLogout}
                        className="text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer flex items-center gap-2 text-xs font-medium"
                    >
                        <LogOut size={14} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </header>
 
            {/* Core Application Content Workspace */}
            <main className="flex-1 overflow-hidden bg-[#FAFAFA]">
                <Outlet />
            </main>
        </div>
    );
}