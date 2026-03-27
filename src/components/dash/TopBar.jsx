import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const TopBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Map path to title
    const getTitle = () => {
        const path = location.pathname;
        if (path === '/dash') return 'Overview';
        if (path.startsWith('/dash/blog')) return 'Blog Management';
        if (path.startsWith('/dash/services')) return 'Service Manager';
        if (path.startsWith('/dash/newsletter')) return 'Newsletter';
        if (path.startsWith('/dash/leads')) return 'Leads Inbox';
        if (path.startsWith('/dash/seo')) return 'SEO Manager';
        if (path.startsWith('/dash/tools')) return 'OpenClaw Tools';
        if (path.startsWith('/dash/media')) return 'Media Library';
        if (path.startsWith('/dash/settings')) return 'Settings';
        return 'Dashboard';
    };

    const handleLogout = () => {
        sessionStorage.removeItem('ml_admin');
        navigate('/dash/login');
    };

    return (
        <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
            <h1 className="text-xl font-display font-bold text-gray-900">{getTitle()}</h1>

            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-accent transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-100 mx-1"></div>

                {/* User Info */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-xs font-bold text-gray-900 leading-none">Malik Farooq</span>
                        <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-1">Super Admin</span>
                    </div>
                    <div className="w-10 h-10 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center text-accent font-bold">
                        MF
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
};

export default TopBar;
