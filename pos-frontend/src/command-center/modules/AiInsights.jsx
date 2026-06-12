import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react"
import { Panel } from "../primitives"
import { aiInsights } from "../data"

const toneMeta = {
  opportunity: { icon: TrendingUp, ring: "ring-success/25", chip: "bg-success/12 text-success", label: "Opportunity" },
  risk: { icon: AlertTriangle, ring: "ring-destructive/25", chip: "bg-destructive/12 text-destructive", label: "Risk" },
  trend: { icon: Lightbulb, ring: "ring-primary/25", chip: "bg-primary/12 text-primary", label: "Trend" },
}

export default function AiInsights() {
  return (
    <Panel className="lg:col-span-2 copper-glow" interactive={false}>
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
            <Sparkles size={15} strokeWidth={2} />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">AI Insights</h3>
            <p className="text-xs text-muted-foreground">Generated from live operations</p>
          </div>
        </div>
        <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          Beta
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 px-5 pb-5 md:grid-cols-3">
        {aiInsights.map((ins) => {
          const meta = toneMeta[ins.tone]
          return (
            <div
              key={ins.title}
              className={`flex flex-col rounded-xl border border-border bg-secondary/25 p-4 ring-1 ring-inset ${meta.ring} transition-colors hover:bg-secondary/40`}
            >
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${meta.chip}`}>
                  <meta.icon size={11} /> {meta.label}
                </span>
              </div>
              <p className="mt-2.5 text-sm font-medium leading-snug text-balance">{ins.title}</p>
              <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">{ins.body}</p>
              <button className="mt-3 flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-copper-bright">
                Take action <ArrowRight size={12} />
              </button>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
