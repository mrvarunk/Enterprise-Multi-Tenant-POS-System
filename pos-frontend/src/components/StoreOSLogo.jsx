import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * CafeOps Brand Logo — clickable, links to the role-appropriate dashboard.
 * @param {string} className - Tailwind size classes (e.g. 'w-8 h-8')
 * @param {boolean} showText - Whether to render the wordmark next to the icon
 * @param {'light' | 'dark'} variant - Color variant for different backgrounds
 */
export function CafeOpsLogo({ className = 'w-8 h-8', showText = false, variant = 'dark' }) {
    const user = useSelector((state) => state.auth?.user);

    // Determine where the logo should link based on the user's role
    const dashboardPath = (() => {
        if (!user?.role) return '/login';
        if (user.role === 'ROLE_BRANCH_CASHIER' || user.role === 'ROLE_CASHIER') return '/cashier/dashboard';
        if (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STORE_MANAGER' || user.role === 'ROLE_BRANCH_MANAGER') return '/admin';
        return '/login';
    })();

    const isDark = variant === 'dark';

    return (
        <Link
            to={dashboardPath}
            className="flex items-center gap-2.5 group outline-none focus:outline-none"
            title="Go to Dashboard"
        >
            {/* CafeOps icon: dark rounded square with amber coffee cup */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className={`${className} shrink-0 transition-transform duration-300 group-hover:scale-110`}
            >
                <defs>
                    <linearGradient id="cafeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EA580C" />
                    </linearGradient>
                </defs>
                <rect width="100" height="100" fill="#0C0A09" rx="18" />
                {/* Coffee cup body */}
                <rect x="28" y="42" width="34" height="28" rx="5" fill="url(#cafeGrad)" />
                {/* Cup handle */}
                <path d="M62 50 Q76 50 76 58 Q76 66 62 66" stroke="url(#cafeGrad)" strokeWidth="5" fill="none" strokeLinecap="round" />
                {/* Steam lines */}
                <path d="M36 36 Q39 30 36 24" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
                <path d="M45 36 Q48 28 45 22" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
                <path d="M54 36 Q57 30 54 24" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
                {/* Saucer */}
                <rect x="22" y="70" width="46" height="6" rx="3" fill="#F59E0B" opacity="0.5" />
            </svg>

            {showText && (
                <div className="flex flex-col">
                    <span className={`text-sm font-bold tracking-tight leading-none ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        Cafe<span className="text-amber-500">Ops</span>
                    </span>
                    <span className={`text-[9px] font-medium tracking-widest uppercase mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        POS Platform
                    </span>
                </div>
            )}
        </Link>
    );
}
