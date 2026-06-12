import { GitCompareArrows } from "lucide-react"
import { Panel, Sparkline, Delta } from "../primitives"
import { branches } from "../data"

export default function BranchComparison() {
  const maxRev = Math.max(...branches.map((b) => b.revenue))
  return (
    <Panel className="lg:col-span-2">
      <div className="flex items-center gap-2.5 px-5 pt-5">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-muted-foreground">
          <GitCompareArrows size={15} strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="text-sm font-semibold tracking-tight">Branch Comparison</h3>
          <p className="text-xs text-muted-foreground">Revenue · 7-day trend · occupancy</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-px border-t border-border bg-border sm:grid-cols-2">
        {branches.map((b) => {
          const positive = b.delta >= 0
          return (
            <div key={b.name} className="bg-card px-5 py-4 transition-colors hover:bg-accent/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{b.name}</p>
                  <p className="mt-0.5 text-lg font-semibold tracking-tight tnum">
                    ${(b.revenue / 1000).toFixed(1)}K
                  </p>
                </div>
                <Delta value={b.delta} />
              </div>

              <div className="mt-2 h-9">
                <Sparkline
                  data={b.series}
                  height={36}
                  stroke={positive ? "var(--color-success)" : "var(--color-destructive)"}
                />
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary/60" style={{ width: `${b.occupancy}%` }} />
                </div>
                <span className="text-[11px] text-muted-foreground tnum">{b.occupancy}% occ.</span>
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
