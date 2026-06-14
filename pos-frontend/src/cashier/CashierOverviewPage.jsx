import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Wallet,
  ArrowRightLeft,
  Receipt,
  Clock,
  AlertCircle,
  Printer,
  LogOut,
  CreditCard,
  Banknote,
  ScanLine,
} from "lucide-react";

export default function CashierOverview() {
  const navigate = useNavigate();
  const shiftDetails = {
    cashierName: "Operator 04",
    terminalId: "TRM-02",
    shiftStart: "08:00 AM",
    duration: "6h 22m",
    status: "Active",
  };

  const metrics = [
    {
      label: "Net Sales (Shift)",
      value: "₹14,250.00",
      trend: "+12%",
      icon: <Receipt size={16} className="text-zinc-500" />,
    },
    {
      label: "Cash in Drawer",
      value: "₹4,500.00",
      trend: "Expected",
      icon: <Wallet size={16} className="text-zinc-500" />,
    },
    {
      label: "Transactions",
      value: "48",
      trend: "Steady",
      icon: <ArrowRightLeft size={16} className="text-zinc-500" />,
    },
  ];

  const getMethodIcon = (method) => {
    switch (method) {
      case "UPI":
        return <ScanLine size={14} className="text-zinc-400" />;
      case "Card":
        return <CreditCard size={14} className="text-zinc-400" />;
      case "Cash":
        return <Banknote size={14} className="text-zinc-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">Shift {shiftDetails.status}</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Welcome back, {shiftDetails.cashierName}</h1>
            <p className="text-sm text-zinc-500 mt-1">Terminal {shiftDetails.terminalId} • Shift started at {shiftDetails.shiftStart}</p>
          </div>

          <div className="flex gap-3">
            <button className="h-10 px-4 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-all flex items-center gap-2 shadow-sm">
              <LogOut size={16} /> Lock Terminal
            </button>

            <button onClick={() => navigate('/cashier/terminal')} className="h-10 px-6 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-sm font-medium text-white transition-all shadow-md flex items-center gap-2">
              <Play size={16} /> Open Register
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center">{metric.icon}</div>
                <span className="text-[10px] font-medium px-2 py-1 bg-zinc-50 text-zinc-500 rounded-md border border-zinc-100">{metric.trend}</span>
              </div>

              <h3 className="text-xs font-semibold text-zinc-500 mb-1">{metric.label}</h3>
              <div className="text-2xl font-semibold text-zinc-900 tabular-nums tracking-tight">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-zinc-200 flex items-center justify-between bg-white">
              <h2 className="text-base font-semibold text-zinc-900">Recent Transactions</h2>
              <button className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors">View All</button>
            </div>

            <div className="space-y-4 p-5">
              <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
                <h2 className="text-base font-semibold text-zinc-900 mb-4">Shift Management</h2>

                <div className="space-y-2">
                  <button className="w-full h-10 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-all flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Banknote size={16} className="text-zinc-400" />
                      <span>Cash Drop / Payout</span>
                    </div>
                  </button>

                  <button className="w-full h-10 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-all flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Printer size={16} className="text-zinc-400" />
                      <span>Print X-Report</span>
                    </div>
                  </button>

                  <div className="pt-4 mt-4 border-t border-zinc-200">
                    <button className="w-full h-10 bg-red-50 border border-red-100 hover:bg-red-100 rounded-lg text-sm font-medium text-red-700 transition-all flex items-center justify-center gap-2">
                      <AlertCircle size={16} /> Close Shift (Z-Report)
                    </button>
                    <p className="text-[10px] text-zinc-500 text-center mt-2 leading-tight">Closing the shift will reconcile the drawer and log you out of the terminal.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-zinc-200 rounded-xl p-4 text-zinc-700 flex items-start gap-3 shadow-sm">
                <Clock size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 mb-0.5">Shift Duration: {shiftDetails.duration}</h4>
                  <p className="text-[10px] leading-relaxed text-zinc-500">Ensure a cash drop is performed if drawer balance exceeds ₹10,000.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
              <h2 className="text-base font-semibold text-zinc-900 mb-4">Shift Management</h2>

              <div className="space-y-2">
                <button className="w-full h-10 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-all flex items-center justify-between px-3">
                  <div className="flex items-center gap-2">
                    <Banknote size={16} className="text-zinc-400" />
                    <span>Cash Drop / Payout</span>
                  </div>
                </button>

                <button className="w-full h-10 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 rounded-lg text-sm font-medium text-zinc-700 transition-all flex items-center justify-between px-3">
                  <div className="flex items-center gap-2">
                    <Printer size={16} className="text-zinc-400" />
                    <span>Print X-Report</span>
                  </div>
                </button>

                <div className="pt-4 mt-4 border-t border-zinc-200">
                  <button className="w-full h-10 bg-red-50 border border-red-100 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 transition-all flex items-center justify-center gap-2">
                    <AlertCircle size={16} /> Close Shift (Z-Report)
                  </button>
                  <p className="text-[10px] text-zinc-400 text-center mt-2 leading-tight">Closing the shift will reconcile the drawer and log you out of the terminal.</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-xl p-4 text-zinc-400 flex items-start gap-3 shadow-lg">
              <Clock size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-zinc-100 mb-0.5">Shift Duration: {shiftDetails.duration}</h4>
                <p className="text-[10px] leading-relaxed">Ensure a cash drop is performed if drawer balance exceeds ₹10,000.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}