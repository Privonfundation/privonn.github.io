
import React, { useEffect, useState, memo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Silk from './components/Silk';
import { Logo } from './components/Logo';
import { CyberVault } from './components/CyberVault';
import { TRANSLATIONS, PROTOCOL_ARTICLES } from './constants';
import { KeepAndroidOpen } from './components/KeepAndroidOpen';

const ArticleItem = memo(({ art, isActive }: { art: any, isActive: boolean }) => (
  <div className={`reveal-text group relative flex flex-col md:flex-row items-stretch transition-all duration-700 gpu-layer overflow-hidden border-b border-white/5 last:border-0 pl-1 md:pl-0 ${isActive ? 'bg-[#39FF14]/[0.04] active' : 'bg-black'}`}>
    <div className="hidden md:flex flex-col items-center justify-between py-8 w-24 border-r border-white/5 group-hover:border-[#39FF14]/30 transition-colors relative">
       <span className={`text-[10px] font-mono transition-colors ${isActive ? 'text-[#39FF14]' : 'text-white/20 group-hover:text-[#39FF14]'}`}>{art.id}</span>
       <div className={`w-[1px] h-full my-4 transition-colors ${isActive ? 'bg-[#39FF14]/40' : 'bg-white/5 group-hover:bg-[#39FF14]/20'}`}></div>
    </div>

    <div className="flex-1 p-8 md:p-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
         <div className="flex flex-col gap-2">
            <span className="text-[9px] font-mono text-[#39FF14] uppercase tracking-[0.4em] font-bold">{art.pilar}</span>
            <h4 className={`text-2xl md:text-4xl font-black uppercase tracking-tight transition-colors duration-500 ${isActive ? 'text-[#39FF14]' : 'text-white group-hover:text-[#39FF14]'}`}>
              {art.title}
            </h4>
         </div>
         <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isActive ? 'border-[#39FF14]/60 bg-[#39FF14]/10' : 'border-white/5 group-hover:border-[#39FF14]/40'}`}>
               <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? 'bg-[#39FF14] shadow-[0_0_10px_#39FF14]' : 'bg-white/10 group-hover:bg-[#39FF14] group-hover:animate-pulse'}`}></div>
            </div>
         </div>
      </div>
      <p className={`text-sm md:text-lg leading-relaxed max-w-4xl transition-colors ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
        {art.desc}
      </p>
    </div>

    <div className={`absolute left-0 top-0 w-[2px] md:w-[4px] transition-all duration-700 ${isActive ? 'h-full bg-[#39FF14] shadow-[0_0_15px_#39FF14]' : 'h-0 bg-[#39FF14] group-hover:h-full opacity-30'}`}></div>
  </div>
));

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [lang, setLang] = useState<'ro' | 'en' | 'es'>('en');
  const [activeArticles, setActiveArticles] = useState<Set<number>>(new Set());
  const [progressHeight, setProgressHeight] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const protocolCardRef = useRef<HTMLDivElement>(null);
  const articlesContainerRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[lang];
  const articles = PROTOCOL_ARTICLES[lang];

  useEffect(() => {
    const timer = requestAnimationFrame(() => setActive(true));
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));

    const articleObservers = articles.map((_, index) => {
      return new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveArticles(prev => new Set(prev).add(index));
        }
      }, { threshold: 0.5, rootMargin: '0px 0px -20% 0px' });
    });

    const articleElements = document.querySelectorAll('.article-wrapper');
    articleElements.forEach((el, i) => articleObservers[i]?.observe(el));
    
    const handleScroll = () => {
      if (protocolCardRef.current && articlesContainerRef.current) {
        const pRect = protocolCardRef.current.getBoundingClientRect();
        const aRect = articlesContainerRef.current.getBoundingClientRect();
        
        const startPoint = pRect.bottom + window.scrollY;
        const endPoint = aRect.bottom + window.scrollY;
        const triggerY = window.scrollY + (window.innerHeight * 0.7);
        
        if (triggerY > startPoint) {
          const totalLength = endPoint - startPoint;
          const currentProgress = triggerY - startPoint;
          setProgressHeight(Math.min(currentProgress, totalLength));
        } else {
          setProgressHeight(0);
        }
      }

      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      cancelAnimationFrame(timer);
      revealObserver.disconnect();
      articleObservers.forEach(o => o.disconnect());
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lang, articles.length]);

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
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-10"></div>
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-[1px] w-16 bg-[#39FF14]"></div>
            <span className="text-[#39FF14] font-mono text-[10px] uppercase tracking-[0.5em] font-bold">{t.VERSE_LABEL}</span>
            <div className="h-[1px] w-16 bg-[#39FF14]"></div>
          </div>

          <div className="group/verses flex flex-col md:flex-row md:items-start md:justify-center gap-8 md:gap-0">
            <div className="relative z-20 md:w-1/2 md:flex-shrink-0 transition-transform duration-700 ease-out md:group-hover/verses:-translate-x-[12%]">
              <div className="animate-verse-float md:animate-verse-float">
                <div className="bg-black/40 backdrop-blur-lg border border-[#39FF14]/30 rounded-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(57,255,20,0.15)] md:mr-[-20%]">
                  <blockquote>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-white break-words">
                      „{t.VERSE_1}"
                    </p>
                    <cite className="block mt-8 text-[#39FF14] font-mono text-sm tracking-[0.4em] uppercase not-italic">
                      — {t.VERSE_1_REF}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>

            <div className="relative z-10 md:w-1/2 md:flex-shrink-0 md:mt-16 transition-transform duration-700 ease-out md:group-hover/verses:translate-x-[12%]">
              <div className="animate-verse-float-reverse md:animate-verse-float-reverse">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 shadow-lg md:ml-[-20%]">
                  <blockquote>
                    <p className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-white/90 break-words">
                      „{t.VERSE_2}"
                    </p>
                    <cite className="block mt-8 text-[#39FF14]/70 font-mono text-sm tracking-[0.4em] uppercase not-italic">
                      — {t.VERSE_2_REF}
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="py-32 md:py-64 bg-[#050505] relative overflow-hidden border-t border-white/5 section-content-visibility">
        <div className="max-w-7xl mx-auto px-6 relative">
          
          <div 
            className="absolute left-[24px] md:left-[24px] z-30 pointer-events-none"
            style={{ 
              top: protocolCardRef.current ? protocolCardRef.current.offsetTop + protocolCardRef.current.offsetHeight : 0,
              height: progressHeight,
              width: '2px',
              backgroundColor: '#39FF14',
              boxShadow: '0 0 15px #39FF14, 0 0 30px rgba(57,255,20,0.5)',
              transition: 'height 0.1s linear, opacity 0.3s',
              opacity: progressHeight > 5 ? 1 : 0
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-10 bg-gradient-to-t from-[#39FF14] to-transparent blur-[2px]"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#39FF14] rounded-full blur-md animate-pulse"></div>
          </div>

          <div className="mb-24 reveal-text">
            <div className="flex items-center gap-4 mb-10">
               <div className="h-px w-16 bg-[#39FF14]"></div>
               <span className="text-[#39FF14] font-mono text-xs uppercase tracking-[0.6em] font-bold">{t.THE_STANDARD}</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-16 leading-[0.85]">
              {t.PACT_TITLE.split(':')[0]}: <br/>
              <span className="text-white/10">{t.PACT_TITLE.split(':')[1]}</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-32">
              <div className="flex flex-col gap-8">
                <span className="text-[#39FF14] font-mono text-[10px] uppercase tracking-[0.4em] font-bold">{t.PREAMBLE_LABEL}</span>
                <p className="text-lg md:text-xl font-mono text-white/60 leading-relaxed border-l-2 border-[#39FF14]/40 pl-8">
                  {t.PREAMBLE_TEXT}
                </p>
              </div>

              <div ref={protocolCardRef} className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#39FF14]/30 transition-all duration-700">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Logo className="w-32 h-32" glow={false} />
                </div>
                <div className="relative z-10 flex flex-col gap-6 font-mono">
                  <p className="text-sm md:text-base text-white/80 leading-relaxed">
                    {t.PROTOCOL_DESC}
                  </p>
                  <p className="text-xs text-white/40 uppercase tracking-[0.2em] leading-relaxed">
                    {t.ADHERENCE.replace('zero-knowledge', '').replace('zero-trust', '')} <span className="text-[#39FF14]">zero-knowledge</span> and <span className="text-[#39FF14]">zero-trust</span>.
                  </p>
                </div>
              </div>
            </div>

            <div ref={articlesContainerRef} className="flex flex-col gap-px bg-white/5 border border-white/5 overflow-hidden rounded-2xl contain-paint relative z-10">
              {articles.map((art: any, index: number) => (
                <div key={art.id} className="article-wrapper">
                  <ArticleItem 
                    art={art} 
                    isActive={activeArticles.has(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <KeepAndroidOpen lang={lang} />

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
