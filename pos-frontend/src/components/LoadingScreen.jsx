import { useEffect, useState } from 'react';
import { Shield, Database, Wifi, CheckCircle2, Server } from 'lucide-react';

const bootSequence = [
    { label: 'Initializing secure runtime', icon: Shield, delay: 400 },
    { label: 'Connecting to cloud infrastructure', icon: Database, delay: 700 },
    { label: 'Establishing encrypted channels', icon: Wifi, delay: 500 },
    { label: 'Loading terminal modules', icon: Server, delay: 600 },
];

export default function LoadingScreen({ onComplete }) {
    const [completedSteps, setCompletedSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        let totalDelay = 0;

        bootSequence.forEach((step, index) => {
            totalDelay += step.delay;
            setTimeout(() => {
                setCurrentStep(index);
                setProgress(((index + 1) / bootSequence.length) * 100);
            }, totalDelay - step.delay / 2);

            setTimeout(() => {
                setCompletedSteps((prev) => [...prev, index]);
            }, totalDelay);
        });

        // All done — fade out and call onComplete
        setTimeout(() => {
            setFadeOut(true);
        }, totalDelay + 300);

        setTimeout(() => {
            onComplete?.();
        }, totalDelay + 800);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#FAFAFA] flex items-center justify-center transition-opacity duration-500 ${
                fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* Subtle background blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-zinc-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-15%] right-[-10%] w-[450px] h-[450px] bg-zinc-200/40 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
                {/* Logo */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="w-14 h-14 rounded-xl shadow-lg"
                >
                    <rect width="100" height="100" fill="#09090B" rx="16" />
                    <rect x="16" y="16" width="6" height="6" rx="2" fill="#F43F5E" opacity="0.8" />
                    <rect x="26" y="16" width="6" height="6" rx="2" fill="#D4A017" opacity="0.8" />
                    <rect x="36" y="16" width="6" height="6" rx="2" fill="#22C55E" opacity="0.8" />
                    <text x="50" y="55" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="32" letterSpacing="-1" fill="#FAFAFA">Store</text>
                    <text x="50" y="78" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="28" letterSpacing="6" fill="#F43F5E">OS</text>
                </svg>

                <h1 className="text-xl font-semibold tracking-tight !text-zinc-900 mt-3">
                    Store<span className="text-rose-500">OS</span>
                </h1>
                <p className="text-xs text-zinc-400 mt-1 tracking-wide uppercase font-medium">
                    Enterprise POS Terminal
                </p>

                {/* Progress bar */}
                <div className="w-full mt-10 mb-8">
                    <div className="h-[3px] w-full bg-zinc-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-zinc-900 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Boot sequence steps */}
                <div className="w-full space-y-3">
                    {bootSequence.map((step, index) => {
                        const StepIcon = step.icon;
                        const isCompleted = completedSteps.includes(index);
                        const isCurrent = currentStep === index && !isCompleted;

                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-500 ${
                                    isCompleted
                                        ? 'bg-white border-zinc-200 shadow-sm'
                                        : isCurrent
                                        ? 'bg-white border-zinc-300 shadow-md'
                                        : 'bg-transparent border-transparent'
                                }`}
                                style={{
                                    opacity: index <= currentStep ? 1 : 0.3,
                                    transform: index <= currentStep ? 'translateY(0)' : 'translateY(4px)',
                                    transition: 'all 0.4s ease',
                                }}
                            >
                                <div
                                    className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors duration-300 ${
                                        isCompleted
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : isCurrent
                                            ? 'bg-zinc-100 text-zinc-900'
                                            : 'bg-zinc-50 text-zinc-400'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 size={14} strokeWidth={2} />
                                    ) : isCurrent ? (
                                        <StepIcon size={14} strokeWidth={1.5} className="animate-pulse" />
                                    ) : (
                                        <StepIcon size={14} strokeWidth={1.5} />
                                    )}
                                </div>

                                <span
                                    className={`text-xs font-medium transition-colors duration-300 ${
                                        isCompleted
                                            ? 'text-zinc-600'
                                            : isCurrent
                                            ? 'text-zinc-900'
                                            : 'text-zinc-400'
                                    }`}
                                >
                                    {step.label}
                                    {isCurrent && (
                                        <span className="inline-flex ml-1">
                                            <span className="animate-bounce [animation-delay:0ms]">.</span>
                                            <span className="animate-bounce [animation-delay:150ms]">.</span>
                                            <span className="animate-bounce [animation-delay:300ms]">.</span>
                                        </span>
                                    )}
                                    {isCompleted && (
                                        <span className="text-emerald-500 ml-1.5 text-[10px]">✓</span>
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Version footer */}
                <div className="mt-10 text-[10px] text-zinc-400 font-medium tracking-wide uppercase">
                    v2.4.0 • Secure Boot
                </div>
            </div>
        </div>
    );
}
