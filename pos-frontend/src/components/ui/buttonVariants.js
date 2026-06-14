import { cva } from "class-variance-authority"

export const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus:outline-none disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
    {
        variants: {
            variant: {
                default: "bg-zinc-900 text-white hover:bg-zinc-800 rounded-lg shadow-md",
                destructive: "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 rounded-lg shadow-sm",
                outline: "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 rounded-lg shadow-sm",
                secondary: "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 rounded-lg shadow-sm",
                ghost: "bg-transparent hover:bg-zinc-50 rounded-lg",
                link: "text-zinc-900 underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4",
                sm: "h-9 px-3 text-xs",
                lg: "h-11 px-6 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

