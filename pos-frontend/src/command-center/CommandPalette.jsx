import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Command,
  Search,
  TrendingUp,
  Package,
  Users,
  GitCompareArrows,
  Sparkles,
  Activity,
  Plus,
  ArrowRight,
} from "lucide-react"

const ACTIONS = [
  { group: "Modules", label: "Revenue Intelligence", icon: TrendingUp, hint: "Jump to revenue" },
  { group: "Modules", label: "Live Orders Pipeline", icon: Activity, hint: "Open pipeline" },
  { group: "Modules", label: "Inventory Health", icon: Package, hint: "Stock levels" },
  { group: "Modules", label: "Staff Performance", icon: Users, hint: "Team leaderboard" },
  { group: "Modules", label: "Branch Comparison", icon: GitCompareArrows, hint: "Across locations" },
  { group: "Modules", label: "AI Insights", icon: Sparkles, hint: "Recommendations" },
  { group: "Actions", label: "New manual order", icon: Plus, hint: "Create order" },
  { group: "Actions", label: "Draft inventory reorder", icon: Package, hint: "Auto-draft PO" },
]

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [setOpen])

  useEffect(() => {
    if (!open) setQuery("")
  }, [open])

  if (!open) return null

  const filtered = ACTIONS.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()))
  const groups = [...new Set(filtered.map((a) => a.group))]

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm animate-fade-in-up" />
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-popover elev-float animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search size={16} className="text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search modules, run an action…"
            className="h-14 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">No results for “{query}”</p>
          )}
          {groups.map((group) => (
            <div key={group} className="mb-1">
              <p className="px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {group}
              </p>
              {filtered
                .filter((a) => a.group === group)
                .map((a) => (
                  <button
                    key={a.label}
                    onClick={() => {
                      navigate("/admin")
                      setOpen(false)
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-accent"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-secondary text-muted-foreground group-hover:text-foreground">
                      <a.icon size={15} strokeWidth={1.75} />
                    </span>
                    <span className="flex-1">{a.label}</span>
                    <span className="text-xs text-muted-foreground">{a.hint}</span>
                    <ArrowRight size={14} className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Command size={11} /> Command Center
          </span>
          <span>Navigate with ↑ ↓ · Enter to select</span>
        </div>
      </div>
    </div>
  )
}
