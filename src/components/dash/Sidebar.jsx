import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    FileText, 
    Wrench, 
    Mail, 
    Inbox, 
    Search, 
    Brain, 
    Image as ImageIcon, 
    Settings, 
    LogOut,
    Cpu
} from 'lucide-react';

const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dash', end: true },
    { name: 'Blog Posts', icon: FileText, href: '/dash/blog' },
    { name: 'Services', icon: Wrench, href: '/dash/services' },
    { name: 'Newsletter', icon: Mail, href: '/dash/newsletter' },
    { name: 'Leads', icon: Inbox, href: '/dash/leads' },
    { name: 'SEO Manager', icon: Search, href: '/dash/seo' },
    { name: 'OpenClaw Tools', icon: Brain, href: '/dash/tools' },
    { name: 'Media Library', icon: ImageIcon, href: '/dash/media' },
];

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('ml_admin');
        navigate('/dash/login');
    };

    return (
        <aside className="w-[260px] bg-[#0f1117] border-r border-white/5 flex flex-col h-screen sticky top-0 shrink-0">
            {/* Logo */}
            <div className="p-8 pb-10">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent/20">
                        <Cpu size={20} />
                    </div>
                    <span className="text-lg font-display font-bold text-white tracking-tight">
                        Malik<span className="text-accent">Logix</span>
                    </span>
                </div>
            </div>

            {/* Nav List */}
            <nav className="flex-grow px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        end={item.end}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
                            ${isActive 
                                ? 'bg-accent text-white shadow-lg shadow-accent/10' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        <item.icon size={18} className="shrink-0" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 mt-auto border-t border-white/5 space-y-1">
                <NavLink
                    to="/dash/settings"
                    className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                        ${isActive 
                            ? 'bg-accent text-white' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                    `}
                >
                    <Settings size={18} />
                    <span>Settings</span>
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all duration-200"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
