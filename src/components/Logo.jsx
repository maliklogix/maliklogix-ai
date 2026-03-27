import React from 'react';

const Logo = ({ size = 40, className = "" }) => {
    return (
        <svg 
            width={size} 
            height={size} 
            viewBox="0 0 100 100" 
            className={`overflow-visible ${className}`}
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Top Arc (Cyan) */}
            <path 
                d="M 15 50 A 35 35 0 0 1 85 50" 
                stroke="#06B6D4" 
                strokeWidth="8" 
                strokeLinecap="round" 
            />
            
            {/* Bottom Arc (Orange) */}
            <path 
                d="M 15 50 A 35 35 0 0 0 85 50" 
                stroke="#F97316" 
                strokeWidth="8" 
                strokeLinecap="round" 
            />

            {/* MLX Text */}
            <text 
                x="50" 
                y="62" 
                textAnchor="middle" 
                fontWeight="900" 
                style={{ 
                    fontSize: '32px', 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.05em'
                }}
            >
                <tspan fill="#06B6D4">M</tspan>
                <tspan fill="#F97316">L</tspan>
                <tspan fill="#06B6D4">X</tspan>
            </text>

            {/* Subtle Glow (Optional) */}
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
        </svg>
    );
};

export default Logo;
