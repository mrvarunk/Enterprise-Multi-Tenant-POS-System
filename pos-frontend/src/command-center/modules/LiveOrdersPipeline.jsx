import { Activity } from "lucide-react"
import { Panel } from "../primitives"
import { liveOrders, ordersPipeline } from "../data"

const stageTone = {
  Fired: "bg-warning/15 text-warning",
  Cooking: "bg-warning/15 text-warning",
  Plating: "bg-primary/15 text-primary",
  Ready: "bg-success/15 text-success",
  Served: "bg-muted text-muted-foreground",
}

const toneBar = {
  muted: "bg-muted-foreground",
  warning: "bg-warning",
  primary: "bg-primary",
  success: "bg-success",
}

export default function LiveOrdersPipeline() {
  return (
    <Panel className="lg:col-span-2">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-muted-foreground">
            <Activity size={15} strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Live Orders Pipeline</h3>
            <p className="text-xs text-muted-foreground">Real-time across all branches</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-success/12 px-2.5 py-1 text-xs font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-dot" />
          Live
        </span>
      </div>

      {/* Pipeline stages */}
      <div className="mt-4 grid grid-cols-4 gap-2 px-5">
        {ordersPipeline.map((s) => (
          <div key={s.stage} className="rounded-xl border border-border bg-secondary/30 px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${toneBar[s.tone]}`} />
              <span className="text-[11px] text-muted-foreground">{s.stage}</span>
            </div>
            <p className="mt-1 text-xl font-semibold tracking-tight tnum">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Order rows */}
      <div className="mt-3 divide-y divide-border border-t border-border">
        {liveOrders.map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-accent/40"
          >
            <span className="w-12 font-mono text-xs text-muted-foreground">#{o.id}</span>
            <span className="w-28 truncate text-xs font-medium">{o.branch}</span>
            <span className="hidden w-20 text-xs text-muted-foreground sm:block">{o.channel}</span>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${stageTone[o.stage]}`}>
              {o.stage}
            </span>
            <span className="ml-auto w-12 text-right text-xs text-muted-foreground tnum">{o.elapsed}</span>
            <span className="w-20 text-right text-sm font-semibold tnum">${o.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}
