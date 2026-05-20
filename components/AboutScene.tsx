import React from 'react';

export const AboutScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
      <div className="absolute inset-0"
           style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-white/[0.02] blur-[120px] rounded-full" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
};
