
import { Link, useLocation } from 'react-router-dom';
import {
    ShoppingCart, Receipt, Clock, RotateCcw,
    Settings, LifeBuoy, LogOut, Store, ChevronDown
} from 'lucide-react';

export default function Sidebar({ onClose }) {
    const location = useLocation();

    // Your actual Cashier routes
    const navItems = [
        { name: 'POS Terminal', path: '/cashier/terminal', icon: <ShoppingCart size={18} /> },
        { name: 'Order History', path: '/cashier/orders', icon: <Clock size={18} /> },
        { name: 'Returns', path: '/cashier/returns', icon: <RotateCcw size={18} /> },
        { name: 'Shift Summary', path: '/cashier/shift-summary', icon: <Receipt size={18} /> }
    ];

    const bottomNavItems = [
        { name: 'Support', path: '/support', icon: <LifeBuoy size={18} /> },
        { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
    ];

    return (
        <aside className="flex flex-col w-full h-full bg-white border-r border-zinc-200 shrink-0">

            {/* Tenant / Branch Selector */}
            <div className="h-14 flex items-center px-4 border-b border-zinc-200 cursor-pointer hover:bg-zinc-50 transition-colors shrink-0">
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
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={onClose} // Closes mobile menu if passed
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                                isActive
                                    ? 'bg-zinc-100 text-zinc-900 shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'
                            }`}
                        >
                            <span className={isActive ? 'text-zinc-900' : 'text-zinc-400'}>{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Navigation */}
            <div className="p-3 border-t border-zinc-200 space-y-1 bg-zinc-50/50 shrink-0">
                {bottomNavItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        onClick={onClose}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-white transition-all`}
                    >
                        <span className="text-zinc-400">{item.icon}</span>
                        {item.name}
                    </Link>
                ))}
                <button className="w-full flex items-center gap-3 px-3 py-2 mt-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                    <span className="text-red-500"><LogOut size={18} /></span>
                    End Shift
                </button>
            </div>
        </aside>
    );
}