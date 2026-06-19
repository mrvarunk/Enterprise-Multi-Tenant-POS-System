import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Boxes, Users, LogOut, Sparkles } from 'lucide-react';
import { StoreOSLogo } from '../components/StoreOSLogo';

export default function AdminDashboardLayout() {
  const navigate = useNavigate();

  const adminNavItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Console', end: true },
    { to: '/admin/inventory', icon: Boxes, label: 'Stock Ledger' },
    { to: '/admin/employees', icon: Users, label: 'Staff Roster' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-[#F4F4F5] text-zinc-900 font-sans selection:bg-[#D4A017] selection:text-white">
      {/* Premium Dark Sidebar */}
      <aside className="w-24 border-r border-[#1a1a1a] bg-[#09090b] flex flex-col items-center py-8 gap-8 shadow-[10px_0_30px_rgba(0,0,0,0.15)] z-20 transition-all duration-300">
        <div className="mb-4 text-white hover:scale-110 transition-transform duration-300 cursor-pointer flex flex-col items-center gap-2">
           <StoreOSLogo className="w-10 h-10 drop-shadow-[0_0_15px_rgba(212,160,23,0.4)]" />
           <Sparkles size={14} className="text-[#D4A017] opacity-80" />
        </div>

        <nav className="flex flex-col gap-6 w-full px-4">
          {adminNavItems.map((item) => (
            <NavLink
              to={item.to}
              key={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex flex-col items-center justify-center h-16 w-full rounded-2xl transition-all duration-300 overflow-hidden ${
                  isActive 
                    ? 'bg-gradient-to-br from-[#27272a] to-[#18181b] text-[#D4A017] shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[#3f3f46]' 
                    : 'text-zinc-500 hover:bg-[#18181b] hover:text-zinc-200'
                }`
              }
              title={item.label}
            >
              <item.icon size={22} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1" />
              <span className="text-[10px] font-medium mt-1 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-2">
                {item.label.split(' ')[0]}
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto w-full px-4" />
        <button 
          onClick={handleLogout} 
          title="Logout" 
          className="flex h-12 w-12 items-center justify-center rounded-xl text-zinc-500 hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 mt-4 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        </button>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Sleek Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-white/80 backdrop-blur-xl border-b border-zinc-200/60 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-5">
            <div className="flex flex-col">
              <div className="text-lg font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
                Store OS <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] uppercase tracking-widest font-bold">Pro</span>
              </div>
              <div className="text-sm text-zinc-500 font-medium">Operations Console</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm">
            {['PCI DSS', 'SOC 2', 'SLA 99.9%'].map(badge => (
              <div key={badge} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200/80 text-xs font-semibold text-zinc-600 shadow-sm transition-all hover:bg-zinc-100 hover:shadow-md cursor-default">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                {badge}
              </div>
            ))}
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}