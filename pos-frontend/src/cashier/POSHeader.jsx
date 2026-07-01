import { useState } from 'react';
import Sidebar from './Sidebar';
import {
    LayoutDashboard, ShoppingCart, Receipt, Package,
    Users, Settings, Bell, CloudSync, ChevronDown,
    Store, LifeBuoy, LogOut, Menu
} from 'lucide-react';

export default function POSLayout({ children, activePage = 'Dashboard' }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Terminal (POS)', icon: <ShoppingCart size={18} /> },
        { name: 'Orders & Refunds', icon: <Receipt size={18} /> },
        { name: 'Inventory', icon: <Package size={18} /> },
        { name: 'Customers', icon: <Users size={18} /> },
    ];

    const bottomNavItems = [
        { name: 'Support', icon: <LifeBuoy size={18} /> },
        { name: 'Settings', icon: <Settings size={18} /> },
    ];

    return (

        <div className="flex h-screen bg-[#FAFAFA] text-zinc-900 font-sans overflow-hidden">

            {/* --- SIDEBAR (Desktop) --- */}
            <aside className="hidden md:flex flex-col w-[240px] bg-white border-r border-zinc-200 z-20 shrink-0">

                {/* Tenant / Branch Selector */}
                <div className="h-14 flex items-center px-4 border-b border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors">
                    <div className="w-8 h-8 rounded bg-zinc-900 flex items-center justify-center text-white shrink-0 shadow-sm">
                        <Store size={16} />
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                        <h2 className="text-sm font-semibold text-zinc-900 truncate">Vantage Roasters</h2>
                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider truncate">Branch #04 • Mumbai</p>
                    </div>
                    <ChevronDown size={14} className="text-zinc-400 shrink-0" />
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 no-scrollbar">
                    <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-2">Core Operations</div>
                    {navItems.map((item) => {
                        const isActive = activePage === item.name;
                        return (
                            <button
                                key={item.name}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                                }`}
                            >
                                <span className={isActive ? 'text-zinc-900' : 'text-zinc-400'}>{item.icon}</span>
                                {item.name}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Navigation */}
                <div className="p-3 border-t border-zinc-200 space-y-1 bg-zinc-50/50">
                    {bottomNavItems.map((item) => (
                        <button
                            key={item.name}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-white transition-all`}
                        >
                            <span className="text-zinc-400">{item.icon}</span>
                            {item.name}
                        </button>
                    ))}
                    <button className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                        <span className="text-red-500"><LogOut size={18} /></span>
                        End Shift
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* --- GLOBAL HEADER --- */}
                <header className="h-14 bg-white/80 backdrop-blur-md border-b border-zinc-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">

                    {/* Mobile Menu Button & Breadcrumb */}
                    <div className="flex items-center gap-3">
                        <button
                            className="md:hidden p-1.5 -ml-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="hidden sm:flex items-center text-sm">
                            <span className="text-zinc-500 font-medium">Operations</span>
                            <span className="mx-2 text-zinc-300">/</span>
                            <span className="text-zinc-900 font-semibold">{activePage}</span>
                        </div>
                    </div>

                    {/* Global Actions */}
                    <div className="flex items-center gap-4 sm:gap-6">

                        {/* Sync Status */}
                        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-zinc-500">
                            <CloudSync size={14} className="text-emerald-500" />
                            <span>Synced just now</span>
                        </div>

                        <div className="h-4 w-px bg-zinc-200 hidden sm:block"></div>

                        {/* Notifications */}
                        <button className="relative text-zinc-400 hover:text-zinc-900 transition-colors">
                            <Bell size={18} />
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
                        </button>

                        {/* User Profile */}
                        <button className="flex items-center gap-2 pl-2">
                            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                                JD
                            </div>
                        </button>
                    </div>
                </header>

                {/* --- DYNAMIC PAGE CONTENT --- */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FAFAFA] relative">
                    {children}
                </main>
            </div>
            {/* Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative w-60 h-full shadow-2xl">
                        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
            )}

            {/* --- MOBILE SIDEBAR OVERLAY (Fallback) --- */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <div className="relative w-[240px] bg-white h-full shadow-2xl flex flex-col">
                        {/* Re-use sidebar content here or abstract to a separate component in production */}
                        <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
                            <span className="font-semibold tracking-tight">CafeOps</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-zinc-500"><LogOut size={18} /></button>
                        </div>
                        <nav className="flex-1 p-4 space-y-2">
                            {navItems.map(item => (
                                <button key={item.name} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-zinc-600 rounded-md">
                                    {item.icon} {item.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

        </div>
    );
}