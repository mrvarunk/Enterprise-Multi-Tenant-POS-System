import { Outlet } from 'react-router-dom';
import { useSidebar } from '../context/useSidebarContext.js';
import Sidebar from './Sidebar';
import POSHeader from './POSHeader';

export default function CashierDashboardLayout() {
    const { sidebarOpen, setSidebarOpen } = useSidebar();

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-background">
            {/* Background Blur Overlay for Mobile Sidebar Views */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar View Container */}
            <div className={`
                fixed inset-y-0 left-0 z-30 transform bg-card shadow-lg transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>

            {/* Core Display Application Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <POSHeader />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 p-4 dark:bg-zinc-900/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}