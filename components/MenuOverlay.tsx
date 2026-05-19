import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
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
    { id: 'hero', label: t.NAV.HOME || 'HOME', num: '01' },
    { id: 'verse', label: t.NAV.VERSE || 'VERSE', num: '02' },
    { id: 'vision', label: t.NAV.PROTOCOL || 'PROTOCOL', num: '03' },
    { id: 'philosophy', label: t.NAV.PHILOSOPHY || 'PHILOSOPHY', num: '04' },
    { id: 'the_vault', label: t.NAV.VAULT || 'APPS', num: '05' },
    { id: '/about', label: t.NAV.ABOUT || 'ABOUT', num: '06' },
  ];

  return createPortal(
    <div
      ref={overlayRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 2147483647, background: '#000',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Geist, sans-serif',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        opacity: 0.12,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Guide lines */}
      <div style={{ position: 'absolute', top: 0, left: '25%', width: '1px', height: '70%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '1px', height: '70%', background: 'linear-gradient(to top, rgba(255,255,255,0.06), transparent)', pointerEvents: 'none' }} />

      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '24px', right: '24px', zIndex: 10,
          width: '44px', height: '44px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.15)',
          background: 'rgba(255,255,255,0.03)',
          color: 'rgba(255,255,255,0.5)', fontSize: '20px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Menu items */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', padding: '0 24px' }}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '20px',
              width: '100%', padding: '14px 24px',
              border: 'none', borderRadius: '14px',
              background: 'transparent', color: '#ffffff',
              cursor: 'pointer', textAlign: 'left',
              opacity: 0, transform: 'translateY(16px)',
              animation: `menuItemIn 0.5s ${0.1 + i * 0.07}s forwards`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              const line = e.currentTarget.querySelector('.menu-line') as HTMLElement;
              const num = e.currentTarget.querySelector('.menu-num') as HTMLElement;
              if (line) { line.style.width = '40px'; line.style.background = '#fff'; }
              if (num) num.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              const line = e.currentTarget.querySelector('.menu-line') as HTMLElement;
              const num = e.currentTarget.querySelector('.menu-num') as HTMLElement;
              if (line) { line.style.width = '24px'; line.style.background = 'rgba(255,255,255,0.2)'; }
              if (num) num.style.color = 'rgba(255,255,255,0.3)';
            }}
          >
            <span className="menu-num" style={{ fontSize: '11px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.3)', minWidth: '28px', textAlign: 'right', transition: 'color 0.3s' }}>
              {item.num}
            </span>
            <div className="menu-line" style={{ width: '24px', height: '1px', background: 'rgba(255,255,255,0.2)', flexShrink: 0, transition: 'all 0.4s' }} />
            <span style={{ fontSize: '26px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{ position: 'absolute', bottom: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', zIndex: 10 }}>
        <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo className="w-4 h-4" glow={false} color="#fff" />
          <span style={{ fontSize: '9px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
            Obscurity Security
          </span>
        </div>
      </div>

      {/* Inject keyframes */}
      <style>{`
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>,
    document.body
  );
};
