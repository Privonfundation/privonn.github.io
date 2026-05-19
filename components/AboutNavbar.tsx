import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { TRANSLATIONS } from '../constants';
import { MenuOverlay } from './MenuOverlay';

type Language = 'ro' | 'en' | 'es';

const LANG_OPTIONS = [
  { code: 'ro' as Language, label: 'Română', flag: '🇷🇴' },
  { code: 'en' as Language, label: 'English', flag: '🇬🇧' },
  { code: 'es' as Language, label: 'Español', flag: '🇪🇸' },
];

interface AboutNavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const AboutNavbar: React.FC<AboutNavbarProps> = ({ lang, setLang }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];

  const toggleMenu = useCallback(() => setMenuOpen(prev => !prev), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANG_OPTIONS.find(l => l.code === lang)!;

  const menuItems = [
    { label: lang === 'ro' ? 'Acasă' : lang === 'es' ? 'Inicio' : 'Home', number: '01', to: '/' },
    { label: lang === 'ro' ? 'Despre Noi' : lang === 'es' ? 'Sobre Nosotros' : 'About Us', number: '02', to: '/about', isActive: true },
    { label: t.NAV.VISION, number: '03', href: '#vision' },
    { label: t.NAV.VAULT, number: '04', href: '#the_vault' },
    { label: t.NAV.INFRA, number: '05', href: '#infrastructure' },
    { label: t.NAV.ETHICS, number: '06', href: '#ethics' },
    { label: t.NAV.CONTACT, number: '07', href: '#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] py-6 md:py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-3 md:gap-4 group">
            <Logo className="w-7 h-7 md:w-9 md:h-9 transition-all duration-500 group-hover:shadow-[0_0_20px_#39FF14]" />
            <div className="flex flex-col">
              <h2 className="font-black text-[9px] md:text-[12px] tracking-widest uppercase leading-none mb-1 md:mb-1.5">
                <span className="text-white">Obscurity</span>
                <span className="text-[#39FF14]">Security</span>
              </h2>
              <div className="flex items-center gap-1 md:gap-1.5">
                <span className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-[#39FF14] shadow-[0_0_5px_#39FF14] animate-pulse"></span>
                <span className="text-[6px] md:text-[8px] font-mono text-white font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase leading-none">
                  {lang === 'ro' ? 'Pentru Oameni' : lang === 'es' ? 'Para Personas' : 'For People'}
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            <div ref={langRef} className="relative">
              <button 
                onClick={() => setLangOpen(prev => !prev)}
                className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/[0.18] transition-all active:scale-95"
              >
                <i className="fa-solid fa-globe text-white/60 text-xs"></i>
                <span className="text-[8px] md:text-[9px] font-mono font-bold text-white/70 tracking-wider">{currentLang.label.toUpperCase()}</span>
                <i className={`fa-solid fa-chevron-down text-white/60 text-[6px] transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[120]">
                  <div className="p-1.5">
                    {LANG_OPTIONS.map((option) => (
                      <button
                        key={option.code}
                        onClick={() => {
                          setLang(option.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                          lang === option.code
                            ? 'bg-[#39FF14]/10 text-[#39FF14]'
                            : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="text-sm">{option.flag}</span>
                        <span className="text-xs font-mono font-bold tracking-wide">{option.label}</span>
                        {lang === option.code && (
                          <i className="fa-solid fa-check text-[#39FF14] text-[10px] ml-auto"></i>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={toggleMenu}
              className="group flex items-center gap-3 md:gap-4 py-1.5 md:py-2 pl-3 md:pl-4 pr-1.5 md:pr-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
            >
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/60 group-hover:text-white pt-0.5">{lang === 'ro' ? 'Meniu' : lang === 'es' ? 'Menú' : 'Menu'}</span>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-[#39FF14] transition-all">
                <div className="relative w-2.5 h-2.5 md:w-3 md:h-3 flex flex-col justify-center items-center gap-[2.5px] md:gap-[3px]">
                  <span className={`h-[1.2px] md:h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[2px] w-3' : 'w-3'}`}></span>
                  <span className={`h-[1.2px] md:h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[2px] w-3' : 'w-1.5 self-end'}`}></span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

       {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
    </>
  );
};
