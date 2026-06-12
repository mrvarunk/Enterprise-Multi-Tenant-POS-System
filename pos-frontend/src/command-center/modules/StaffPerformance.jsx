import { Users } from "lucide-react"
import { Panel } from "../primitives"
import { staff } from "../data"

export default function StaffPerformance() {
  const top = staff[0]
  return (
    <Panel>
      <div className="flex items-center gap-2.5 px-5 pt-5">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-muted-foreground">
          <Users size={15} strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Staff Performance</h3>
          <p className="text-xs text-muted-foreground">Today’s leaderboard</p>
        </div>
      </div>

      <div className="mt-4 space-y-1 px-3 pb-5">
        {staff.map((s, i) => (
          <div
            key={s.name}
            className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-accent/40"
          >
            <span
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg text-xs font-semibold tnum ${
                i === 0 ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{s.name}</p>
              <p className="truncate text-[11px] text-muted-foreground">
                {s.role} · {s.branch}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold tnum">${s.sales.toLocaleString()}</p>
              <p className="text-[11px] text-muted-foreground tnum">{s.covers} covers</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        <span className="text-foreground font-medium">{top.name}</span> leads with a{" "}
        <span className="text-primary tnum">{top.score}</span> performance score
      </div>
    </Panel>
  )
}
