import { ShoppingBag, Receipt, Percent } from "lucide-react"
import { Counter, Delta } from "./primitives"
import { overview } from "./data"
import RevenueIntelligence from "./modules/RevenueIntelligence"
import LiveOrdersPipeline from "./modules/LiveOrdersPipeline"
import InventoryHealth from "./modules/InventoryHealth"
import StaffPerformance from "./modules/StaffPerformance"
import BranchComparison from "./modules/BranchComparison"
import AiInsights from "./modules/AiInsights"

const today = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
})

const miniStats = [
  { label: "Orders today", value: overview.orders, delta: overview.ordersDelta, icon: ShoppingBag, decimals: 0, prefix: "" },
  { label: "Avg. ticket", value: overview.avgTicket, delta: overview.avgTicketDelta, icon: Receipt, decimals: 2, prefix: "$" },
  { label: "Labor ratio", value: overview.laborRatio, delta: overview.laborDelta, icon: Percent, decimals: 1, prefix: "", suffix: "%" },
]

export default function CommandCenterPage() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Command Center</p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Good evening, Operations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">{today} · 4 branches operating</p>
        </div>

        {/* Mini KPI strip */}
        <div className="grid grid-cols-3 gap-2">
          {miniStats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card px-3.5 py-2.5 elev-card">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <s.icon size={12} strokeWidth={1.75} />
                <span className="text-[10px] uppercase tracking-wider">{s.label}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-base font-semibold tracking-tight">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </span>
                <Delta value={s.delta} className="scale-90" />
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Bento grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <RevenueIntelligence />
        <InventoryHealth />
        <StaffPerformance />
        <LiveOrdersPipeline />
        <BranchComparison />
        <AiInsights />
      </div>
    </div>
  )
}
