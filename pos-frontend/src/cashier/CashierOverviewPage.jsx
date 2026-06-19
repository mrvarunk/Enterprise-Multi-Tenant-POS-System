import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTodayOrdersByBranch } from "../redux/features/order/orderThunk";
import {
  Play,
  Wallet,
  ArrowRightLeft,
  Receipt,
  Clock,
  AlertCircle,
  Printer,
  LogOut,
  Banknote,
  SearchX
} from "lucide-react";

export default function CashierOverview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { todayOrders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (user?.storeId) {
      dispatch(getTodayOrdersByBranch(user.storeId));
    }
  }, [dispatch, user]);

  // Derived Dynamic Data
  const cashierName = user?.name || "Operator";
  const netSales = todayOrders?.reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;
  const cashInDrawer = todayOrders?.filter(o => o.paymentType === 'CASH').reduce((sum, order) => sum + (order.totalAmount || 0), 0) || 0;
  const transactionsCount = todayOrders?.length || 0;

  const shiftDetails = {
    terminalId: "TRM-01",
    shiftStart: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: "Active",
  };

  const metrics = [
    {
      label: "Net Sales (Shift)",
      value: `₹${netSales.toFixed(2)}`,
      trend: "+ Live",
      icon: <Receipt size={18} className="text-[#D4A017]" />,
      bg: "bg-[#D4A017]/10"
    },
    {
      label: "Cash in Drawer",
      value: `₹${cashInDrawer.toFixed(2)}`,
      trend: "Expected",
      icon: <Wallet size={18} className="text-emerald-600" />,
      bg: "bg-emerald-50"
    },
    {
      label: "Transactions",
      value: transactionsCount.toString(),
      trend: "Steady",
      icon: <ArrowRightLeft size={18} className="text-blue-600" />,
      bg: "bg-blue-50"
    },
  ];

  const recentTransactionsList = todayOrders?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 font-sans p-4 sm:p-8 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#D4A017]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200/60">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Shift {shiftDetails.status}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome back, {cashierName}</h1>
            <p className="text-sm font-medium text-zinc-500 mt-1.5">Terminal {shiftDetails.terminalId} • Session started today</p>
          </div>

          <div className="flex gap-3">
            <button className="h-11 px-5 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl text-sm font-bold text-zinc-700 transition-all flex items-center gap-2.5 shadow-sm hover:shadow-md cursor-pointer">
              <LogOut size={16} /> Lock Terminal
            </button>

            <button onClick={() => navigate('/cashier/terminal')} className="h-11 px-6 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-sm font-bold tracking-wide text-white transition-all shadow-lg flex items-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95">
              <Play size={16} className="text-[#D4A017]" fill="currentColor" /> Open Register
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-zinc-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${metric.bg}`}>{metric.icon}</div>
                <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 bg-zinc-50 text-zinc-500 rounded-md border border-zinc-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">{metric.trend}</span>
              </div>

              <h3 className="text-sm font-semibold text-zinc-500 mb-1 relative z-10">{metric.label}</h3>
              <div className="text-3xl font-black text-zinc-900 tabular-nums tracking-tighter relative z-10">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content Area - Recent Transactions */}
          <div className="lg:col-span-2 bg-white border border-zinc-200/60 rounded-2xl shadow-sm flex flex-col h-full overflow-hidden">
            <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <h2 className="text-base font-bold text-zinc-900">Recent Transactions</h2>
              <button className="text-[11px] uppercase tracking-wider font-bold text-[#D4A017] hover:text-[#b88a14] transition-colors cursor-pointer">View All</button>
            </div>

            <div className="flex-1 p-0 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="h-6 w-6 rounded-full border-2 border-[#D4A017] border-t-transparent animate-spin"></div>
                </div>
              ) : recentTransactionsList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
                  <SearchX size={32} className="mb-3 opacity-20" />
                  <p className="text-sm font-medium">No transactions recorded today.</p>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-100">
                  {recentTransactionsList.map((order) => (
                    <li key={order.id} className="p-5 hover:bg-zinc-50 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#D4A017]/10 text-[#D4A017] flex items-center justify-center font-bold text-xs shrink-0">
                          #{order.id}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 group-hover:text-[#D4A017] transition-colors">
                            {order.paymentType} Payment
                          </p>
                          <p className="text-xs font-medium text-zinc-500 mt-0.5">
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-black text-zinc-900 tabular-nums tracking-tight">₹{(order.totalAmount || 0).toFixed(2)}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                          Completed
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Sidebar - Shift Management */}
          <div className="space-y-6">
            <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-zinc-900 mb-5">Shift Management</h2>

              <div className="space-y-2.5">
                <button className="w-full h-11 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl text-sm font-semibold text-zinc-700 transition-all flex items-center justify-between px-4 cursor-pointer shadow-sm">
                  <div className="flex items-center gap-3">
                    <Banknote size={16} className="text-zinc-400" />
                    <span>Cash Drop / Payout</span>
                  </div>
                </button>

                <button className="w-full h-11 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-xl text-sm font-semibold text-zinc-700 transition-all flex items-center justify-between px-4 cursor-pointer shadow-sm">
                  <div className="flex items-center gap-3">
                    <Printer size={16} className="text-zinc-400" />
                    <span>Print X-Report</span>
                  </div>
                </button>

                <div className="pt-5 mt-5 border-t border-zinc-100">
                  <button className="w-full h-11 bg-red-50 border border-red-100 hover:bg-red-100 hover:border-red-200 rounded-xl text-sm font-bold text-red-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <AlertCircle size={16} /> Close Shift (Z-Report)
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center mt-3 leading-relaxed font-medium px-2">
                    Closing the shift will reconcile the drawer and log you out of the terminal.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 text-zinc-400 flex items-start gap-3.5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
              <Clock size={18} className="text-emerald-400 shrink-0 mt-0.5" />
              <div className="relative z-10">
                <h4 className="text-sm font-bold text-white mb-1 tracking-wide">Shift Operational</h4>
                <p className="text-xs leading-relaxed text-zinc-400 font-medium">
                  Ensure a cash drop is performed if the physical drawer balance exceeds ₹10,000 to maintain security protocols.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}