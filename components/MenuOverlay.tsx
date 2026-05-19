import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuOverlayProps {
  onClose: () => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleOverlayClick = (e: MouseEvent) => {
      if (e.target === overlay) onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    overlay.addEventListener('click', handleOverlayClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      overlay.removeEventListener('click', handleOverlayClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleNavigation = (path: string) => {
    onClose();
    navigate(path);
  };

  return (
    <div 
      ref={overlayRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.98) 0%, rgba(10,10,10,0.98) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        margin: 0,
        padding: 0
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .menu-heading { font-size: 28px !important; }
          .menu-item { padding: 12px 16px !important; gap: 14px !important; }
          .menu-container { gap: 6px !important; }
          .menu-close { top: 16px !important; right: 16px !important; width: 40px !important; height: 40px !important; font-size: 16px !important; }
        }
      `}</style>
      {/* Close button */}
      <button
        className="menu-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          background: 'transparent',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'rgba(255, 255, 255, 0.6)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 100000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#39FF14';
          e.currentTarget.style.color = '#39FF14';
          e.currentTarget.style.transform = 'rotate(90deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)';
          e.currentTarget.style.transform = 'rotate(0deg)';
        }}
      >
        ✕
      </button>

      {/* Menu content */}
      <div 
        className="menu-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          cursor: 'default'
        }}
      >
        {/* Home */}
        <div
          className="menu-item"
          onClick={() => handleNavigation('/')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '20px 40px',
            borderRadius: '12px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.background = 'rgba(57, 255, 20, 0.05)';
            target.style.paddingLeft = '60px';
            const number = target.querySelector('.menu-number') as HTMLElement;
            const line = target.querySelector('.menu-line') as HTMLElement;
            if (number) number.style.color = '#39FF14';
            if (line) {
              line.style.width = '40px';
              line.style.background = '#39FF14';
            }
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.background = 'transparent';
            target.style.paddingLeft = '40px';
            const number = target.querySelector('.menu-number') as HTMLElement;
            const line = target.querySelector('.menu-line') as HTMLElement;
            if (number) number.style.color = 'rgba(255, 255, 255, 0.3)';
            if (line) {
              line.style.width = '20px';
              line.style.background = 'rgba(255, 255, 255, 0.2)';
            }
          }}
        >
          <span 
            className="menu-number"
            style={{
              fontSize: '14px',
              fontFamily: 'monospace',
              color: 'rgba(255, 255, 255, 0.3)',
              minWidth: '40px',
              transition: 'color 0.4s ease'
            }}
          >
            01
          </span>
          <div 
            className="menu-line"
            style={{
              width: '20px',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s ease'
            }}
          />
          <h3 className="menu-heading" style={{
            fontSize: '48px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '0.05em',
            transition: 'all 0.4s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#39FF14';
            (e.currentTarget as HTMLElement).style.letterSpacing = '0.1em';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#ffffff';
            (e.currentTarget as HTMLElement).style.letterSpacing = '0.05em';
          }}
          >
            Home
          </h3>
        </div>

        {/* About */}
        <div
          className="menu-item"
          onClick={() => handleNavigation('/about')}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '20px 40px',
            borderRadius: '12px',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            target.style.background = 'rgba(57, 255, 20, 0.05)';
            target.style.paddingLeft = '60px';
            const number = target.querySelector('.menu-number') as HTMLElement;
            const line = target.querySelector('.menu-line') as HTMLElement;
            if (number) number.style.color = '#39FF14';
            if (line) {
              line.style.width = '40px';
              line.style.background = '#39FF14';
            }
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            target.style.background = 'transparent';
            target.style.paddingLeft = '40px';
            const number = target.querySelector('.menu-number') as HTMLElement;
            const line = target.querySelector('.menu-line') as HTMLElement;
            if (number) number.style.color = 'rgba(255, 255, 255, 0.3)';
            if (line) {
              line.style.width = '20px';
              line.style.background = 'rgba(255, 255, 255, 0.2)';
            }
          }}
        >
          <span 
            className="menu-number"
            style={{
              fontSize: '14px',
              fontFamily: 'monospace',
              color: 'rgba(255, 255, 255, 0.3)',
              minWidth: '40px',
              transition: 'color 0.4s ease'
            }}
          >
            02
          </span>
          <div 
            className="menu-line"
            style={{
              width: '20px',
              height: '1px',
              background: 'rgba(255, 255, 255, 0.2)',
              transition: 'all 0.4s ease'
            }}
          />
          <h3 className="menu-heading" style={{
            fontSize: '48px',
            fontWeight: 900,
            textTransform: 'uppercase',
            color: '#ffffff',
            margin: 0,
            letterSpacing: '0.05em',
            transition: 'all 0.4s ease'
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#39FF14';
            (e.currentTarget as HTMLElement).style.letterSpacing = '0.1em';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#ffffff';
            (e.currentTarget as HTMLElement).style.letterSpacing = '0.05em';
          }}
          >
            About Us
          </h3>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.5), transparent)'
        }} />
        <p style={{
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.25)',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          margin: 0
        }}>
          Obscurity Security
        </p>
      </div>
    </div>
  );
};
