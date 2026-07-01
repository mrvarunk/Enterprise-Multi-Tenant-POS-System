import { useState } from 'react';
import {
    Coffee,
    Search, Plus, Minus, Trash2, X,
    Clock, User, Send, Hash
} from 'lucide-react';

// ─── Hardcoded Menu Data (matches database-seeds/seed.sql) ───────────
const categories = [
    { id: 'espresso', label: 'Espresso', icon: '☕' },
    { id: 'iced', label: 'Iced Drinks', icon: '🧊' },
    { id: 'tea', label: 'Tea & Matcha', icon: '🍵' },
    { id: 'pastries', label: 'Pastries', icon: '🥐' },
    { id: 'smoothies', label: 'Smoothies', icon: '🥤' },
    { id: 'specials', label: 'Specials', icon: '✨' },
];

const menuItems = [
    // ─── Espresso ───
    { id: 10, name: 'Espresso',     price: 250, category: 'espresso',  prep: '2 min' },
    { id: 11, name: 'Americano',    price: 280, category: 'espresso',  prep: '3 min' },
    { id: 12, name: 'Cappuccino',   price: 340, category: 'espresso',  prep: '4 min' },
    { id: 13, name: 'Latte',        price: 380, category: 'espresso',  prep: '4 min' },
    { id: 14, name: 'Flat White',   price: 360, category: 'espresso',  prep: '3 min' },
    { id: 15, name: 'Mocha',        price: 410, category: 'espresso',  prep: '5 min' },
    { id: 16, name: 'Macchiato',    price: 280, category: 'espresso',  prep: '2 min' },
    { id: 17, name: 'Cortado',      price: 320, category: 'espresso',  prep: '3 min' },
    // ─── Iced Drinks ───
    { id: 20, name: 'Iced Latte',     price: 390, category: 'iced', prep: '3 min' },
    { id: 21, name: 'Cold Brew',      price: 360, category: 'iced', prep: '1 min' },
    { id: 22, name: 'Iced Americano', price: 300, category: 'iced', prep: '2 min' },
    { id: 23, name: 'Frappuccino',    price: 470, category: 'iced', prep: '5 min' },
    { id: 24, name: 'Iced Mocha',     price: 440, category: 'iced', prep: '4 min' },
    // ─── Tea & Matcha ───
    { id: 30, name: 'Matcha Latte', price: 410, category: 'tea', prep: '4 min' },
    { id: 31, name: 'Chai Latte',   price: 350, category: 'tea', prep: '4 min' },
    { id: 32, name: 'Earl Grey',    price: 220, category: 'tea', prep: '3 min' },
    { id: 33, name: 'Iced Matcha',  price: 400, category: 'tea', prep: '3 min' },
    // ─── Pastries ───
    { id: 40, name: 'Butter Croissant',  price: 290, category: 'pastries', prep: '—' },
    { id: 41, name: 'Blueberry Muffin',  price: 320, category: 'pastries', prep: '—' },
    { id: 42, name: 'Banana Bread',      price: 310, category: 'pastries', prep: '—' },
    { id: 43, name: 'Chocolate Brownie', price: 350, category: 'pastries', prep: '—' },
    { id: 44, name: 'Cinnamon Roll',     price: 380, category: 'pastries', prep: '—' },
    { id: 45, name: 'Avocado Toast',     price: 440, category: 'pastries', prep: '—' },
    // ─── Smoothies ───
    { id: 50, name: 'Mango Smoothie',    price: 440, category: 'smoothies', prep: '4 min' },
    { id: 51, name: 'Berry Blast',       price: 460, category: 'smoothies', prep: '4 min' },
    { id: 52, name: 'Green Detox',       price: 420, category: 'smoothies', prep: '4 min' },
    { id: 53, name: 'Strawberry Banana', price: 430, category: 'smoothies', prep: '4 min' },
    // ─── Specials ───
    { id: 60, name: 'Affogato',        price: 440, category: 'specials', prep: '3 min' },
    { id: 61, name: 'Lavender Latte',  price: 420, category: 'specials', prep: '5 min' },
    { id: 62, name: 'Dirty Chai',      price: 410, category: 'specials', prep: '4 min' },
    { id: 63, name: 'Dalgona Coffee',  price: 400, category: 'specials', prep: '5 min' },
    { id: 64, name: 'Rose Latte',      price: 410, category: 'specials', prep: '4 min' },
];

// Hardcoded order ticket items
const orderItems = [
    { id: 1, name: 'Oat Milk Latte',    modifiers: 'Large · Oat Milk · Extra Shot', price: 460, qty: 1 },
    { id: 2, name: 'Cappuccino',         modifiers: 'Medium · Whole Milk',           price: 340, qty: 2 },
    { id: 3, name: 'Butter Croissant',   modifiers: 'Warmed',                        price: 290, qty: 1 },
];

// Modifier options
const modifierGroups = [
    {
        label: 'Size',
        options: [
            { name: 'Small', priceAdd: 0 },
            { name: 'Medium', priceAdd: 30 },
            { name: 'Large', priceAdd: 60 },
        ],
        selected: 'Medium',
    },
    {
        label: 'Milk',
        options: [
            { name: 'Whole Milk', priceAdd: 0 },
            { name: 'Oat Milk', priceAdd: 40 },
            { name: 'Almond Milk', priceAdd: 40 },
            { name: 'Soy Milk', priceAdd: 30 },
            { name: 'Coconut Milk', priceAdd: 40 },
        ],
        selected: 'Oat Milk',
    },
    {
        label: 'Extras',
        options: [
            { name: 'Extra Shot', priceAdd: 50 },
            { name: 'Vanilla Syrup', priceAdd: 30 },
            { name: 'Caramel Syrup', priceAdd: 30 },
            { name: 'Hazelnut Syrup', priceAdd: 30 },
            { name: 'Whipped Cream', priceAdd: 20 },
            { name: 'No Foam', priceAdd: 0 },
        ],
        selected: 'Extra Shot',
    },
];

// ─── Emoji icon map for menu items ───────────────────────────────────
const itemEmoji = {
    espresso: '☕', iced: '🧊', tea: '🍵',
    pastries: '🥐', smoothies: '🥤', specials: '✨',
};

const formatPrice = (price) => {
    return Number.isInteger(price) ? `₹${price}` : `₹${price.toFixed(2)}`;
};

// ─── Component ───────────────────────────────────────────────────────
export default function POSView() {
    const [activeCategory, setActiveCategory] = useState('espresso');
    const [modifierOpen, setModifierOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const filtered = menuItems.filter(i => i.category === activeCategory);

    const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setModifierOpen(true);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#0C0A09] text-zinc-100 font-sans select-none">

            {/* ━━━ LEFT / CENTER — Menu Grid ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <div className="flex flex-1 flex-col overflow-hidden relative">

                {/* Ambient background glow */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.04] blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] rounded-full bg-orange-600/[0.03] blur-[100px] pointer-events-none" />

                {/* ── Top Bar ── */}
                <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0 z-10 bg-[#0C0A09]/80 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        {/* CafeOps Logo */}
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
                            <Coffee size={18} className="text-white" strokeWidth={2.5} />
                        </div>
                        <div>
                            <h1 className="text-base font-bold tracking-tight text-zinc-100 leading-none">
                                Cafe<span className="text-amber-400">Ops</span>
                            </h1>
                            <span className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">POS Terminal</span>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-xs w-full mx-6">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search menu..."
                            readOnly
                            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/40 focus:ring-2 focus:ring-amber-500/10 transition-all"
                        />
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Online</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500">
                            <Clock size={14} />
                            <span className="text-xs font-medium tabular-nums">10:42 AM</span>
                        </div>
                        <div className="flex items-center gap-2 pl-3 border-l border-white/[0.06]">
                            <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <User size={14} className="text-amber-400" />
                            </div>
                            <span className="text-xs font-medium text-zinc-400">Sarah M.</span>
                        </div>
                    </div>
                </header>

                {/* ── Category Pills ── */}
                <div className="flex gap-2 px-6 py-4 overflow-x-auto shrink-0 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                                activeCategory === cat.id
                                    ? 'bg-amber-500 text-zinc-900 shadow-lg shadow-amber-500/25 scale-[1.02]'
                                    : 'bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08] hover:text-zinc-200 hover:border-white/[0.12]'
                            }`}
                        >
                            <span className="text-sm">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* ── Menu Item Grid ── */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-hide">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3">
                        {filtered.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className="group relative flex flex-col p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/[0.05] transition-all duration-300 cursor-pointer text-left active:scale-[0.97]"
                            >
                                {/* Emoji icon */}
                                <div className="w-12 h-12 rounded-xl bg-white/[0.05] flex items-center justify-center mb-4 group-hover:bg-amber-500/10 transition-colors">
                                    <span className="text-2xl">{itemEmoji[item.category]}</span>
                                </div>

                                {/* Name */}
                                <h3 className="text-sm font-semibold text-zinc-200 group-hover:text-zinc-50 transition-colors leading-snug">
                                    {item.name}
                                </h3>

                                {/* Prep time */}
                                <span className="text-[10px] text-zinc-600 font-medium mt-1 tracking-wide flex items-center gap-1">
                                    <Clock size={10} />
                                    {item.prep}
                                </span>

                                {/* Price + Add */}
                                <div className="flex items-end justify-between mt-auto pt-4">
                                    <span className="text-lg font-bold text-amber-400 tabular-nums tracking-tight">
                                        {formatPrice(item.price)}
                                    </span>
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                                        <Plus size={16} className="text-amber-400" />
                                    </div>
                                </div>

                                {/* Hover border glow */}
                                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.04] group-hover:ring-amber-500/20 transition-all pointer-events-none" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ━━━ RIGHT — Order Ticket Sidebar ━━━━━━━━━━━━━━━━━━━━━━ */}
            <aside className="w-[340px] shrink-0 flex flex-col bg-[#131110] border-l border-white/[0.06] relative">

                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                            <Hash size={16} className="text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold text-zinc-100">Order #047</h2>
                            <span className="text-[10px] text-zinc-600 font-medium">Dine-in · Table 3</span>
                        </div>
                    </div>
                    <span className="bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg">
                        {orderItems.reduce((s, i) => s + i.qty, 0)} items
                    </span>
                </div>

                {/* Order Items List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-hide">
                    {orderItems.map(item => (
                        <div
                            key={item.id}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] group hover:border-white/[0.1] transition-all"
                        >
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[13px] font-semibold text-zinc-200 leading-snug">{item.name}</h4>
                                <p className="text-[11px] text-zinc-500 mt-0.5 font-medium">{item.modifiers}</p>
                            </div>

                            {/* Quantity control */}
                            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-lg p-0.5 shrink-0">
                                <button className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08] transition-colors cursor-pointer">
                                    <Minus size={12} strokeWidth={2.5} />
                                </button>
                                <span className="w-5 text-center text-xs font-bold text-zinc-200 tabular-nums">{item.qty}</span>
                                <button className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.08] transition-colors cursor-pointer">
                                    <Plus size={12} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Price */}
                            <div className="flex flex-col items-end shrink-0">
                                <span className="text-sm font-bold text-zinc-200 tabular-nums">{formatPrice(item.price * item.qty)}</span>
                                <button className="mt-1 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Footer */}
                <div className="border-t border-white/[0.06] bg-[#131110] shrink-0">
                    {/* Totals */}
                    <div className="px-5 pt-4 pb-3 space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-zinc-500">Subtotal</span>
                            <span className="text-zinc-300 tabular-nums">{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-xs font-medium">
                            <span className="text-zinc-500">Tax (8%)</span>
                            <span className="text-zinc-300 tabular-nums">{formatPrice(tax)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-dashed border-white/[0.08]">
                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Total</span>
                            <span className="text-xl font-black text-amber-400 tabular-nums tracking-tight">
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 px-4 pb-3">
                        <button className="py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:text-zinc-200 transition-all cursor-pointer">
                            <Trash2 size={13} className="inline mr-1.5 -mt-0.5" />
                            Void
                        </button>
                        <button className="py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:text-zinc-200 transition-all cursor-pointer">
                            <Clock size={13} className="inline mr-1.5 -mt-0.5" />
                            Hold
                        </button>
                    </div>

                    {/* Primary CTA */}
                    <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-900 font-black text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2.5 hover:from-amber-400 hover:to-orange-400 transition-all cursor-pointer shadow-[0_-4px_20px_rgba(245,158,11,0.15)] active:scale-[0.99]">
                        <Send size={16} strokeWidth={2.5} />
                        Send to Kitchen
                    </button>
                </div>
            </aside>

            {/* ━━━ MODIFIER SLIDE-OUT PANEL ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {modifierOpen && (
                <div className="fixed inset-0 z-50 flex items-stretch justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setModifierOpen(false)}
                    />

                    {/* Panel */}
                    <div className="relative w-full max-w-md bg-[#131110] border-l border-white/[0.08] flex flex-col shadow-2xl z-10 animate-slide-in-right">

                        {/* Panel Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-100">
                                    {selectedItem?.name || 'Customize'}
                                </h2>
                                <span className="text-xs text-zinc-500 font-medium">Customize your drink</span>
                            </div>
                            <button
                                onClick={() => setModifierOpen(false)}
                                className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.1] transition-all cursor-pointer"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Modifier Groups */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {modifierGroups.map(group => (
                                <div key={group.label}>
                                    <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">
                                        {group.label}
                                    </h3>
                                    <div className="grid grid-cols-2 gap-2">
                                        {group.options.map(opt => {
                                            const isSelected = opt.name === group.selected;
                                            return (
                                                <button
                                                    key={opt.name}
                                                    className={`relative flex flex-col items-start p-3.5 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                                                        isSelected
                                                            ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/20'
                                                            : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.12]'
                                                    }`}
                                                >
                                                    <span className={`text-xs font-semibold ${isSelected ? 'text-amber-300' : 'text-zinc-300'}`}>
                                                        {opt.name}
                                                    </span>
                                                    {opt.priceAdd > 0 && (
                                                        <span className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-amber-500/70' : 'text-zinc-600'}`}>
                                                            +{formatPrice(opt.priceAdd)}
                                                        </span>
                                                    )}
                                                    {opt.priceAdd === 0 && (
                                                        <span className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-amber-500/70' : 'text-zinc-600'}`}>
                                                            Included
                                                        </span>
                                                    )}

                                                    {/* Selection indicator */}
                                                    {isSelected && (
                                                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                                                            <svg className="w-2.5 h-2.5 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Panel Footer */}
                        <div className="border-t border-white/[0.06] p-5 shrink-0 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-zinc-500 font-medium">Item Total</span>
                                <span className="text-lg font-bold text-amber-400 tabular-nums">
                                    {formatPrice((selectedItem?.price || 0) + 120)}
                                </span>
                            </div>

                            {/* Quantity selector */}
                            <div className="flex items-center gap-3 justify-center py-2">
                                <button className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.1] transition-all cursor-pointer">
                                    <Minus size={16} />
                                </button>
                                <span className="w-10 text-center text-lg font-black text-zinc-100 tabular-nums">1</span>
                                <button className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.1] transition-all cursor-pointer">
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={() => setModifierOpen(false)}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-900 font-bold text-sm uppercase tracking-wider hover:from-amber-400 hover:to-orange-400 transition-all cursor-pointer shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <Plus size={16} strokeWidth={2.5} />
                                Add to Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
