import React, { useState } from 'react';
import { Cpu, Lock, Mail, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ADMIN_EMAIL = 'admin@maliklogix.com';
const ADMIN_PASSWORD = 'maliklogix2026';

const DashLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate network delay
        setTimeout(() => {
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('ml_admin', 'true');
                navigate('/dash');
            } else {
                setError('Invalid email or password');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-accent/20">
                        <Cpu size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white tracking-tight">
                        Malik<span className="text-accent">Logix</span> Control
                    </h1>
                    <p className="text-gray-500 mt-2">Sign in to manage your digital empire</p>
                </div>

                <div className="bg-[#1a1d27] border border-white/5 rounded-3xl p-8 shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@maliklogix.com"
                                    className="w-full bg-[#0f1117] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[#0f1117] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent hover:bg-accent/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                'Access Dashboard'
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-gray-600 text-sm mt-8">
                    &copy; 2026 MalikLogix Systems Inc.
                </p>
            </div>
        </div>
    );
};

export default DashLogin;
