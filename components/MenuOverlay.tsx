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
        zIndex: 2147483647,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Geist, sans-serif',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
        opacity: 0.08,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Vertical guide lines */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '1px', height: '60%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: '20%', width: '1px', height: '60%', background: 'linear-gradient(to top, rgba(255,255,255,0.05), transparent)', pointerEvents: 'none' }} />

      {/* Scan line animation */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        animation: 'menuScan 8s linear infinite',
        pointerEvents: 'none',
      }} />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        style={{
          position: 'absolute', top: '24px', right: '24px', zIndex: 10,
          width: '40px', height: '40px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          color: 'rgba(255,255,255,0.4)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Navigation header — divider style */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', alignItems: 'center', gap: '12px',
        marginBottom: '40px', width: '100%', maxWidth: '440px', padding: '0 24px',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15))' }} />
        <span style={{ fontSize: '9px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.6em' }}>
          NAVIGATION
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent)' }} />
      </div>

      {/* Menu items — CyberVault card style */}
      <div style={{
        position: 'relative', zIndex: 10, width: '100%', maxWidth: '440px', padding: '0 24px',
      }}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNav(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              width: '100%', padding: '12px 20px',
              border: '1px solid rgba(255,255,255,0.04)',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.02)',
              color: '#ffffff',
              cursor: 'pointer', textAlign: 'left',
              marginBottom: '6px',
              position: 'relative', overflow: 'hidden',
              opacity: 0, transform: 'translateY(20px)',
              animation: `menuItemIn 0.55s ${0.08 + i * 0.06}s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
              transition: 'border-color 0.4s, background 0.4s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
              const line = e.currentTarget.querySelector('.menu-line') as HTMLElement;
              const num = e.currentTarget.querySelector('.menu-num') as HTMLElement;
              const corner = e.currentTarget.querySelector('.menu-corner') as HTMLElement;
              if (line) { line.style.width = '36px'; line.style.background = '#fff'; }
              if (num) num.style.color = '#fff';
              if (corner) corner.style.opacity = '0.4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
              const line = e.currentTarget.querySelector('.menu-line') as HTMLElement;
              const num = e.currentTarget.querySelector('.menu-num') as HTMLElement;
              const corner = e.currentTarget.querySelector('.menu-corner') as HTMLElement;
              if (line) { line.style.width = '20px'; line.style.background = 'rgba(255,255,255,0.15)'; }
              if (num) num.style.color = 'rgba(255,255,255,0.25)';
              if (corner) corner.style.opacity = '0.15';
            }}
          >
            {/* Corner accent (top-right bracket) — CyberVault style */}
            <div className="menu-corner" style={{
              position: 'absolute', top: '6px', right: '8px', display: 'flex', flexDirection: 'column', gap: '2px',
              opacity: 0.15, transition: 'opacity 0.4s',
            }}>
              <div style={{ width: '14px', height: '1px', background: '#fff' }} />
              <div style={{ width: '7px', height: '1px', background: '#fff', alignSelf: 'flex-end' }} />
            </div>

            {/* Number */}
            <span className="menu-num" style={{
              fontSize: '10px', fontFamily: 'Fragment Mono, monospace',
              color: 'rgba(255,255,255,0.25)', minWidth: '24px', textAlign: 'right',
              transition: 'color 0.3s',
            }}>
              {item.num}
            </span>

            {/* Connecting line */}
            <div className="menu-line" style={{
              width: '20px', height: '1px', background: 'rgba(255,255,255,0.15)',
              flexShrink: 0, transition: 'all 0.4s',
            }} />

            {/* Label */}
            <span style={{
              fontSize: '20px', fontWeight: 900, textTransform: 'uppercase',
              letterSpacing: '-0.02em', lineHeight: 1.2,
              '@media (min-width: 768px)': { fontSize: '26px' },
            }}>
              {item.label}
            </span>

            {/* Arrow indicator */}
            <div style={{ marginLeft: 'auto', opacity: 0.2, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center' }}
              className="menu-arrow"
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M9 1L13 5M13 5L9 9M13 5H1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        position: 'relative', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
        marginTop: '48px',
      }}>
        <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Logo className="w-4 h-4" glow={false} color="#fff" />
          <span style={{ fontSize: '8px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: '0.5em' }}>
            Obscurity Security
          </span>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes menuItemIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuScan {
          0% { top: -1px; opacity: 0; }
          10% { opacity: 1; }
          50% { opacity: 1; }
          60% { opacity: 0; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>,
    document.body
  );
};
