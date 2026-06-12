import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  LayoutGrid,
  Package,
  Users,
  Search,
  Bell,
  ChevronDown,
  LogOut,
  Command,
} from "lucide-react"

const NAV = [
  { label: "Command", icon: LayoutGrid, path: "/admin" },
  { label: "Inventory", icon: Package, path: "/admin/inventory" },
  { label: "Staff", icon: Users, path: "/admin/employees" },
]

export default function FloatingNav({ onOpenPalette }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [branchOpen, setBranchOpen] = useState(false)

  useEffect(() => {
    const main = document.getElementById("cc-scroll")
    if (!main) return
    const onScroll = () => setScrolled(main.scrollTop > 8)
    main.addEventListener("scroll", onScroll)
    return () => main.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("JWT")
    window.location.href = "/login"
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav
        className={`pointer-events-auto flex w-full max-w-6xl items-center gap-2 rounded-2xl border px-3 py-2 transition-all duration-300 ${
          scrolled
            ? "border-border bg-popover/80 backdrop-blur-xl elev-float"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Brand */}
        <button onClick={() => navigate("/admin")} className="flex items-center gap-2.5 pl-1 pr-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <span className="font-mono text-sm font-bold">M</span>
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">Mise</span>
        </button>

        {/* Branch switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setBranchOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
            All branches
            <ChevronDown size={13} className="text-muted-foreground" />
          </button>
          {branchOpen && (
            <div className="absolute left-0 top-11 w-48 overflow-hidden rounded-xl border border-border bg-popover p-1 elev-float">
              {["All branches", "SoHo", "Flatiron", "Williamsburg", "Tribeca"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBranchOpen(false)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs text-foreground transition-colors hover:bg-accent"
                >
                  {b}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center nav */}
        <div className="mx-auto flex items-center gap-1 rounded-xl bg-secondary/40 p-1">
          {NAV.map((item) => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && <span className="absolute inset-0 rounded-lg bg-card ring-1 ring-border" />}
                <item.icon size={14} className="relative" strokeWidth={1.75} />
                <span className="relative hidden sm:block">{item.label}</span>
              </button>
            )
          })}
        </div>

        {/* Right cluster */}
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Search size={14} />
          <span className="hidden lg:block">Search</span>
          <kbd className="hidden items-center gap-0.5 rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] lg:flex">
            <Command size={9} />K
          </kbd>
        </button>

        <button className="relative grid h-8 w-8 place-items-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-colors hover:text-foreground">
          <Bell size={15} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </button>

        <button
          onClick={handleLogout}
          className="grid h-8 w-8 place-items-center rounded-xl border border-border bg-secondary/60 text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
          title="Sign out"
        >
          <LogOut size={15} strokeWidth={1.75} />
        </button>
      </nav>
    </div>
  )
}
