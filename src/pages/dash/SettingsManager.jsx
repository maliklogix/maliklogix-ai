import React, { useState, useEffect } from 'react';
import { Save, Shield, Bell, User, Globe, Mail, Lock, Database, Loader2, Code as CodeIcon } from 'lucide-react';
import { useToast } from '../../components/dash/Toast';
import HeaderScripts from '../../components/dash/HeaderScripts';

const SettingsManager = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        siteName: 'MalikLogix',
        adminEmail: 'admin@maliklogix.com',
        maintenanceMode: false,
        enableNotifications: true,
        defaultLanguage: 'en',
        databaseBackup: 'daily'
    });

    const handleSave = async () => {
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            setSaving(false);
            showToast('Settings updated successfully!');
        }, 1000);
    };

    const tabs = [
        { id: 'general', label: 'General Configuration', icon: <Globe size={18} /> },
        { id: 'scripts', label: 'Header Scripts', icon: <CodeIcon size={18} /> },
    ];

    return (
        <div className="space-y-8 pb-20 text-black">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900">Admin Settings</h2>
                    <p className="text-sm text-gray-500 mt-1">Configure your dashboard and system preferences</p>
                </div>
                {activeTab === 'general' && (
                    <button 
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 text-sm disabled:opacity-50"
                    >
                        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save size={18} />} Save All
                    </button>
                )}
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100 gap-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all relative ${
                            activeTab === tab.id ? 'text-accent' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {activeTab === 'general' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
                    <div className="lg:col-span-2 space-y-6">
                        {/* General Settings */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                <Globe className="text-accent" size={20} />
                                <h3 className="font-display font-bold text-lg">General Configuration</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Site Name</label>
                                    <input 
                                        type="text" 
                                        value={settings.siteName}
                                        onChange={(e) => setSettings(s => ({...s, siteName: e.target.value}))}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Admin Email</label>
                                    <input 
                                        type="email" 
                                        value={settings.adminEmail}
                                        onChange={(e) => setSettings(s => ({...s, adminEmail: e.target.value}))}
                                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-accent/20 outline-none"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Security & Access */}
                        <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                                <Shield className="text-accent" size={20} />
                                <h3 className="font-display font-bold text-lg">Security & Privacy</h3>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Maintenance Mode</p>
                                        <p className="text-xs text-gray-500">Public site will show "Coming Soon" page</p>
                                    </div>
                                    <button 
                                        onClick={() => setSettings(s => ({...s, maintenanceMode: !s.maintenanceMode}))}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.maintenanceMode ? 'bg-accent' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.maintenanceMode ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">System Notifications</p>
                                        <p className="text-xs text-gray-500">Receive alerts about new leads and signups</p>
                                    </div>
                                    <button 
                                        onClick={() => setSettings(s => ({...s, enableNotifications: !s.enableNotifications}))}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${settings.enableNotifications ? 'bg-accent' : 'bg-gray-300'}`}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.enableNotifications ? 'right-1' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        {/* System Info */}
                        <div className="bg-[#0f1117] p-8 rounded-3xl text-white relative overflow-hidden group">
                            <Database className="absolute bottom-[-10px] right-[-10px] w-24 h-24 text-white/5 group-hover:scale-110 transition-transform" />
                            <h4 className="font-bold mb-4 flex items-center gap-2">
                                <Database size={18} className="text-accent" /> System Stats
                            </h4>
                            <div className="space-y-3">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Environment</span>
                                    <span className="text-green-400 font-mono">Production</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Node Version</span>
                                    <span className="text-white font-mono">v18.17.1</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">Database</span>
                                    <span className="text-white font-mono">MySQL 8.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Help */}
                        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                            <h4 className="text-sm font-bold text-gray-900 mb-3">Need Help?</h4>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">
                                If you're having issues with system configuration, please contact MalikLogix technical support.
                            </p>
                            <a href="mailto:support@maliklogix.com" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                                <Mail size={14} /> support@maliklogix.com
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in slide-in-from-right duration-500">
                    <HeaderScripts />
                </div>
            )}
        </div>
    );
};

export default SettingsManager;
