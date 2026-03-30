import React from 'react';

const Loader = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center w-full z-10 bg-[var(--background)]">
            <div className="relative flex items-center justify-center">
                {/* Outer spinning ring */}
                <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                
                {/* Inner glowing core */}
                <div className="absolute w-8 h-8 bg-[var(--primary)]/20 rounded-full blur-[8px] animate-pulse"></div>
            </div>
        </div>
    );
};

export default Loader;
