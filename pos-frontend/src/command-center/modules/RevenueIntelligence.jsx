import { TrendingUp, ArrowUpRight } from "lucide-react"
import { Panel, Counter, Delta } from "../primitives"
import { overview, revenueSeries, revenueByDaypart } from "../data"

export default function RevenueIntelligence() {
  const max = Math.max(...revenueSeries)
  const w = 600
  const h = 160
  const pts = revenueSeries.map((d, i) => {
    const x = (i / (revenueSeries.length - 1)) * w
    const y = h - (d / max) * (h - 20) - 4
    return [x, y]
  })
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")
  const area = `${line} L${w},${h} L0,${h} Z`

  return (
    <Panel className="lg:col-span-2 lg:row-span-2">
      <div className="flex items-start justify-between gap-3 px-6 pt-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/12 text-primary">
              <TrendingUp size={15} strokeWidth={2} />
            </span>
            <h3 className="text-sm font-semibold tracking-tight">Revenue Intelligence</h3>
          </div>
          <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Net revenue · Today</p>
          <div className="mt-1 flex items-baseline gap-3">
            <span className="text-4xl font-semibold tracking-tight">
              <Counter value={overview.netRevenue} prefix="$" />
            </span>
            <Delta value={overview.revenueDelta} />
          </div>
        </div>
        <button className="flex items-center gap-1 rounded-lg border border-border bg-secondary/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
          Details <ArrowUpRight size={13} />
        </button>
      </div>

      {/* Curve */}
      <div className="mt-4 px-2">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-40 w-full">
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#rev-fill)" />
          <path
            d={line}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Daypart breakdown */}
      <div className="grid grid-cols-2 gap-px border-t border-border bg-border sm:grid-cols-4">
        {revenueByDaypart.map((d) => (
          <div key={d.label} className="bg-card px-4 py-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{d.label}</p>
            <p className="mt-1 text-base font-semibold tracking-tight tnum">${(d.value / 1000).toFixed(1)}K</p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-primary/70" style={{ width: `${d.share * 2.2}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  )
}
