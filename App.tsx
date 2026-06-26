
import React, { useEffect, useState, memo, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const Silk = lazy(() => import('./components/Silk'));
import { Logo } from './components/Logo';
import { CyberVault } from './components/CyberVault';
import { TRANSLATIONS, PROTOCOL_ARTICLES } from './constants';
import { useLanguage } from './components/LanguageContext';
import Seo from './components/Seo';

const ArticleCard = memo(({ art }: { art: any }) => (
  <div className="flex-shrink-0 relative bg-[#080808] border border-white/8 rounded-xl p-4 md:p-5 overflow-hidden min-w-[240px] md:min-w-[320px] max-w-[240px] md:max-w-[320px]">
    <div className="absolute inset-0 opacity-[0.04]"
         style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
    <div className="relative z-10 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[8px] font-mono text-white/40 tracking-wider">{art.id}</span>
        <span className="text-[7px] font-mono text-white/25 uppercase tracking-[0.2em] bg-white/5 px-2 py-0.5 rounded-full border border-white/5">{art.pilar}</span>
      </div>
      <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-white/90 leading-tight">{art.title}</h4>
      <p className="text-[10px] font-mono text-white/40 leading-relaxed">{art.desc}</p>
      <div className="flex items-center gap-2 mt-0.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff]/50 shadow-[0_0_6px_rgba(255,255,255,0.2)]" />
        <span className="text-[7px] font-mono text-white/15">{art.status}</span>
      </div>
    </div>
    <div className="absolute top-3 right-3 flex flex-col gap-0.5 opacity-15">
      <div className="w-4 h-[1px] bg-white" />
      <div className="w-2.5 h-[1px] bg-white self-end" />
    </div>
  </div>
));

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const { lang, setLang } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const articles = PROTOCOL_ARTICLES[lang];
  const pillars = [...new Set(articles.map((a: any) => a.pilar))];
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPaused = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pos = 0;
    let raf: number;
    let setWidth = 0;

    const measure = () => {
      const isMobile = window.innerWidth < 768;
      const gap = isMobile ? 12 : 16;
      let w = 0;
      for (let i = 0; i < el.children.length; i++) {
        w += (el.children[i] as HTMLElement).offsetWidth + gap;
      }
      setWidth = w;
    };
    measure();

    const animate = () => {
      if (!scrollPaused.current) {
        pos += 2;
        if (pos >= setWidth) pos = 0;
        el.style.transform = `translateX(${-pos}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const handleClick = () => {
      scrollPaused.current = !scrollPaused.current;
    };
    el.addEventListener('click', handleClick);

    const handleResize = () => measure();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    <>
      <Seo
        title="ObscuritySecurity"
        description="Open-source, privacy-first cybersecurity solutions. Zero data collection, zero tracking, zero knowledge. Protocol 3305 compliant."
        path="/"
      />
      <div className="min-h-screen bg-black text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden isolate">
      <div 
        ref={parallaxBgRef}
        className="fixed inset-0 -z-20 bg-blueprint opacity-20 pointer-events-none will-change-transform"
        style={{ height: '120vh', top: '-10vh' }}
      />
      
      <Navbar lang={lang} setLang={setLang} />

      <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-32 md:pt-48 overflow-visible">
        <div className="absolute inset-0 z-[1] pointer-events-none opacity-75" style={{ maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)' }}>
          <Suspense fallback={null}><Silk speed={5} scale={1} color="#ffffff" noiseIntensity={1.5} rotation={0} /></Suspense>
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
            <Link to="/about" className="w-full sm:w-auto px-10 py-5 bg-[#ffffff] text-black font-black uppercase text-[11px] tracking-widest rounded-full shadow-[0_0_50px_rgba(255,255,255,0.4)] transition-all hover:scale-105 hover:bg-white active:scale-95 text-center flex items-center justify-center">
              {lang === 'ro' ? 'Despre Noi' : lang === 'es' ? 'Sobre Nosotros' : 'About Us'}
            </Link>
            <a href="#the_vault" className="w-full sm:w-auto px-10 py-5 border border-white/30 text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-center flex items-center justify-center">
              {lang === 'ro' ? 'Proiecte' : lang === 'es' ? 'Proyectos' : 'Projects'}
            </a>
            <Link to="/contributions" className="w-full sm:w-auto px-10 py-5 border border-white/15 text-white/50 font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/5 hover:border-white/30 hover:text-white transition-all backdrop-blur-sm text-center flex items-center justify-center">
              {lang === 'ro' ? 'Contribuții' : lang === 'es' ? 'Contribuciones' : 'Contributions'}
            </Link>
          </div>

          <div className="reveal-text pointer-events-auto max-w-xl mx-auto mt-12" style={{ transitionDelay: '1.1s' }}>
            <div className="flex items-center justify-center gap-6 mb-6">
              <a href="https://github.com/ObscuritySecurity" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all text-[9px] font-mono font-bold uppercase tracking-[0.3em]">
                <i className="fa-brands fa-github text-sm"></i> GitHub
              </a>
              <a href="https://github.com/ObscuritySecurity/CrytoTool/discussions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all text-[9px] font-mono font-bold uppercase tracking-[0.3em]">
                <i className="fa-solid fa-comments text-sm"></i> {lang === 'ro' ? 'Discuții' : lang === 'es' ? 'Discusiones' : 'Discussions'}
              </a>
            </div>
            <p className="text-[10px] md:text-xs font-mono text-white/30 text-center leading-relaxed max-w-lg mx-auto">
              {lang === 'ro'
                ? 'Tot codul este deschis. Contribuie, auditează, fork-uie. Transparența este fundația noastră.'
                : lang === 'es'
                ? 'Todo el código es abierto. Contribuye, audita, haz fork. La transparencia es nuestra base.'
                : 'All code is open. Contribute, audit, fork. Transparency is our foundation.'}
            </p>
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
            <div ref={scrollRef} className="flex gap-3 md:gap-4 pb-4" style={{ transform: 'translateX(0)' }}>
              {articles.map((art: any, i: number) => (
                <ArticleCard key={art.id} art={art} />
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
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
                  <span className="text-[7px] font-mono text-white/50 uppercase tracking-[0.4em] mt-1">For People</span>
                </div>
              </div>
              <p className="text-[11px] font-mono text-white/30 max-w-sm leading-relaxed uppercase tracking-[0.2em]">
                {t.FOOTER_MISSION}
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-16 text-[7px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] text-white/30">
              <div className="flex flex-col gap-4 md:gap-8">
                <span className="text-[#ffffff] opacity-40 font-mono tracking-[0.3em] md:tracking-[0.6em]">Community</span>
                <a href="https://github.com/ObscuritySecurity" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="https://matrix.to/#/#obscuritysecurity:matrix.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Matrix</a>
                <a href="https://mastodon.social/@ObscuritySecurity" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Mastodon</a>
                <a href="https://pixelfed.social/i/web/profile/ObscuritySecurity" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Pixelfed</a>
                <a href="https://lemmy.world/c/obscuritysecurity" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Lemmy</a>
              </div>
              <div className="flex flex-col gap-4 md:gap-8">
                <span className="text-[#ffffff] opacity-40 font-mono tracking-[0.3em] md:tracking-[0.6em]">Pages</span>
                <Link to="/community" className="hover:text-white transition-colors">Community</Link>
                <Link to="/contributions" className="hover:text-white transition-colors">Contributions</Link>
                <Link to="/about" className="hover:text-white transition-colors">About</Link>
              </div>
              <div className="flex flex-col gap-4 md:gap-8">
                <span className="text-[#ffffff] opacity-40 font-mono tracking-[0.3em] md:tracking-[0.6em]">Legal</span>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
                <Link to="/ethics" className="hover:text-white transition-colors">Ethics</Link>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 md:gap-8 text-[7px] md:text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] md:tracking-[0.6em]">
            <span>©2026 OBSCURITYSECURITY — AGPL-3.0</span>
            <div className="flex gap-10">
              <span>v2.4.0</span>
              <span className="text-white/30">All projects &amp; this website are AGPL-3.0</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </>
  );
};

export default App;
