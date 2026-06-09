import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { TRANSLATIONS } from '../constants';
import { MenuOverlay } from './MenuOverlay';

type Language = 'ro' | 'en' | 'es';

const LANG_OPTIONS = [
  { code: 'ro' as Language, label: 'Română' },
  { code: 'en' as Language, label: 'English' },
  { code: 'es' as Language, label: 'Español' },
];

interface PrivacyNavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const PrivacyNavbar: React.FC<PrivacyNavbarProps> = ({ lang, setLang }) => {
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
            <Logo className="w-7 h-7 md:w-9 md:h-9 transition-all duration-500 group-hover:shadow-[0_0_20px_#ffffff]" />
            <div className="flex flex-col">
              <h2 className="font-black text-[9px] md:text-[12px] tracking-widest uppercase leading-none mb-1 md:mb-1.5">
                <span className="text-white">Obscurity</span>
                <span className="text-[#ffffff]">Security</span>
              </h2>
              <div className="flex items-center gap-1 md:gap-1.5">
                <span className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-[#ffffff] shadow-[0_0_5px_#ffffff] animate-pulse"></span>
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
                className="flex items-center justify-center md:gap-2 w-10 h-10 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/[0.18] transition-all active:scale-95"
              >
                <i className="fa-solid fa-globe text-white/60 text-sm md:text-sm"></i>
                <span className="hidden md:inline text-[9px] font-mono font-bold text-white/70 tracking-wider">{currentLang.label.toUpperCase()}</span>
                <i className={`hidden md:inline fa-solid fa-chevron-down text-white/60 text-[6px] transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`}></i>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-3 w-48 z-[120]">
                  <div className="relative bg-black/40 backdrop-blur-lg border border-[#ffffff]/30 rounded-xl shadow-[0_0_60px_rgba(255,255,255,0.1)] overflow-hidden">
                    <div className="absolute -top-[5px] right-6 w-2.5 h-2.5 bg-black/40 border-t border-l border-[#ffffff]/30 rotate-45"></div>
                    <div className="p-2">
                      {LANG_OPTIONS.map((option) => (
                        <button
                          key={option.code}
                          onClick={() => {
                            setLang(option.code);
                            setLangOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-300 ${
                            lang === option.code
                              ? 'bg-[#ffffff]/10 text-[#ffffff] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]'
                              : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          <span className="text-xs font-mono font-bold tracking-wide flex-1">{option.label}</span>
                          {lang === option.code ? (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] shadow-[0_0_8px_#ffffff]"></span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="group flex items-center justify-center md:gap-4 w-10 h-10 md:w-auto md:h-auto md:py-2 md:pl-4 md:pr-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95"
            >
              <span className="hidden md:inline text-[9px] font-bold uppercase tracking-[0.4em] text-white/60 group-hover:text-white pt-0.5">{lang === 'ro' ? 'Meniu' : lang === 'es' ? 'Menú' : 'Menu'}</span>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center group-hover:bg-[#ffffff] transition-all">
                <div className="relative w-2.5 h-2.5 md:w-3 md:h-3 flex flex-col justify-center items-center gap-[2.5px] md:gap-[3px]">
                  <span className={`h-[1.2px] md:h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[2px] w-3 md:w-3' : 'w-3 md:w-3'}`}></span>
                  <span className={`h-[1.2px] md:h-[1.5px] bg-black transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[2px] w-3 md:w-3' : 'w-1.5 md:w-1.5 self-end'}`}></span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </nav>

       {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} lang={lang} />}
    </>
  );
};
