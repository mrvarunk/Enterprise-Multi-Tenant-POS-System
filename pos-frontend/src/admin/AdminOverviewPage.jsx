import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DollarSign, ShoppingBag, Users, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { getOrdersByBranch } from '../../redux/features/order/orderThunk';
import { fetchProductsByStore } from '../../redux/features/product/productThunk';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export default function AdminOverviewPage() {
    const dispatch = useDispatch();

    // Extracting global states to compile store-wide analytics data
    const { orders, loading: ordersLoading } = useSelector((state) => state.order);
    const { products, loading: productsLoading } = useSelector((state) => state.product);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user?.branchId) {
            // Fetch raw arrays from backend to compile administrative insights
            dispatch(getOrdersByBranch(user.branchId));
            dispatch(fetchProductsByStore(user.branchId));
        }
    }, [dispatch, user]);

    // 1. Calculate Administrative Metrics dynamically from backend responses
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalTransactions = orders.length;

    // Count unique cashiers who processed orders today
    const uniqueCashiersCount = new Set(orders.map(order => order.cashierId)).size;

    // Filter inventory records matching low stock constraints (under 10 items)
    const lowStockItems = products.filter(product => product.stockQuantity <= 10);
    const lowStockCount = lowStockItems.length;

    // Isolate the 5 most recent orders for the activity ledger panel
    const recentActivityOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    if (ordersLoading || productsLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-300">
            {/* Context Heading */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Dashboard Overview</h1>
                <p className="text-sm text-muted-foreground">Real-time financial performance and inventory synchronization summary metrics.</p>
            </div>

            {/* Core Operational KPI Metrics Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Metric Card: Gross Revenue */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Gross Revenue</span>
                        <div className="p-2 bg-primary/10 text-primary rounded-lg"><DollarSign size={16} /></div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-black tracking-tight">₹{totalRevenue.toFixed(2)}</h2>
                        <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5"><TrendingUp size={12}/> +12%</span>
                    </div>
                </div>

                {/* Metric Card: Total Sales Volumes */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total Transactions</span>
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg"><ShoppingBag size={16} /></div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{totalTransactions}</h2>
                    <p className="text-xs text-muted-foreground">Orders safely compiled in cloud database</p>
                </div>

                {/* Metric Card: Active Operating Terminals */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Active Cashiers</span>
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg"><Users size={16} /></div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{uniqueCashiersCount}</h2>
                    <p className="text-xs text-muted-foreground">Active open session allocations</p>
                </div>

                {/* Metric Card: Stock Warning Intercept Metrics */}
                <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Low Stock Items</span>
                        <div className={`p-2 rounded-lg ${lowStockCount > 0 ? 'bg-destructive/10 text-destructive' : 'bg-emerald-500/10 text-emerald-600'}`}><AlertTriangle size={16} /></div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight">{lowStockCount}</h2>
                    <p className="text-xs text-muted-foreground">{lowStockCount > 0 ? 'Requires immediate reorder restock' : 'Inventory levels stable'}</p>
                </div>
            </div>

            {/* Split Screen Component Breakdown Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COL: Live Recent Sales Activity Roll */}
                <div className="lg:col-span-2 space-y-3 bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="font-bold text-base">Recent Sales Feed</h3>
                            <p className="text-xs text-muted-foreground">Latest transaction sequences processed on this branch infrastructure pipeline.</p>
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Total Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivityOrders.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center text-muted-foreground py-6 text-xs">No transaction records logged.</TableCell>
                                </TableRow>
                            ) : (
                                recentActivityOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-semibold text-xs text-primary">#{order.id}</TableCell>
                                        <TableCell><span className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground font-medium">{order.paymentType}</span></TableCell>
                                        <TableCell className="text-right font-bold text-xs">₹{order.totalAmount.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* RIGHT COL: Real-time System Low Stock Warnings Registry */}
                <div className="space-y-3 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
                    <div className="space-y-3">
                        <div>
                            <h3 className="font-bold text-base flex items-center gap-2">
                                Inventory Warnings
                            </h3>
                            <p className="text-xs text-muted-foreground">Items with stock count volumes currently breaching security minimums.</p>
                        </div>

                        <div className="space-y-2 overflow-y-auto max-h-[220px] pr-1">
                            {lowStockItems.length === 0 ? (
                                <div className="text-center text-xs text-muted-foreground py-12">All variations are well stocked.</div>
                            ) : (
                                lowStockItems.map((product) => (
                                    <div key={product.id} className="flex items-center justify-between p-2 border border-border/60 rounded-xl bg-secondary/20 hover:bg-secondary/40 transition-colors">
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-semibold line-clamp-1">{product.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-mono">{product.barcode}</p>
                                        </div>
                                        <span className="text-xs font-bold px-2 py-0.5 bg-destructive/10 text-destructive rounded-md">
                                            {product.stockQuantity} Left
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}