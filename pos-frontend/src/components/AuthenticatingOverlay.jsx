import { Lock } from 'lucide-react';

export default function AuthenticatingOverlay() {
    return (
        <div className="fixed inset-0 z-[9998] bg-[#FAFAFA]/80 backdrop-blur-md flex items-center justify-center">
            {/* Subtle background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-zinc-200/30 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Animated logo with pulse ring */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-zinc-900/5 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            className="w-full h-full"
                        >
                            <rect width="100" height="100" fill="#09090B" rx="16" />
                            <rect x="16" y="16" width="6" height="6" rx="2" fill="#F43F5E" opacity="0.8" />
                            <rect x="26" y="16" width="6" height="6" rx="2" fill="#D4A017" opacity="0.8" />
                            <rect x="36" y="16" width="6" height="6" rx="2" fill="#22C55E" opacity="0.8" />
                            <text x="50" y="55" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="32" letterSpacing="-1" fill="#FAFAFA">Store</text>
                            <text x="50" y="78" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="28" letterSpacing="6" fill="#F43F5E">OS</text>
                        </svg>
                    </div>
                </div>

                <h2 className="text-lg font-semibold tracking-tight !text-zinc-900">
                    Authenticating
                </h2>
                <p className="text-xs text-zinc-500 mt-1.5 max-w-[240px] text-center leading-relaxed">
                    Verifying credentials and initializing your secure operator session.
                </p>

                {/* Animated dots loader */}
                <div className="flex items-center gap-1.5 mt-6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-zinc-900"
                            style={{
                                animation: 'authPulse 1.4s ease-in-out infinite',
                                animationDelay: `${i * 0.16}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Security badge */}
                <div className="mt-8 flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium tracking-wide uppercase">
                    <Lock size={10} />
                    End-to-end encrypted
                </div>
            </div>

            <style>{`
                @keyframes authPulse {
                    0%, 80%, 100% {
                        transform: scale(0.6);
                        opacity: 0.4;
                    }
                    40% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
