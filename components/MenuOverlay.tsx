
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { TRANSLATIONS } from '../constants';

interface MenuOverlayProps {
  onClose: () => void;
  lang: 'ro' | 'en' | 'es';
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose, lang }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const overlay = overlayRef.current;
    if (!overlay) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleNav = (path: string) => {
    onClose();
    if (path.startsWith('/')) navigate(path);
    else {
      const el = document.getElementById(path);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = [
    { id: 'hero', label: t.NAV.HOME, num: '01' },
    { id: 'verse', label: t.NAV.VERSE, num: '02' },
    { id: 'vision', label: t.NAV.PROTOCOL, num: '03' },
    { id: 'philosophy', label: t.NAV.PHILOSOPHY, num: '04' },
    { id: 'the_vault', label: t.NAV.VAULT, num: '05' },
    { id: '/about', label: t.NAV.ABOUT, num: '06' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: '#000' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'radial-gradient(#39FF14 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 md:top-10 md:right-10 z-10 w-12 h-12 rounded-full border border-white/30 bg-black/60 flex items-center justify-center text-white hover:border-[#39FF14] hover:text-[#39FF14] transition-all"
      >
        <i className="fa-solid fa-xmark text-xl"></i>
      </button>

      <div className="relative z-20 flex flex-col items-stretch gap-2 w-full max-w-md px-6" onClick={(e) => e.stopPropagation()}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item.id)}
            className="group flex items-center gap-4 px-6 py-4 rounded-2xl hover:bg-white/[0.04] transition-all text-left border border-transparent hover:border-white/10"
          >
            <span className="text-sm font-mono text-white/30 w-8 text-right">{item.num}</span>
            <div className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-[#39FF14] transition-all"></div>
            <span className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white group-hover:text-[#39FF14] transition-all">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-3 z-20">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent"></div>
        <div className="flex items-center gap-3">
          <Logo className="w-5 h-5" glow={false} color="#39FF14" />
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">Obscurity Security</span>
        </div>
      </div>
    </div>
  );
};
