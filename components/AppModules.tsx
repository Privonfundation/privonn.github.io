
import React, { useState, useRef, useEffect } from 'react';
import { TRANSLATIONS } from '../constants';

interface ModuleCardProps {
  app: any;
  lang: 'ro' | 'en' | 'es';
}

const ModuleCard: React.FC<ModuleCardProps> = ({ app, lang }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: 'transform 0.1s ease-out'
      }}
      className="relative group bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col gap-6 hover:border-[#ffffff]/40 transition-colors duration-500"
    >
      {/* Blueprint Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.07] transition-opacity">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <path d="M0 20 L100 20 M80 0 L80 100" stroke="#ffffff" strokeWidth="0.1" fill="none" />
        </svg>
      </div>

      {/* Header-ul Modulului */}
      <div className="flex justify-between items-start relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ffffff]/10 group-hover:border-[#ffffff]/30 transition-all duration-500">
          <i className={`${app.icon} text-2xl text-white/40 group-hover:text-[#ffffff] transition-colors`}></i>
        </div>
      </div>

      {/* Conținutul Modulului */}
      <div className="relative z-10 mt-4">
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2 block">{app.tagline}</span>
        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-[#ffffff] transition-colors">
          {app.title}
        </h3>
        <p className="text-white/40 text-sm md:text-base leading-relaxed font-mono max-w-md group-hover:text-white/70 transition-colors">
          {app.desc}
        </p>
      </div>

      {/* Footer-ul Modulului */}
      <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-end relative z-10">
        <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#ffffff] hover:text-black hover:border-[#ffffff] transition-all">
          {lang === 'ro' ? 'Detalii' : lang === 'es' ? 'Detalles' : 'Inspect'}
        </button>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-[#ffffff]/40 transition-colors"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/10 group-hover:border-[#ffffff]/40 transition-colors"></div>
    </div>
  );
};

export const AppModules: React.FC<{ lang: 'ro' | 'en' | 'es' }> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="the_vault" className="py-32 bg-black relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blueprint opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#ffffff]"></div>
              <span className="text-[#ffffff] font-mono text-xs uppercase tracking-[0.6em] font-bold">Implementări</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              {t.APPS_SECTION_TITLE}
            </h2>
          </div>
          <p className="text-white/40 font-mono text-sm max-w-sm border-l border-white/10 pl-6">
            Module software dezvoltate conform Protocolului 3305 pentru autonomie individuală.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.APPS.map((app) => (
            <ModuleCard key={app.id} app={app} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
};
