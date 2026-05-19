import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
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
        position: 'fixed',
        top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 2147483647,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Geist, sans-serif',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '420px', padding: '0 24px' }}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              padding: '16px 20px',
              border: 'none',
              borderRadius: '12px',
              background: 'transparent',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '26px',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              textAlign: 'left',
              marginBottom: '4px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ fontSize: '11px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.3)', minWidth: '28px', textAlign: 'right' }}>{item.num}</span>
            <span style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
};
