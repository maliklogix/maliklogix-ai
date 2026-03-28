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
    MessageSquare,
    Share2,
    Settings, 
    LogOut,
    Cpu,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dash', end: true },
    { name: 'Live Agent', icon: MessageSquare, href: '/dash/live-agent' },
    { name: 'Blog Posts', icon: FileText, href: '/dash/blog' },
    { name: 'Services', icon: Wrench, href: '/dash/services' },
    { name: 'Newsletter', icon: Mail, href: '/dash/newsletter' },
    { name: 'Leads', icon: Inbox, href: '/dash/leads' },
    { name: 'SEO Manager', icon: Search, href: '/dash/seo' },
    { name: 'Social Media', icon: Share2, href: '/dash/social-media' },
    { name: 'OpenClaw Tools', icon: Brain, href: '/dash/tools' },
    { name: 'Media Library', icon: ImageIcon, href: '/dash/media' },
];

const Sidebar = ({ isOpen, onClose, onToggle }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('ml_admin');
        navigate('/dash/login');
    };

    return (
        <aside className={`
            fixed lg:sticky top-0 left-0 z-[70] h-screen bg-[#0f1117] border-r border-white/5 flex flex-col shrink-0
            transition-all duration-300 ease-in-out
            ${isOpen 
                ? 'w-[260px] translate-x-0' 
                : 'w-[80px] -translate-x-full lg:translate-x-0'}
        `}>
            {/* Brand Header Section (Curved Card) */}
            <div className={`relative px-4 pt-6 pb-8 mb-6 ${isOpen ? '' : 'px-2'}`}>
                <div className={`
                    relative z-10 p-4 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/5 shadow-2xl overflow-hidden
                    ${isOpen ? 'flex flex-col gap-4' : 'flex items-center justify-center aspect-square p-2'}
                `}>
                    {/* Glossy Overlay */}
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 blur-3xl rotate-45 pointer-events-none" />
                    
                    <div className={`flex items-center gap-3 ${isOpen ? '' : 'justify-center'}`}>
                        <div className="w-10 h-10 bg-accent rounded-2xl flex items-center justify-center text-white shadow-xl shadow-accent/30 shrink-0 transform-gpu hover:rotate-3 transition-transform">
                            <Cpu size={22} />
                        </div>
                        {isOpen && (
                            <div className="flex flex-col leading-tight animate-in fade-in slide-in-from-left-2 duration-500">
                                <span className="text-lg font-display font-black text-white tracking-widest uppercase">
                                    Malik<span className="text-accent">Logix</span>
                                </span>
                                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest -mt-0.5">Automating Scale</span>
                            </div>
                        )}
                    </div>

                    {/* Navbar Toggle/Close inside the card (Bottom Aligned when open) */}
                    {isOpen && (
                        <div className="flex items-center justify-between mt-1 pt-4 border-t border-white/5">
                            <button 
                                onClick={onToggle}
                                className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-white transition-colors"
                            >
                                <ChevronLeft size={14} />
                                NAVBAR CLOSE
                            </button>
                            
                            <button 
                                onClick={onClose}
                                className="p-1.5 text-gray-500 hover:text-red-400 bg-white/5 rounded-lg lg:hidden"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* The "Deep Curve" background blob */}
                {isOpen && (
                    <div className="absolute top-0 left-0 w-full h-[120px] bg-accent/5 blur-[80px] rounded-full -translate-y-1/2 opacity-30" />
                )}
            </div>

            {/* Nav List */}
            <nav className="flex-grow px-3 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        end={item.end}
                        onClick={() => window.innerWidth < 1024 && onClose()}
                        className={({ isActive }) => `
                            flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                            ${isActive 
                                ? 'bg-accent text-white shadow-lg shadow-accent/10' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                        `}
                        title={!isOpen ? item.name : ''}
                    >
                        <item.icon size={20} className="shrink-0" />
                        {isOpen && (
                            <span className="whitespace-nowrap animate-in slide-in-from-left-2 fade-in duration-300">
                                {item.name}
                            </span>
                        )}
                        {!isOpen && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[100] border border-white/10 shadow-xl">
                                {item.name}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 mt-auto border-t border-white/5 space-y-1">
                {!isOpen && (
                    <button 
                        onClick={onToggle}
                        className="hidden lg:flex w-full justify-center p-3 text-gray-500 hover:text-white transition-colors"
                        title="Expand Sidebar"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
                
                <NavLink
                    to="/dash/settings"
                    onClick={() => window.innerWidth < 1024 && onClose()}
                    className={({ isActive }) => `
                        flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative
                        ${isActive 
                            ? 'bg-accent text-white' 
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'}
                    `}
                    title={!isOpen ? 'Settings' : ''}
                >
                    <Settings size={20} />
                    {isOpen && <span className="animate-in fade-in duration-300">Settings</span>}
                </NavLink>
                
                <button
                    onClick={handleLogout}
                    className={`
                        w-full flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-0'} py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all duration-200 group relative
                    `}
                    title={!isOpen ? 'Logout' : ''}
                >
                    <LogOut size={20} />
                    {isOpen && <span className="animate-in fade-in duration-300">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
