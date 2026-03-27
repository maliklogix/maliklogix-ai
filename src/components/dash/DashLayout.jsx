import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DashLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50/50">
            {/* Fixed Sidebar */}
            <Sidebar />

            <div className="flex-grow flex flex-col min-w-0">
                {/* Fixed TopBar */}
                <TopBar />

                {/* Main Content Scrollable Area */}
                <main className="p-8 flex-grow overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashLayout;
