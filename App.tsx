
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
      <span className="text-[#ffffff]">{parts[0]}</span>
      <span>{parts[1]}</span>
    </span>
  );
};

const ArticleCard = memo(({ art }: { art: any }) => (
  <div className="flex-shrink-0 relative bg-[#080808] border border-white/8 rounded-2xl p-5 md:p-6 overflow-hidden min-w-[240px] md:min-w-[300px] max-w-[240px] md:max-w-[300px] transition-all duration-500">
    <div className="absolute inset-0 opacity-[0.04]"
         style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    <div className="relative z-10 flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-mono text-white/40 tracking-wider">{art.id}</span>
        <span className="text-[7px] font-mono text-white/25 uppercase tracking-[0.2em] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">{art.pilar}</span>
      </div>
      <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-white/90 leading-tight">{art.title}</h4>
      <p className="text-[10px] font-mono text-white/40 leading-relaxed line-clamp-2">{art.desc}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]/50 shadow-[0_0_6px_rgba(255,255,255,0.2)]" />
        <span className="text-[7px] font-mono text-white/15">{art.status}</span>
      </div>
    </div>
    <div className="absolute top-3 right-3 flex flex-col gap-0.5 opacity-15">
      <div className="w-4 h-[1px] bg-white" />
      <div className="w-2 h-[1px] bg-white self-end" />
    </div>
  </div>
));

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [lang, setLang] = useState<'ro' | 'en' | 'es'>('en');
  const [verseStage, setVerseStage] = useState<'verses' | 'third'>('verses');

  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const articles = PROTOCOL_ARTICLES[lang];
  const pillars = [...new Set(articles.map((a: any) => a.pilar))];

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
    <div className="min-h-screen bg-black text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden isolate">
      <div 
        ref={parallaxBgRef}
        className="fixed inset-0 -z-20 bg-blueprint opacity-20 pointer-events-none will-change-transform"
        style={{ height: '120vh', top: '-10vh' }}
      />
      
      <Navbar lang={lang} setLang={setLang} />

      <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-32 md:pt-48 overflow-visible">
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-75" style={{ maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)' }}>
          <Silk speed={5} scale={1} color="#ffffff" noiseIntensity={1.5} rotation={0} />
        </div>
        
        <div className="relative z-[10] w-full max-w-6xl mx-auto text-center flex flex-col items-center pointer-events-none">
          <div className="mb-10 pointer-events-auto">
            <h1 className="fluid-h1 font-black uppercase">
              <span className={`reveal-text block text-[#ffffff] drop-shadow-[0_0_60px_rgba(255,255,255,0.6)] ${active ? 'active' : ''}`} style={{ transitionDelay: '0.1s' }}>Obscurity</span>
              <span className={`reveal-text block text-white ${active ? 'active' : ''}`} 
                    style={{ transitionDelay: '0.3s' }}>Security</span>
            </h1>
          </div>

          <div className="reveal-text inline-flex items-center gap-2 px-6 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#ffffff]/40 text-[10px] uppercase tracking-[0.5em] font-mono font-bold text-[#ffffff] mb-12 animate-pulse pointer-events-auto" style={{ transitionDelay: '0.4s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] shadow-[0_0_15px_#ffffff]"></span> PROTOCOL 3305
          </div>

          <div className="reveal-text relative group mb-12 max-w-4xl w-full pointer-events-auto" style={{ transitionDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]"></div>
            <div className="relative flex flex-col items-center py-12 px-6">
              <div className="flex flex-col items-center gap-6 w-full">
                <h2 className="text-sm sm:text-lg md:text-3xl font-mono font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] md:tracking-[0.6em] text-white px-2 break-words">
                  {t.HERO_SLOGAN_1} <span className="text-[#ffffff]">{t.HERO_SLOGAN_2}</span>
                </h2>
                <div className="w-24 h-[1px] bg-white/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#ffffff] animate-laser-move"></div>
                </div>
                <h2 className="text-sm sm:text-lg md:text-3xl font-mono font-black uppercase tracking-[0.1em] sm:tracking-[0.3em] md:tracking-[0.6em] text-white px-2 break-words">
                  {t.HERO_SLOGAN_3} <span className="text-[#ffffff]">{t.HERO_SLOGAN_4}</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="reveal-text max-w-2xl mb-16 w-full px-4 pointer-events-auto" style={{ transitionDelay: '0.7s' }}>
            <div className="relative overflow-hidden bg-black/40 backdrop-blur-lg border border-[#ffffff]/30 rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.1)]">
              <div className="absolute inset-x-0 h-[1px] bg-[#ffffff]/50 animate-scan pointer-events-none"></div>
              <div className="relative z-10 text-center">
                <p className="text-[14px] md:text-[16px] font-mono font-bold uppercase tracking-[0.2em] text-white/95 leading-relaxed">
                  {t.HERO_DESC}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 reveal-text mb-20 pointer-events-auto" style={{ transitionDelay: '0.9s' }}>
            <Link to="/about" className="w-full sm:w-auto px-10 py-5 bg-[#ffffff] text-black font-black uppercase text-[11px] tracking-widest rounded-full shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:bg-white active:scale-95 text-center flex items-center justify-center gap-2">
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#ffffff] blur-[120px] opacity-20"></div>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-16">
            <div className="h-[1px] w-16 bg-[#ffffff]"></div>
            <span className="text-[#ffffff] font-mono text-[10px] uppercase tracking-[0.5em] font-bold">{t.VERSE_LABEL}</span>
            <div className="h-[1px] w-16 bg-[#ffffff]"></div>
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
                <div className="bg-black/40 backdrop-blur-lg border border-[#ffffff]/40 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.1),inset_0_0_40px_rgba(255,255,255,0.04)]">
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

      <section id="vision" className="py-32 md:py-64 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 left-[15%] w-px h-full bg-gradient-to-b from-white/5 via-transparent to-transparent" />
          <div className="absolute top-0 right-[15%] w-px h-full bg-gradient-to-b from-white/5 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-40" style={{ background: 'linear-gradient(to top, #fff, transparent)' }} />
          <div className="absolute top-0 left-0 w-full h-40" style={{ background: 'linear-gradient(to bottom, #0a0a0a, transparent)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-white/40" />
            <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{t.THE_STANDARD}</span>
          </div>

          <div className="max-w-4xl mb-16 md:mb-24">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
              <span className="text-white">Protocol 3305</span>
              <br />
              <span className="text-white/20 text-3xl md:text-5xl font-bold mt-4 block tracking-normal">
                {t.PACT_TITLE.split(':')[1]}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 md:mb-24">
            <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">PREAMBLE</span>
                </div>
                <p className="text-sm md:text-base font-mono text-white/50 leading-relaxed">
                  {t.PREAMBLE_TEXT}
                </p>
              </div>
            </div>

            <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-[100px] rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">FOUNDATION</span>
                </div>
                <p className="text-sm md:text-base font-mono text-white/60 leading-relaxed border-l-2 border-white/30 pl-4">
                  {t.PROTOCOL_DESC}
                </p>
                <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                  <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    {lang === 'ro' ? 'Aderență:' : lang === 'es' ? 'Adhesión:' : 'Adherence:'}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/8 border border-white/20 text-[8px] font-mono text-white/60 uppercase tracking-[0.3em]">Zero-Knowledge</span>
                  <span className="px-3 py-1 rounded-full bg-white/8 border border-white/20 text-[8px] font-mono text-white/60 uppercase tracking-[0.3em]">Zero-Trust</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span className="text-[9px] font-mono text-white/25 uppercase tracking-[0.3em]">
                {articles.length} {lang === 'ro' ? 'Articole' : lang === 'es' ? 'Artículos' : 'Articles'}
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

          <div className="relative">
            <div className="overflow-x-auto no-scrollbar flex gap-4 md:gap-5 pb-4">
              {articles.map((art: any, i: number) => (
                <ArticleCard key={art.id} art={art} />
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-r from-transparent to-[#0a0a0a] pointer-events-none z-10" />
          </div>
        </div>
      </section>

      <section id="philosophy" className="relative py-32 md:py-48 overflow-hidden bg-white">
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
                    <span className="text-white">Obscurity</span><span className="text-[#ffffff]">Security</span>
                  </span>
                </div>
              </div>
              <p className="text-[11px] font-mono text-white/30 max-w-sm leading-relaxed uppercase tracking-[0.2em]">
                {t.FOOTER_MISSION} <br/> {lang === 'ro' ? 'Arhitectură digitală pentru libertate absolută.' : 'Digital architecture for absolute freedom.'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-16 md:gap-32 text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">
              <div className="flex flex-col gap-8">
                <span className="text-[#ffffff] opacity-40 font-mono tracking-[0.6em]">Network</span>
                <a href="#" className="hover:text-white transition-colors">Infrastructure</a>
                <a href="#" className="hover:text-white transition-colors">Github</a>
              </div>
              <div className="flex flex-col gap-8">
                <span className="text-[#ffffff] opacity-40 font-mono tracking-[0.6em]">Legal</span>
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
