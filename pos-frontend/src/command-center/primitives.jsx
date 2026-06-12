import { useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

// ---- Animated counter ---------------------------------------------------
export function Counter({ value, prefix = "", suffix = "", decimals = 0, className }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const duration = 1100
          const start = performance.now()
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setDisplay(value * eased)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [value])

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={cn("tnum tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

// ---- Delta pill ---------------------------------------------------------
export function Delta({ value, className }) {
  const positive = value >= 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tnum",
        positive
          ? "bg-success/12 text-success"
          : "bg-destructive/12 text-destructive",
        className,
      )}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" className={positive ? "" : "rotate-180"} aria-hidden="true">
        <path d="M5 1.5 L9 7 L1 7 Z" fill="currentColor" />
      </svg>
      {Math.abs(value).toFixed(1)}%
    </span>
  )
}

// ---- Sparkline ----------------------------------------------------------
export function Sparkline({ data, className, stroke = "var(--color-primary)", fill = true, height = 40 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 100
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = height - ((d - min) / range) * height
    return [x, y]
  })
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(" ")
  const area = `${line} L${w},${height} L0,${height} Z`
  const gid = `spark-${Math.random().toString(36).slice(2, 8)}`

  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className={cn("w-full", className)} style={{ height }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.28" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={line} fill="none" stroke={stroke} strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// ---- Panel (bento surface) ---------------------------------------------
export function Panel({ className, children, interactive = true, ...props }) {
  return (
    <section
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-card elev-card",
        interactive && "transition-all duration-300 hover:border-border/0 hover:ring-1 hover:ring-primary/20",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export function PanelHeader({ title, hint, icon: Icon, action }) {
  return (
    <div className="flex items-start justify-between gap-3 px-5 pt-5">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent text-muted-foreground">
            <Icon size={15} strokeWidth={1.75} />
          </span>
        )}
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}
