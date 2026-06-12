import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/features/auth/authThunk';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading, error, user } = useSelector((state) => state.auth);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    // Navigate to dashboard after successful login
    useEffect(() => {
        if (user && user.role) {
            if (user.role === 'ROLE_BRANCH_CASHIER' || user.role === 'ROLE_CASHIER') {
                navigate('/cashier/dashboard');
            } else if (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STORE_MANAGER') {
                navigate('/admin');
            }
        }
    }, [user, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-zinc-950">
            <div className="w-full max-w-md space-y-6 rounded-2xl bg-card p-8 shadow-xl border border-border">

                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <ShoppingCart className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Terminal Access</h1>
                    <p className="text-sm text-muted-foreground">Sign in to initialize your POS system session</p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20 font-medium">
                        <AlertCircle size={14} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Operator Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="cashier@store.com"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-foreground">Passcode</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="••••••••"
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full py-2.5 font-bold" disabled={loading}>
                        {loading ? 'Validating Session...' : 'Open Terminal Session'}
                    </Button>
                </form>
            </div>
        </div>
    );
}