import { useState } from "react"
import { Outlet } from "react-router-dom"
import FloatingNav from "./FloatingNav"
import CommandPalette from "./CommandPalette"

export default function CommandCenterLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Ambient depth: copper glow + grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4]" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)" }}
      />

      <FloatingNav onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <main id="cc-scroll" className="relative h-full overflow-y-auto px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
