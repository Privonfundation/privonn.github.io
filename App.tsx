
import React, { useEffect, useState, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Typewriter } from './components/Typewriter';
import Silk from './components/Silk';
import { Logo } from './components/Logo';
import { CyberVault } from './components/CyberVault';
import { TRANSLATIONS, PROTOCOL_ARTICLES } from './constants';

const renderHighlighted = (text: string, className = '') => {
  const parts = text.split('|');
  if (parts.length === 1) return <span className={className}>{text}</span>;
  return (
    <span className={className}>
      <span className="text-[#39FF14]">{parts[0]}</span>
      <span>{parts[1]}</span>
    </span>
  );
};

const ArticleCard = memo(({ art }: { art: any }) => (
  <div className="flex-shrink-0 relative group bg-[#080808]/70 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 overflow-hidden min-w-[210px] md:min-w-[290px] max-w-[210px] md:max-w-[290px] hover:border-[#39FF14]/30 transition-all duration-500">
    <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none">
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>
    </div>
    <div className="relative z-10 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono text-[#39FF14]/50 tracking-wider">{art.id}</span>
        <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em] bg-white/5 px-2 py-0.5 rounded-full">{art.pilar}</span>
      </div>
      <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-white/80 group-hover:text-[#39FF14] transition-colors duration-300 leading-tight">
        {art.title}
      </h4>
      <p className="text-[9px] md:text-[10px] font-mono text-white/40 leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors duration-300">
        {art.desc}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]/60 shadow-[0_0_6px_rgba(57,255,20,0.3)]"></span>
        <span className="text-[7px] font-mono text-white/15">{art.status}</span>
      </div>
    </div>
    <div className="absolute top-3 right-3 flex flex-col gap-0.5 opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none">
      <div className="w-5 h-[1px] bg-white"></div>
      <div className="w-2.5 h-[1px] bg-white self-end"></div>
    </div>
  </div>
));

const Connector = () => (
  <div className="flex items-center flex-shrink-0 mx-1 md:mx-2">
    <div className="w-3 md:w-4 h-px bg-gradient-to-r from-transparent via-[#39FF14]/15 to-transparent"></div>
    <div className="w-1 h-1 rounded-full bg-[#39FF14]/20"></div>
    <div className="w-3 md:w-4 h-px bg-gradient-to-l from-transparent via-[#39FF14]/15 to-transparent"></div>
  </div>
);

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [lang, setLang] = useState<'ro' | 'en' | 'es'>('en');
  const [verseStage, setVerseStage] = useState<'verses' | 'third'>('verses');

  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const articles = PROTOCOL_ARTICLES[lang];
  const pillars = [...new Set(articles.map((a: any) => a.pilar))];
  const mid = Math.ceil(articles.length / 2);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setActive(true));
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));
    
    const handleScroll = () => {
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      cancelAnimationFrame(timer);
      revealObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#39FF14] selection:text-black overflow-x-hidden isolate">
      <div 
        ref={parallaxBgRef}
        className="fixed inset-0 -z-20 bg-blueprint opacity-20 pointer-events-none will-change-transform"
        style={{ height: '120vh', top: '-10vh' }}
      />
      
      <Navbar lang={lang} setLang={setLang} />

      <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-32 md:pt-48 overflow-visible">
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-75" style={{ maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)' }}>
          <Silk speed={5} scale={1} color="#39FF14" noiseIntensity={1.5} rotation={0} />
        </div>
        
        <div className="relative z-[10] w-full max-w-6xl mx-auto text-center flex flex-col items-center pointer-events-none">
          <div className="mb-10 pointer-events-auto">
            <h1 className="fluid-h1 font-black uppercase">
              <span className={`reveal-text block text-[#39FF14] drop-shadow-[0_0_60px_rgba(57,255,20,0.6)] ${active ? 'active' : ''}`} style={{ transitionDelay: '0.1s' }}>Obscurity</span>
              <span className={`reveal-text block text-white ${active ? 'active' : ''}`} 
                    style={{ transitionDelay: '0.3s' }}>Security</span>
            </h1>
          </div>

          <div className="reveal-text inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#39FF14]/40 text-[10px] uppercase tracking-[0.5em] font-mono font-bold text-[#39FF14] mb-12 animate-pulse pointer-events-auto" style={{ transitionDelay: '0.4s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] shadow-[0_0_15px_#39FF14]"></span> PROTOCOL 3305
          </div>

          <div className="reveal-text relative group mb-12 max-w-4xl w-full pointer-events-auto" style={{ transitionDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"></div>
            <div className="relative flex flex-col items-center py-12 px-6">
              <div className="flex flex-col items-center gap-6 w-full">
                <h2 className="text-sm sm:text-lg md:text-3xl font-mono font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] md:tracking-[0.6em] text-white px-2 break-words">
                  {t.HERO_SLOGAN_1} <span className="text-[#39FF14]">{t.HERO_SLOGAN_2}</span>
                </h2>
                <div className="w-24 h-[1px] bg-white/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#39FF14] animate-laser-move"></div>
                </div>
                <h2 className="text-sm sm:text-lg md:text-3xl font-mono font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] md:tracking-[0.6em] text-white px-2 break-words">
                  {t.HERO_SLOGAN_3} <span className="text-[#39FF14]">{t.HERO_SLOGAN_4}</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="reveal-text max-w-2xl mb-16 w-full px-4 pointer-events-auto" style={{ transitionDelay: '0.7s' }}>
            <div className="relative overflow-hidden bg-black/40 backdrop-blur-lg border border-[#39FF14]/30 rounded-xl p-8 shadow-[0_0_60px_rgba(57,255,20,0.1)]">
              <div className="absolute inset-x-0 h-[1px] bg-[#39FF14]/50 animate-scan pointer-events-none"></div>
              <div className="relative z-10 text-center">
                <p className="text-[14px] md:text-[16px] font-mono font-bold uppercase tracking-[0.2em] text-white/95 leading-relaxed">
                  {t.HERO_DESC}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 reveal-text mb-20 pointer-events-auto" style={{ transitionDelay: '0.9s' }}>
            <Link to="/about" className="w-full sm:w-auto px-10 py-5 bg-[#39FF14] text-black font-black uppercase text-[11px] tracking-widest rounded-full shadow-[0_0_50px_rgba(57,255,20,0.4)] transition-all hover:scale-105 hover:bg-white active:scale-95 text-center flex items-center justify-center gap-2">
              <i className="fa-solid fa-user-shield text-sm"></i>
              {lang === 'ro' ? 'Despre Noi' : lang === 'es' ? 'Sobre Nosotros' : 'About Us'}
            </Link>
            <a href="#the_vault" className="w-full sm:w-auto px-10 py-5 border border-white/30 text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-center flex items-center justify-center gap-2">
              <i className="fa-solid fa-layer-group text-sm"></i>
              {lang === 'ro' ? 'Aplicații' : lang === 'es' ? 'Aplicaciones' : 'Apps'}
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 border border-white/15 text-white/50 font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/5 hover:border-white/30 hover:text-white transition-all backdrop-blur-sm text-center flex items-center justify-center gap-2">
              <i className="fa-brands fa-github text-sm"></i>
              {lang === 'ro' ? 'Cod Sursă' : lang === 'es' ? 'Código Fuente' : 'Source Code'}
            </a>
          </div>
        </div>
      </section>

      <section id="verse" className="relative min-h-screen flex items-center justify-center overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-blueprint opacity-5"></div>
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 z-10" style={{ background: 'linear-gradient(to top, #1a1a1e, transparent)' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#39FF14] blur-[120px] opacity-20"></div>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-16">
            <div className="h-[1px] w-16 bg-[#39FF14]"></div>
            <span className="text-[#39FF14] font-mono text-[10px] uppercase tracking-[0.5em] font-bold">{t.VERSE_LABEL}</span>
            <div className="h-[1px] w-16 bg-[#39FF14]"></div>
          </div>

          <div className="relative flex items-center justify-center" style={{ minHeight: '400px' }}>
            <div className={`group/verses flex flex-col md:flex-row md:items-start md:justify-center w-full transition-all duration-800 ease-in-out ${
              verseStage === 'third' ? 'opacity-0 md:translate-x-[-120%] scale-95 pointer-events-none' : 'opacity-100 translate-x-0 scale-100'
            }`}>
              <div className="relative z-20 md:w-1/2 md:flex-shrink-0 transition-transform duration-700 ease-out md:group-hover/verses:-translate-x-[18%] -rotate-1 md:rotate-0">
                <div className={`transition-all duration-700 ${verseStage === 'third' ? 'md:-translate-x-[200%] opacity-0' : ''}`}>
                  <div className="animate-verse-float md:animate-verse-float">
                     <div className="bg-black/40 backdrop-blur-lg border border-white/40 rounded-2xl p-6 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.08),0_0_30px_rgba(255,255,255,0.06),inset_0_0_40px_rgba(255,255,255,0.03)] md:mr-[-20%]">
                  <blockquote>
                    <p className="text-xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-white break-words">
                      „{renderHighlighted(t.VERSE_1)}"
                    </p>
                    <cite className="block mt-6 md:mt-8 text-white/70 font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase not-italic">
                      — {renderHighlighted(t.VERSE_1_REF)}
                    </cite>
                  </blockquote>
                  </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 md:w-1/2 md:flex-shrink-0 md:mt-16 transition-transform duration-700 ease-out md:group-hover/verses:translate-x-[18%] -mt-2 md:mt-16 self-end translate-x-2 md:translate-x-0 rotate-1 md:rotate-0">
                <div className={`transition-all duration-700 ${verseStage === 'third' ? 'md:translate-x-[200%] opacity-0' : ''}`}>
                  <div className="animate-verse-float-reverse md:animate-verse-float-reverse">
                     <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-12 shadow-[0_0_40px_rgba(255,255,255,0.05),0_0_20px_rgba(255,255,255,0.03),inset_0_0_30px_rgba(255,255,255,0.02)] md:ml-[-20%]">
                  <blockquote>
                    <p className="text-xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-white/90 break-words">
                      „{renderHighlighted(t.VERSE_2)}"
                    </p>
                    <cite className="block mt-6 md:mt-8 text-white/50 font-mono text-[10px] md:text-sm tracking-[0.4em] uppercase not-italic">
                      — {renderHighlighted(t.VERSE_2_REF)}
                    </cite>
                  </blockquote>
                  </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-800 ease-in-out ${
              verseStage === 'third' ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'
            }`}>
              <div className="w-full max-w-3xl mx-auto px-6">
                <div className="bg-black/40 backdrop-blur-lg border border-[#39FF14]/40 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(57,255,20,0.15),0_0_30px_rgba(57,255,20,0.1),inset_0_0_40px_rgba(57,255,20,0.04)]">
                  <blockquote>
                    <p className="text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tight leading-[1.3] text-white/90">
                      <Typewriter
                        text={t.FOUNDATION_MESSAGE}
                        highlightWords={
                          lang === 'ro'
                            ? ['Iisus Hristos', 'libertate', 'mântuire', 'fundamentul', 'fără libertate']
                            : lang === 'es'
                            ? ['Jesucristo', 'libertad', 'salvación', 'fundamento', 'sin libertad']
                            : ['Jesus Christ', 'freedom', 'salvation', 'foundation', 'without freedom']
                        }
                        speed={20}
                      />
                    </p>
                  </blockquote>
                  <div className="mt-8 flex justify-center gap-4">
                    <button onClick={() => setVerseStage('verses')} className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-mono font-bold uppercase tracking-[0.3em] transition-all active:scale-95">
                      ← {lang === 'ro' ? 'Înapoi la versete' : lang === 'es' ? 'Volver a versos' : 'Back to verses'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button 
              onClick={() => setVerseStage(verseStage === 'verses' ? 'third' : 'verses')}
              className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-[9px] font-mono font-bold uppercase tracking-[0.4em] transition-all active:scale-95"
            >
              <span>{verseStage === 'verses' ? '→' : '←'}</span>
              <span>{verseStage === 'verses'
                ? (lang === 'ro' ? 'Continuă' : lang === 'es' ? 'Continuar' : 'Continue')
                : (lang === 'ro' ? 'Înapoi la versete' : lang === 'es' ? 'Volver a versos' : 'Back to verses')
              }</span>
            </button>
          </div>
        </div>
      </section>

      <section id="vision" className="py-32 md:py-64 relative overflow-hidden section-content-visibility" style={{ background: '#1a1a1e' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] opacity-[0.08] blur-[3px] pointer-events-none">
            <Logo className="w-full h-full" glow={false} color="#39FF14" />
          </div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {[
              { name: 'Google', x: '5%', y: '8%', r: -12, s: 1 },
              { name: 'Microsoft', x: '72%', y: '5%', r: 8, s: 0.9 },
              { name: 'Apple', x: '15%', y: '35%', r: 5, s: 0.7 },
              { name: 'Meta', x: '78%', y: '40%', r: -10, s: 0.8 },
              { name: 'Amazon', x: '8%', y: '65%', r: 15, s: 0.6 },
              { name: 'OpenAI', x: '65%', y: '72%', r: -7, s: 0.7 },
              { name: 'TikTok', x: '50%', y: '10%', r: -20, s: 0.85 },
              { name: 'X Corp', x: '85%', y: '20%', r: 25, s: 0.65 },
              { name: 'Netflix', x: '20%', y: '80%', r: -5, s: 0.55 },
              { name: 'Oracle', x: '70%', y: '88%', r: 12, s: 0.5 },
            ].map((c, i) => (
              <div
                key={c.name}
                className="absolute font-black uppercase tracking-tighter whitespace-nowrap text-white/20"
                style={{
                  left: c.x, top: c.y,
                  transform: `rotate(${c.r}deg) scale(${c.s})`,
                  fontSize: `clamp(${1.2 + i * 0.2}rem, ${3 + i * 0.5}vw, ${2.5 + i * 0.3}rem)`,
                  opacity: 0.2 + (i % 3) * 0.1,
                  textShadow: '0 0 30px rgba(57,255,20,0.08)',
                }}
              >
                {lang === 'ro' ? 'NU VREM' : lang === 'es' ? 'NO QUEREMOS' : 'WE DON\'T WANT'} {c.name}
              </div>
            ))}
          </div>
          <div className="absolute top-0 left-0 w-full h-32 z-10" style={{ background: 'linear-gradient(to bottom, transparent, #1a1a1e)' }}></div>
          <div className="absolute bottom-0 left-0 w-full h-40 z-10" style={{ background: 'linear-gradient(to top, #fff, transparent)' }}></div>
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
          <div className="absolute top-20 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="reveal-text">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-16 bg-[#39FF14]"></div>
              <span className="text-[#39FF14] font-mono text-xs uppercase tracking-[0.6em] font-bold">{t.THE_STANDARD}</span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-12 leading-[0.85] relative">
              <span className="animate-glitch-protocol">
                Protocol 3305<span className="text-[#39FF14]/30">:</span>
              </span>
              <br/>
              <span className="text-white/10 block animate-nod mt-6 md:mt-10">
                {t.PACT_TITLE.split(':')[1]}
              </span>
            </h2>

            <div className="relative mb-10 md:mb-16 p-5 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#39FF14]/5 blur-[120px] rounded-full group-hover:bg-[#39FF14]/10 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 blur-[80px] rounded-full"></div>
              <div className="relative z-10">
                <p className="text-sm md:text-base font-mono text-white/60 leading-relaxed mb-5">
                  {t.PREAMBLE_TEXT}
                </p>
                <p className="text-sm md:text-base font-mono text-white/80 leading-relaxed border-l-2 border-[#39FF14]/40 pl-5">
                  {t.PROTOCOL_DESC}
                </p>
                <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.15em]">
                    {lang === 'ro' ? 'Aderență:' : lang === 'es' ? 'Adhesión:' : 'Adherence:'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[8px] font-mono text-[#39FF14] uppercase tracking-[0.3em]">Zero-Knowledge</span>
                  <span className="px-3 py-1 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/30 text-[8px] font-mono text-[#39FF14] uppercase tracking-[0.3em]">Zero-Trust</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 px-1">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#39FF14] shadow-[0_0_10px_#39FF14] animate-pulse"></span>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
                  {articles.length}/{articles.length} {lang === 'ro' ? 'Articole Active' : lang === 'es' ? 'Artículos Activos' : 'Articles Enforced'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {pillars.map((p: string) => (
                  <span key={p} className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="group relative overflow-hidden pt-2 md:pt-3">
              <div className="animate-scroll-ticker flex items-center pb-2 md:pb-3">
                {[...articles.slice(0, mid), ...articles.slice(0, mid)].flatMap((art: any, i: number, arr: any[]) => [
                  <ArticleCard key={`r1-${art.id}-${i}`} art={art} />,
                  i < arr.length - 1 ? <Connector key={`r1-c-${i}`} /> : null
                ])}
              </div>
              <div className="animate-scroll-ticker-reverse flex items-center pb-2 md:pb-3">
                {[...articles.slice(mid), ...articles.slice(mid)].flatMap((art: any, i: number, arr: any[]) => [
                  <ArticleCard key={`r2-${art.id}-${i}`} art={art} />,
                  i < arr.length - 1 ? <Connector key={`r2-c-${i}`} /> : null
                ])}
              </div>
              <div className="absolute inset-y-0 left-0 w-24 md:w-36 bg-gradient-to-r from-[#1a1a1e] to-transparent pointer-events-none z-10"></div>
              <div className="absolute inset-y-0 right-0 w-24 md:w-36 bg-gradient-to-r from-transparent to-[#1a1a1e] pointer-events-none z-10"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 md:py-48 overflow-hidden bg-white">
        <div className="absolute bottom-0 left-0 w-full h-32 z-10" style={{ background: 'linear-gradient(to top, #000, transparent)' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-gray-300"></div>
            <span className="text-gray-400 font-mono text-xs uppercase tracking-[0.6em] font-bold">
              {lang === 'ro' ? 'Filozofia Noastră' : lang === 'es' ? 'Nuestra Filosofía' : 'Our Philosophy'}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-gray-900 mb-8">
                {lang === 'ro' ? 'Suntem Oameni, Nu Utilizatori' : lang === 'es' ? 'Somos Personas, No Usuarios' : 'We Are People, Not Users'}
              </h2>
              <p className="text-base md:text-lg text-gray-500 font-mono leading-relaxed">
                {lang === 'ro'
                  ? 'Suntem oamenii din spatele ecranului, fiecare dintre noi — nu utilizatori. Pentru că utilizator înseamnă că suntem doar un produs, o bază de date într-un sistem. Dar noi suntem oameni. Avem drepturi. Avem nevoi. Avem emoții. Avem frici. Nu suntem doar niște date. Giganții tehnologici de obicei ne numesc utilizatori, dar aici la ObscuritySecurity venim să rupem acest termen. Pentru noi nu există utilizatori — există oameni. De aceea în fiecare documentație, cod, design, limbă, adresare — vă spunem oameni. Pentru că asta suntem. Făcut de oameni, pentru oameni.'
                  : lang === 'es'
                  ? 'Somos las personas detrás de la pantalla, cada uno de nosotros — no usuarios. Porque usuario significa que somos solo un producto, una base de datos en un sistema. Pero somos personas. Tenemos derechos. Tenemos necesidades. Tenemos emociones. Tenemos miedos. No somos solo datos. Los gigantes tecnológicos suelen llamarnos usuarios, pero aquí en ObscuritySecurity venimos a romper ese término. Para nosotros no existen usuarios — existen personas. Por eso en cada documentación, código, diseño, idioma, forma de dirigirnos — les decimos personas. Porque eso es lo que somos. Hecho por personas, para personas.'
                  : 'We are the people behind the screen, every single one of us — not users. Because user means we are just a product, a database entry in a system. But we are people. We have rights. We have needs. We have emotions. We have fears. We are not just data. Tech giants usually call us users, but here at ObscuritySecurity we come to break that term. For us there are no users — there are people. That is why in every documentation, code, design, language, address — we call you people. Because that is what we are. Made by people, for people.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { ro: 'Demnitate', en: 'Dignity', es: 'Dignidad' },
                { ro: 'Libertate', en: 'Freedom', es: 'Libertad' },
                { ro: 'Confidențialitate', en: 'Privacy', es: 'Privacidad' },
                { ro: 'Transparență', en: 'Transparency', es: 'Transparencia' },
                { ro: ' Respect', en: ' Respect', es: ' Respeto' },
                { ro: 'Încredere', en: 'Trust', es: 'Confianza' },
              ].map((v) => (
                <span key={v.en} className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 text-xs font-mono font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">
                  {v[lang as 'ro' | 'en' | 'es']}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CyberVault lang={lang} />

      <footer className="py-24 border-t border-white/5 px-5 bg-black section-content-visibility">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div>
              <div className="flex items-center gap-4 mb-10">
                <Logo className="w-10 h-10" glow={true} />
                <div className="flex flex-col">
                  <span className="font-black tracking-[0.3em] uppercase text-sm leading-none">
                    <span className="text-white">Obscurity</span><span className="text-[#39FF14]">Security</span>
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-mono text-white/30 max-w-sm leading-relaxed uppercase tracking-[0.2em]">
                {t.FOOTER_MISSION} <br/> {lang === 'ro' ? 'Arhitectură digitală pentru libertate absolută.' : 'Digital architecture for absolute freedom.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16 md:gap-32 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              <div className="flex flex-col gap-8">
                <span className="text-[#39FF14] opacity-40 font-mono tracking-[0.6em]">Network</span>
                <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
                <a href="#" className="hover:text-white transition-colors">Github</a>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-[#39FF14] opacity-40 font-mono tracking-[0.6em]">Legal</span>
                <a href="#" className="hover:text-white transition-colors">Ethics_Code</a>
                <a href="#" className="hover:text-white transition-colors">Audit_2024</a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-8 text-[10px] font-mono text-white/20 uppercase tracking-[0.6em]">
            <span>©2024 OBSCURITYSECURITY_NON_PROFIT</span>
            <div className="flex gap-10">
              <span>v2.4.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
