
import React, { memo } from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
  color?: string;
}

export const Logo: React.FC<LogoProps> = memo(({ className = "w-10 h-10", glow = true, color = '#ffffff' }) => {
  return (
    <div className={`relative inline-block ${className} gpu-layer animate-logo-entry`}>
      {glow && (
        <div className="absolute inset-0 blur-xl rounded-full opacity-50 animate-pulse pointer-events-none" style={{ backgroundColor: color + '66' }}></div>
      )}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 contain-paint"
      >
        {/* Shield Geometry */}
        <path
          d="M10 20 L50 35 L90 20 L85 65 L50 95 L15 65 Z"
          fill={color}
        />
        
        {/* Mask/Eyes Detail - Independently Animated */}
        <g className="animate-mask-entry">
          <path
            d="M25 50 C32 45 42 48 45 52 C40 58 30 58 25 54 Z"
            fill="black"
          />
          <path
            d="M75 50 C68 45 58 48 55 52 C60 58 70 58 75 54 Z"
            fill="black"
          />
        </g>
      </svg>
    </div>
  );
});