import { Package, AlertTriangle } from "lucide-react"
import { Panel } from "../primitives"
import { inventory } from "../data"

const trendMeta = {
  critical: { bar: "bg-destructive", label: "Critical", text: "text-destructive" },
  falling: { bar: "bg-warning", label: "Low", text: "text-warning" },
  stable: { bar: "bg-success", label: "Healthy", text: "text-success" },
}

export default function InventoryHealth() {
  const critical = inventory.filter((i) => i.trend === "critical" || i.level / i.par < 0.3).length

  return (
    <Panel>
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-muted-foreground">
            <Package size={15} strokeWidth={1.75} />
          </span>
          <div>
            <h3 className="text-sm font-semibold tracking-tight">Inventory Health</h3>
            <p className="text-xs text-muted-foreground">vs. par levels</p>
          </div>
        </div>
        {critical > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-destructive/12 px-2.5 py-1 text-xs font-medium text-destructive">
            <AlertTriangle size={12} /> {critical} critical
          </span>
        )}
      </div>

      <div className="mt-4 space-y-3 px-5 pb-5">
        {inventory.map((item) => {
          const pct = Math.round((item.level / item.par) * 100)
          const meta = trendMeta[item.trend] || trendMeta.stable
          return (
            <div key={item.name}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className={`tnum ${meta.text}`}>
                  {item.level}
                  <span className="text-muted-foreground">/{item.par} {item.unit}</span>
                </span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full ${meta.bar} transition-all duration-700`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </Panel>
  )
}
