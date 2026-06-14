import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Boxes, Users, LogOut } from 'lucide-react';
import { StoreOSLogo } from '../components/StoreOSLogo';

export default function AdminDashboardLayout() {
  const navigate = useNavigate();

  const adminNavItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Console' },
    { to: '/admin/inventory', icon: Boxes, label: 'Stock Ledger' },
    { to: '/admin/employees', icon: Users, label: 'Staff Roster' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFA] text-zinc-900 font-sans">
      {/* Left navigation column (master) */}
      <aside className="w-20 border-r border-zinc-200 bg-[#FAFAF9] flex flex-col items-center py-6 gap-6">
        {adminNavItems.map((item) => (
          <NavLink
            to={item.to}
            key={item.to}
            className={({ isActive }) =>
              `flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                isActive ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:bg-zinc-50'
              }`
            }
            title={item.label}
          >
            <item.icon size={16} />
          </NavLink>
        ))}

        <div className="mt-auto" />
        <button onClick={handleLogout} title="Logout" className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-50">
          <LogOut size={16} />
        </button>
      </aside>

      {/* Main content area (detail) */}
      <div className="flex-1">
        <header className="h-16 flex items-center justify-between px-8 border-b border-zinc-200 bg-white">
          <div className="flex items-center gap-4">
            <StoreOSLogo className="w-8 h-8" />
            <div className="text-sm font-medium tracking-tight">Store OS</div>
            <div className="text-xs text-zinc-500">Operations Console</div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs text-zinc-500">PCI DSS</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs text-zinc-500">SOC 2</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-zinc-200 text-xs text-zinc-500">SLA 99.9%</div>
          </div>
        </header>

        <main className="p-8 md:p-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}