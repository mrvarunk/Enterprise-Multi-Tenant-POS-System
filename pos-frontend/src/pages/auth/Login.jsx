import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/redux/features/auth/authThunk.js';
import { Activity, ShieldCheck, Server, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });

    // Pulling real auth state from your Redux store
    const { loading, error, user } = useSelector((state) => state.auth);

    // --- LIVE OPERATIONAL METRICS (Simulated for the Hero UI) ---
    const [orders, setOrders] = useState(4821);
    const locationsOnline = 14;
    const [serviceHealth, setServiceHealth] = useState('Operational');
    const [revenueTrend, setRevenueTrend] = useState([22, 24, 20, 26, 28, 30, 28]);

    // --- LIVE ACTIVITY FEED ---
    const [feed, setFeed] = useState([
        { id: 1, text: 'Shift opened • Downtown', time: 'now' },
        { id: 2, text: 'Order #4821 paid • Table 12', time: '1m' },
        { id: 3, text: 'Refund processed • $18.00 • Midtown', time: '3m' },
    ]);
    const feedId = useRef(4);

    // Clear any stale JWT and user data on login page mount to prevent expired tokens
    // from being sent with the login request via the axios interceptor
    useEffect(() => {
        localStorage.removeItem('JWT');
        localStorage.removeItem('USER');
    }, []);

    // Simulation Effect to make the background dashboard feel alive
    useEffect(() => {
        const interval = setInterval(() => {
            setOrders((o) => o + Math.floor(Math.random() * 3));
            setRevenueTrend((t) => {
                const next = [...t, Math.max(6, t[t.length - 1] + Math.round((Math.random() - 0.4) * 4))];
                return next.slice(-8);
            });

            if (Math.random() > 0.94) {
                setServiceHealth('Degraded');
                setTimeout(() => setServiceHealth('Operational'), 5000);
            }

            const events = [
                'New order • Takeaway • ₹850.00',
                'Payment declined • Terminal 3',
                'Shift closed • Branch #02',
                'Inventory low • Whole Milk 1L',
                'Order prepared • Kitchen Ops',
            ];
            setFeed((prev) => [
                { id: feedId.current++, text: events[Math.floor(Math.random() * events.length)], time: 'now' },
                ...prev
            ].slice(0, 5)); // Keep list short and clean
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // --- AUTHENTICATION LOGIC ---
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    // Role-based Redirection
    useEffect(() => {
        if (user && user.role) {
            if (user.role === 'ROLE_BRANCH_CASHIER' || user.role === 'ROLE_CASHIER') {
                navigate('/cashier/dashboard');
            } else if (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STORE_MANAGER' || user.role === 'ROLE_BRANCH_MANAGER') {
                navigate('/admin');
            }
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-[#FAFAFA] text-[#09090B] relative overflow-hidden flex flex-col lg:flex-row font-sans">

            {/* --- GLOBAL BACKGROUND EFFECTS (Fixed DOM Position) --- */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-zinc-200/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-zinc-200/50 rounded-full blur-[100px]" />
            </div>

            {/* --- LEFT: HERO & DASHBOARD PREVIEW --- */}
            <aside className="hidden lg:flex lg:w-1/2 xl:w-7/12 px-12 xl:px-20 py-20 flex-col justify-center relative z-10 border-r border-zinc-200 bg-white/40 backdrop-blur-xl">
                <div className="max-w-2xl">
                    <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-md">
                            <Server size={22} strokeWidth={1.5} />
                        </div>
                        <div>
                            <div className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-1">Operations • Enterprise</div>
                            <h1 className="text-3xl font-semibold leading-tight tracking-tight !text-zinc-900">
                                Run multi-location operations with absolute precision.
                            </h1>
                            <p className="mt-3 text-sm text-zinc-500 max-w-lg leading-relaxed">
                                Monitor terminal health, reconcile revenue across branches, and surface issues before they impact the floor. Built for operators who run at scale.
                            </p>

                            {/* Premium Trust Badges */}
                            <div className="flex items-center gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-xs font-medium text-zinc-600 shadow-sm">
                  <ShieldCheck size={14} className="text-zinc-900" /> PCI DSS
                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-xs font-medium text-zinc-600 shadow-sm">
                  <Lock size={14} className="text-zinc-900" /> SOC 2 Type II
                </span>
                            </div>
                        </div>
                    </div>

                    {/* Abstract Dashboard Visual */}
                    <div className="mt-10 grid grid-cols-12 gap-4 items-start">

                        {/* KPI Chart Card */}
                        <div className="col-span-8 bg-white border border-zinc-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="text-xs text-zinc-500 font-medium">Revenue Trend (7D)</div>
                                    <div className="text-2xl font-semibold mt-1 text-zinc-900 tabular-nums tracking-tight">
                                        ₹{(revenueTrend.reduce((a, b) => a + b, 0) * 100).toLocaleString()}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                    <Activity size={12} /> Live
                                </div>
                            </div>

                            {/* Minimalist Trend Line */}
                            <div className="h-16 w-full relative">
                                <svg width="100%" height="100%" viewBox="0 0 320 80" preserveAspectRatio="none">
                                    <path d={`M0 80 ${revenueTrend.map((v, i) => `L${(i + 1) * (320 / revenueTrend.length)} ${80 - v * 1.5}`).join(' ')} L320 80 Z`} fill="#18181B" opacity="0.03" />
                                    <path d={`${revenueTrend.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i + 1) * (320 / revenueTrend.length)} ${80 - v * 1.5}`).join(' ')}`} stroke="#18181B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </div>

                            {/* Mini Metrics */}
                            <div className="mt-4 grid grid-cols-3 gap-3">
                                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Terminals</div>
                                    <div className="text-base font-medium mt-1 text-zinc-900 tabular-nums">{locationsOnline}</div>
                                </div>
                                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Orders</div>
                                    <div className="text-base font-medium mt-1 text-zinc-900 tabular-nums">{orders.toLocaleString()}</div>
                                </div>
                                <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-lg">
                                    <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Health</div>
                                    <div className={`text-sm font-medium mt-1 truncate ${serviceHealth === 'Operational' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {serviceHealth}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Feed Card */}
                        <div className="col-span-4 bg-white border border-zinc-200 rounded-xl p-4 shadow-sm h-full">
                            <div className="text-xs font-semibold text-zinc-900 mb-4 flex items-center justify-between">
                                System Log
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <ul className="space-y-4">
                                {feed.map((f) => (
                                    <li key={f.id} className="relative pl-3 border-l-2 border-zinc-200">
                                        <div className="text-[11px] font-medium leading-tight text-zinc-700">{f.text}</div>
                                        <div className="text-[10px] text-zinc-400 mt-1">{f.time}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- RIGHT: AUTHENTICATION PANEL --- */}
            <main className="w-full lg:w-1/2 xl:w-5/12 min-h-screen flex flex-col items-center justify-center p-6 sm:p-10 relative z-10">

                {/* Mobile Branding Fallback */}
                <div className="lg:hidden flex flex-col items-center mb-8 text-center">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white shadow-md mb-4">
                        <Server size={20} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight !text-zinc-900">Enterprise POS</h1>
                    <p className="text-xs text-zinc-500 mt-1">Authorized terminal access only.</p>
                </div>

                <div className="w-full max-w-[360px]">
                    {/* Login Card */}
                    <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-xl shadow-zinc-200/50">
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold tracking-tight !text-zinc-900">Sign In</h3>
                            <p className="text-sm text-zinc-500 mt-1.5 leading-snug">
                                Initialize your secure operator session.
                            </p>
                        </div>

                        {/* REAL REDUX ERROR HANDLING */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-xs font-medium text-red-600">
                                {typeof error === 'string' ? error : 'Authentication failed. Please check credentials.'}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-semibold text-zinc-700">
                                    Operator Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="manager@store.com"
                                    className="w-full h-10 px-3 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all shadow-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="password" className="block text-xs font-semibold text-zinc-700">
                                    Passcode
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full h-10 px-3 text-sm rounded-lg border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all shadow-sm"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-10 rounded-lg text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    {loading ? 'Authenticating...' : 'Open Terminal'}
                                    {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mt-8 flex items-center justify-between text-xs font-medium text-zinc-00">
                        <span>v2.4.0 • Enterprise Edition</span>
                        <span className="flex items-center gap-1"><Lock size={10} /> End-to-End Encrypted</span>
                    </div>
                </div>
            </main>
        </div>
    );
}