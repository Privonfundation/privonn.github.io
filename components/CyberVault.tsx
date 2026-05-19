import React, { useRef, useState, useEffect, useCallback } from 'react';
import { TRANSLATIONS } from '../constants';

interface AppNode {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  icon: string;
}

export const CyberVault: React.FC<{ lang: 'ro' | 'en' | 'es' }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  };

  const updateActiveIndex = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll('.app-card-trigger');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closest = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = (card as HTMLElement).offsetLeft + (card as HTMLElement).offsetWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = () => updateActiveIndex();
    container.addEventListener('scroll', handler);
    handler();
    return () => container.removeEventListener('scroll', handler);
  }, [updateActiveIndex]);

  return (
    <section 
      id="the_vault" 
      className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 bg-blueprint opacity-5 transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${mousePos.x * -0.5}px, ${mousePos.y * -0.5}px, 0) scale(1.1)` }}
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
      </div>

      <div className="relative z-20 px-6 md:px-20 mb-4">
        <div className="flex items-center gap-4 mb-2">
           <div className="h-[1px] w-12 bg-[#ffffff]"></div>
           <span className="text-[#ffffff] font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Open Source</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          {t.APPS_SECTION_TITLE}
        </h2>
      </div>

      {/* Horizontal Gallery */}
      <div 
        ref={containerRef}
        className="relative flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 md:gap-16 px-[10%] md:px-[20%] py-16 items-center transition-all scroll-smooth"
      >
        {t.APPS.map((app: AppNode, index: number) => {
          const isActive = index === activeIndex;
          
          return (
            <div 
              key={app.id}
              data-index={index}
              className={`app-card-trigger relative flex-shrink-0 w-[80vw] md:w-[60vw] lg:w-[45vw] snap-center will-change-transform transition-[transform,opacity] duration-500 ease-out ${
                isActive ? 'scale-100 opacity-100' : 'scale-90 opacity-30'
              }`}
            >
              {/* Card Container */}
              <div className="relative group bg-[#080808] border border-white/10 rounded-[2.5rem] p-8 md:p-16 overflow-hidden shadow-2xl">
                
                {/* Decorative Grid with glow */}
                <div className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.15] transition-opacity duration-700"
                     style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px',
                              filter: 'brightness(1)',
                              animation: 'gridGlow 3.5s ease-in-out infinite' }}>
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#ffffff]/50 transition-colors duration-300">
                      <i className={`${app.icon} text-2xl text-white/40 group-hover:text-[#ffffff] transition-colors`}></i>
                    </div>
                    {isActive && (
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Signal_Strength</span>
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(i => <div key={i} className="w-3 h-1 bg-[#ffffff]/40" />)}
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-6 group-hover:text-[#ffffff] transition-colors duration-300">
                    {app.title}
                  </h3>

                  <p className="text-white/40 font-mono text-sm md:text-lg leading-relaxed max-w-xl mb-12 group-hover:text-white/70 transition-colors duration-300">
                    {app.desc}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center gap-8">
                    <button className="px-10 py-5 bg-[#ffffff] text-black font-black uppercase text-[11px] tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                      {lang === 'ro' ? 'Deschide Modulul' : lang === 'es' ? 'Abrir Módulo' : 'Initialize Module'}
                    </button>
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute top-10 right-10 flex flex-col gap-1 opacity-20 group-hover:opacity-40 transition-opacity">
                   <div className="w-8 h-[1px] bg-white"></div>
                   <div className="w-4 h-[1px] bg-white self-end"></div>
                </div>
              </div>

              {/* Parallax Background Label */}
              <div 
                className={`absolute -z-10 -bottom-10 -left-10 text-[15vw] font-black text-white/[0.02] uppercase select-none pointer-events-none transition-transform duration-1000 ${isActive ? 'translate-x-0' : 'translate-x-20'}`}
              >
                {app.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        <div className="flex gap-3">
          {t.APPS.map((_: any, i: number) => (
            <div 
              key={i}
              className={`h-[4px] transition-all duration-300 rounded-full ${
                i === activeIndex ? 'w-12 bg-[#ffffff] shadow-[0_0_15px_#ffffff]' : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes gridGlow {
          0%, 100% { filter: brightness(0.8); }
          50% { filter: brightness(1.6); }
        }
      `}</style>
    </section>
  );
};
