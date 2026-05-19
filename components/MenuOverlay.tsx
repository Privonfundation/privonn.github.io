
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

  return React.createElement('div', {
    ref: overlayRef,
    onClick: (e: React.MouseEvent) => { if (e.target === overlayRef.current) onClose(); },
    style: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      zIndex: 999999,
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
    React.createElement('div', {
      style: {
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.12,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }
    }),
    React.createElement('button', {
      onClick: onClose,
      style: {
        position: 'absolute',
        top: '20px', right: '20px',
        zIndex: 10,
        width: '44px', height: '44px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.3)',
        background: 'transparent',
        color: '#fff',
        fontSize: '22px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, '✕'),
    React.createElement('div', {
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      style: {
        position: 'relative',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '420px',
        padding: '0 24px'
      }
    }, ...items.map((item, i) =>
      React.createElement('button', {
        key: item.id,
        type: 'button',
        onClick: () => handleNav(item.id),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '14px 20px',
          borderRadius: '16px',
          border: 'none',
          background: 'transparent',
          color: '#fff',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: '28px',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          transition: 'all 0.3s'
        },
        onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
        },
        onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.background = 'transparent';
        }
      },
        React.createElement('span', {
          style: {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.3)',
            minWidth: '30px',
            textAlign: 'right'
          }
        }, item.num),
        React.createElement('div', {
          style: {
            width: '24px',
            height: '1px',
            background: 'rgba(255,255,255,0.2)',
            flexShrink: 0
          }
        }),
        React.createElement('span', null, item.label)
      )
    )),
    React.createElement('div', {
      style: {
        position: 'absolute',
        bottom: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        zIndex: 20
      }
    },
      React.createElement('div', {
        style: {
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
        }
      }),
      React.createElement('div', {
        style: { display: 'flex', alignItems: 'center', gap: '10px' }
      },
        React.createElement(Logo, { className: 'w-5 h-5', glow: false, color: '#fff' }),
        React.createElement('span', {
          style: {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: 'rgba(255,255,255,0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.4em'
          }
        }, 'Obscurity Security')
      )
    )
  );
};
