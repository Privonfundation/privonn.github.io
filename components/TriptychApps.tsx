
import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';

interface TriptychAppsProps {
  lang: 'ro' | 'en' | 'es';
}

export const TriptychApps: React.FC<TriptychAppsProps> = ({ lang }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];

  return (
    <section id="the_vault" className="relative min-h-screen bg-black overflow-hidden flex flex-col md:flex-row border-t border-white/5">
      {/* Background Grid Overlay Global */}
      <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none z-0"></div>

      {t.APPS.map((app, index) => {
        const isHovered = hoveredIndex === index;
        const isAnyHovered = hoveredIndex !== null;
        
        return (
          <div
            key={app.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`relative flex-1 flex flex-col justify-end transition-all duration-700 ease-[cubic-bezier(0.7,0,0.3,1)] overflow-hidden group border-b md:border-b-0 md:border-r border-white/5 last:border-0 h-[60vh] md:h-screen ${
              isHovered ? 'md:flex-[2.5] bg-[#ffffff]/[0.02]' : isAnyHovered ? 'md:flex-[0.7] grayscale' : 'md:flex-1'
            }`}
          >
            {/* Background Accent Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-[#ffffff]/10 via-transparent to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            
            {/* Scanline Effect on Hover */}
            <div className={`absolute inset-0 bg-scanline pointer-events-none opacity-20 transition-transform duration-[4000ms] linear infinite ${isHovered ? 'translate-y-full' : ''}`} 
                 style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.1) 50%)', backgroundSize: '100% 4px' }}></div>

            {/* Content Container */}
            <div className="relative z-10 p-8 md:p-16 h-full flex flex-col justify-end">
              
              {/* Vertical Index Number */}
              <div className="absolute top-12 left-8 md:left-12 flex flex-col items-center gap-4">
                 <span className={`text-[12px] font-mono font-bold transition-colors duration-500 ${isHovered ? 'text-[#ffffff]' : 'text-white/20'}`}>
                   APP_{app.id}
                 </span>
                 <div className={`w-[1px] h-12 transition-all duration-700 ${isHovered ? 'bg-[#ffffff] h-20' : 'bg-white/10'}`}></div>
              </div>

              {/* Central Icon - Appears and scales */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-700 ${isHovered ? 'scale-110 opacity-20 blur-[2px]' : 'scale-100 opacity-5'}`}>
                <i className={`${app.icon} text-[15rem] md:text-[25rem] text-[#ffffff]`}></i>
              </div>

              {/* Info Text */}
              <div className="flex flex-col gap-4 max-w-lg">
                <div className="flex flex-col">
                  <span className={`text-[10px] font-mono uppercase tracking-[0.5em] mb-2 transition-colors ${isHovered ? 'text-[#ffffff]' : 'text-white/40'}`}>
                    {app.tagline}
                  </span>
                  <h3 className={`text-5xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-500 ${isHovered ? 'text-[#ffffff] -translate-y-2' : 'text-white'}`}>
                    {app.title}
                  </h3>
                </div>

                {/* Animated Description on Hover */}
                <div className={`grid transition-all duration-700 ${isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}>
                  <div className="overflow-hidden">
                    <p className="text-white/60 text-sm md:text-lg leading-relaxed font-mono mt-4 mb-8">
                      {app.desc}
                    </p>
                    <button className="flex items-center gap-4 group/btn">
                      <span className="w-10 h-[1px] bg-[#ffffff] transition-all group-hover/btn:w-16"></span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffffff]">{lang === 'ro' ? 'Deschide Aplicația' : lang === 'es' ? 'Abrir Aplicación' : 'Launch Module'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Border Accent */}
            <div className={`absolute inset-x-0 bottom-0 h-1 bg-[#ffffff] transition-transform duration-700 origin-left ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
          </div>
        );
      })}
    </section>
  );
};
