// ============================================================
// Command Center — operational data layer
// In production these feed from the Spring backend (orders,
// products, branches, staff). Shaped here for the executive view.
// ============================================================

export const overview = {
  netRevenue: 1284690,
  revenueDelta: 12.4,
  orders: 8421,
  ordersDelta: 6.8,
  avgTicket: 152.6,
  avgTicketDelta: 3.1,
  laborRatio: 24.8,
  laborDelta: -1.4,
}

// 24-point intraday revenue curve (hourly), in thousands
export const revenueSeries = [
  18, 14, 9, 6, 5, 7, 12, 22, 38, 52, 61, 74, 88, 79, 66, 58, 64, 82, 104,
  121, 113, 96, 71, 44,
]

export const revenueByDaypart = [
  { label: "Breakfast", value: 184200, share: 14 },
  { label: "Lunch", value: 502800, share: 39 },
  { label: "Dinner", value: 498100, share: 38 },
  { label: "Late night", value: 99590, share: 9 },
]

export const liveOrders = [
  { id: "4821", branch: "SoHo", items: 4, total: 168.5, channel: "Dine-in", stage: "Fired", elapsed: "2m", server: "A. Reyes" },
  { id: "4820", branch: "Flatiron", items: 2, total: 54.0, channel: "Pickup", stage: "Plating", elapsed: "5m", server: "M. Cole" },
  { id: "4819", branch: "Williamsburg", items: 7, total: 312.75, channel: "Dine-in", stage: "Cooking", elapsed: "8m", server: "J. Park" },
  { id: "4818", branch: "SoHo", items: 1, total: 22.0, channel: "Delivery", stage: "Ready", elapsed: "11m", server: "—" },
  { id: "4817", branch: "Tribeca", items: 5, total: 241.0, channel: "Dine-in", stage: "Served", elapsed: "14m", server: "D. Singh" },
  { id: "4816", branch: "Flatiron", items: 3, total: 96.25, channel: "Pickup", stage: "Ready", elapsed: "16m", server: "M. Cole" },
]

export const ordersPipeline = [
  { stage: "Incoming", count: 12, tone: "muted" },
  { stage: "Cooking", count: 28, tone: "warning" },
  { stage: "Plating", count: 9, tone: "primary" },
  { stage: "Ready", count: 6, tone: "success" },
]

export const inventory = [
  { name: "Wagyu Striploin", level: 12, par: 40, unit: "kg", trend: "falling" },
  { name: "Burrata", level: 64, par: 80, unit: "ea", trend: "stable" },
  { name: "San Marzano Tomato", level: 88, par: 90, unit: "cs", trend: "stable" },
  { name: "Truffle Oil", level: 6, par: 24, unit: "btl", trend: "critical" },
  { name: "Sourdough Levain", level: 31, par: 50, unit: "kg", trend: "falling" },
]

export const staff = [
  { name: "Ava Reyes", role: "Lead Server", branch: "SoHo", sales: 8420, covers: 62, score: 96 },
  { name: "Marco Cole", role: "Server", branch: "Flatiron", sales: 6210, covers: 48, score: 91 },
  { name: "Jin Park", role: "Server", branch: "Williamsburg", sales: 5980, covers: 51, score: 88 },
  { name: "Dev Singh", role: "Server", branch: "Tribeca", sales: 5410, covers: 44, score: 84 },
]

export const branches = [
  { name: "SoHo", revenue: 412800, delta: 14.2, occupancy: 92, series: [40, 52, 61, 58, 70, 82, 96] },
  { name: "Flatiron", revenue: 358100, delta: 8.1, occupancy: 81, series: [38, 44, 50, 47, 55, 62, 71] },
  { name: "Williamsburg", revenue: 301500, delta: 21.6, occupancy: 88, series: [22, 30, 41, 52, 60, 68, 79] },
  { name: "Tribeca", revenue: 212290, delta: -3.4, occupancy: 64, series: [48, 44, 41, 38, 36, 33, 31] },
]

export const aiInsights = [
  {
    tone: "opportunity",
    title: "Shift two servers to Williamsburg dinner",
    body: "Williamsburg is pacing +21% with 88% occupancy while Tribeca runs at 64%. Reallocating covers could capture an estimated $4.2K tonight.",
  },
  {
    tone: "risk",
    title: "Truffle oil will stock out by Thursday",
    body: "Consumption is up 34% week-over-week. Current par covers 1.8 days. Auto-draft a reorder of 18 bottles?",
  },
  {
    tone: "trend",
    title: "Lunch ticket size climbing chain-wide",
    body: "Average lunch ticket rose to $152, led by the new prix-fixe. Consider extending the offer to dinner at Flatiron.",
  },
]
