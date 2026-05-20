import React from 'react';

export const AboutScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#111]">
      <div className="absolute inset-0"
           style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[600px] md:h-[900px] bg-white/[0.03] blur-[150px] rounded-full" />
      <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-white/[0.02] blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
};
