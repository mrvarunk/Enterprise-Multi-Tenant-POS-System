import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * StoreOS Brand Logo — clickable, links to the role-appropriate dashboard.
 * @param {string} className - Tailwind size classes (e.g. 'w-8 h-8')
 * @param {boolean} showText - Whether to render the wordmark next to the icon
 * @param {'light' | 'dark'} variant - Color variant for different backgrounds
 */
export function StoreOSLogo({ className = 'w-8 h-8', showText = false, variant = 'dark' }) {
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
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className={`${className} shrink-0 transition-transform duration-300 group-hover:scale-110`}
            >
                <rect width="100" height="100" fill="#09090B" rx="16" />
                {/* Terminal dots */}
                <rect x="16" y="16" width="6" height="6" rx="2" fill="#F43F5E" opacity="0.8" />
                <rect x="26" y="16" width="6" height="6" rx="2" fill="#D4A017" opacity="0.8" />
                <rect x="36" y="16" width="6" height="6" rx="2" fill="#22C55E" opacity="0.8" />
                {/* Brand text - two lines */}
                <text x="50" y="55" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="32" letterSpacing="-1" fill="#FAFAFA">Store</text>
                <text x="50" y="78" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="28" letterSpacing="6" fill="#F43F5E">OS</text>
            </svg>

            {showText && (
                <div className="flex flex-col">
                    <span className={`text-sm font-semibold tracking-tight leading-none ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                        Store<span className="text-rose-500">OS</span>
                    </span>
                    <span className={`text-[9px] font-medium tracking-widest uppercase mt-0.5 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        Enterprise
                    </span>
                </div>
            )}
        </Link>
    );
}
