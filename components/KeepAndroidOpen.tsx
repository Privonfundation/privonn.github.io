import React, { useEffect, useRef, useState, memo } from 'react';
import { Logo } from './Logo';
import { TRANSLATIONS } from '../constants';

const ANDROID_LOCKDOWN_DATE = new Date('2026-09-01T00:00:00Z');

const CountdownTimer: React.FC<{ label: string; lang: 'ro' | 'en' | 'es' }> = ({ label, lang }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  const labels = lang === 'ro'
    ? ['ZILE', 'ORE', 'MIN', 'SEC', 'MS']
    : lang === 'es'
    ? ['DÍAS', 'HRS', 'MIN', 'SEG', 'MS']
    : ['DAYS', 'HRS', 'MIN', 'SEC', 'MS'];

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const distance = ANDROID_LOCKDOWN_DATE.getTime() - now;
      if (distance > 0) {
        setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
        setMilliseconds(Math.floor(distance % 1000));
      } else {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setMilliseconds(0);
      }
    };
    update();
    const interval = setInterval(update, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-12">
      {[
        { value: days, labelIdx: 0 },
        { value: hours, labelIdx: 1 },
        { value: minutes, labelIdx: 2 },
        { value: seconds, labelIdx: 3 },
        { value: milliseconds, labelIdx: 4, pad: 3 },
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#ff3333]/20 blur-xl rounded-lg animate-pulse"></div>
            <div className="relative bg-black/60 border border-[#ff3333]/40 rounded-lg px-2 py-1.5 sm:px-4 sm:py-2 min-w-[40px] sm:min-w-[60px] text-center backdrop-blur-sm">
              <span className={`font-mono font-black text-[#ff3333] tabular-nums ${
                item.pad ? 'text-base sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'
              }`} style={{ textShadow: '0 0 10px rgba(255,51,51,0.5)' }}>
                {String(item.value).padStart(item.pad || 2, '0')}
              </span>
            </div>
          </div>
          <span className="text-[7px] sm:text-[9px] font-mono text-white/30 uppercase tracking-[0.3em] mt-1.5">{labels[item.labelIdx]}</span>
        </div>
      ))}
      <span className="text-[9px] sm:text-[11px] font-mono text-white/40 uppercase tracking-[0.2em] ml-1">{label}</span>
    </div>
  );
};

export const KeepAndroidOpen: React.FC<{ lang: 'ro' | 'en' | 'es' }> = ({ lang }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];
  const androidArticles = t.ANDROID_ARTICLES;
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const cardObservers = androidArticles.map((_, index) => {
      return new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCards(prev => new Set(prev).add(index));
        }
      }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });
    });

    const cardElements = document.querySelectorAll('#keep-android-open .action-card');
    cardElements.forEach((el, i) => cardObservers[i]?.observe(el));

    return () => cardObservers.forEach(o => o.disconnect());
  }, [lang, androidArticles.length]);

  return (
    <section ref={sectionRef} id="keep-android-open" className="relative bg-black overflow-hidden section-content-visibility">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ff3333]/[0.03] rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#ff3333]/[0.02] rounded-full blur-[120px]"></div>
      </div>

      {/* Hero zone */}
      <div className="relative z-10 min-h-[70vh] flex items-center justify-center py-32 md:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ff3333]/10 border border-[#ff3333]/30 text-[10px] uppercase tracking-[0.5em] font-mono font-bold text-[#ff3333] mb-12 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3333] shadow-[0_0_10px_#ff3333]"></span>
            {lang === 'ro' ? 'Alertă Critică' : lang === 'es' ? 'Alerta Crítica' : 'Critical Alert'}
          </div>

          {/* Title */}
          <h2 className="reveal-text active text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
            <span className="text-[#ff3333]">{t.ANDROID_TITLE.split(':')[0]}</span>
            <br/>
            <span className="text-white/10">{t.ANDROID_TITLE.split(':')[1]}</span>
          </h2>

          {/* Subtitle */}
          <p className="reveal-text active text-base sm:text-lg md:text-xl font-mono text-white/50 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.ANDROID_PREAMBLE}
          </p>

          {/* Countdown */}
          <CountdownTimer label={lang === 'ro' ? 'până la închidere' : lang === 'es' ? 'hasta el cierre' : 'until lockdown'} lang={lang} />
        </div>
      </div>

      {/* Our stance — full-width band */}
      <div className="relative z-10 border-y border-[#ff3333]/10 bg-[#0a0000]">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — big number */}
            <div className="lg:col-span-3 text-center lg:text-left">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-[#ff3333]/10 blur-3xl rounded-full animate-pulse"></div>
                <div className="relative">
                  <Logo className="w-20 h-20 md:w-24 md:h-24 opacity-30" glow={false} color="#ff3333" />
                </div>
              </div>
              <div className="mt-6 lg:mt-8">
                <span className="text-[#ff3333] font-mono text-[10px] uppercase tracking-[0.5em] font-bold block mb-2">
                  {lang === 'ro' ? 'Poziția Noastră' : lang === 'es' ? 'Nuestra Posición' : 'Our Stance'}
                </span>
                <div className="w-12 h-[2px] bg-[#ff3333]/60"></div>
              </div>
            </div>

            {/* Right — stance text */}
            <div className="lg:col-span-9">
              <div className="space-y-6 font-mono">
                <p className="text-base md:text-lg lg:text-xl text-white/70 leading-relaxed">
                  {t.ANDROID_CARD_TEXT}
                </p>
                <p className="text-xs text-white/30 uppercase tracking-[0.3em]">
                  <span className="text-[#ff3333]">—</span> {lang === 'ro' ? 'Observă. Acționează. Rezistă.' : lang === 'es' ? 'Observa. Actúa. Resiste.' : 'Observe. Act. Resist.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action steps — bento-style grid */}
      <div className="relative z-10 py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16 reveal-text active">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#ff3333]/50"></div>
              <span className="text-[#ff3333] font-mono text-[10px] uppercase tracking-[0.6em] font-bold">
                {lang === 'ro' ? 'Ce Poți Face' : lang === 'es' ? 'Qué Puedes Hacer' : 'What You Can Do'}
              </span>
              <div className="h-px w-12 bg-[#ff3333]/50"></div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {androidArticles.map((art: any, index: number) => {
              const isEven = index % 2 === 0;
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={art.id}
                  className={`action-card group relative rounded-2xl border transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${
                    isEven
                      ? 'md:translate-y-0 md:col-span-1'
                      : 'md:col-span-1'
                  } ${
                    index === 0
                      ? 'md:row-span-1'
                      : ''
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Card content */}
                  <div className="relative h-full bg-white/[0.02] border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden group-hover:border-[#ff3333]/25 transition-all duration-500">
                    {/* Background accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff3333]/[0.02] rounded-full blur-3xl group-hover:bg-[#ff3333]/[0.04] transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Step number + pillar */}
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-[#ff3333]/40 font-mono text-xs font-bold">{art.id}</span>
                        <span className="text-[#ff3333] font-mono text-[9px] uppercase tracking-[0.4em] font-bold bg-[#ff3333]/10 px-3 py-1 rounded-full">
                          {art.pilar}
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[#ff3333] transition-colors duration-500">
                        {art.title}
                      </h4>

                      {/* Description */}
                      <p className="text-sm text-white/40 leading-relaxed font-mono flex-1 group-hover:text-white/60 transition-colors duration-500">
                        {art.desc}
                      </p>

                      {/* Indicator */}
                      <div className="mt-6 flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full border border-[#ff3333]/30 flex items-center justify-center">
                          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                            isVisible
                              ? 'bg-[#ff3333] shadow-[0_0_8px_#ff3333]'
                              : 'bg-transparent'
                          }`}></div>
                        </div>
                        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">{art.status}</span>
                      </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/5 group-hover:border-[#ff3333]/20 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/5 group-hover:border-[#ff3333]/20 transition-colors duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* External links — prominent band */}
      <div className="relative z-10 border-t border-[#ff3333]/10 py-16 md:py-20 px-6 bg-gradient-to-b from-black to-[#0a0000]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-16 bg-[#ff3333]/40"></div>
              <i className="fa-solid fa-external-link text-[#ff3333]/60 text-sm"></i>
              <div className="h-px w-16 bg-[#ff3333]/40"></div>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white/80">
              {lang === 'ro' ? 'Resurse Externe' : lang === 'es' ? 'Recursos Externos' : 'External Resources'}
            </h3>
            <p className="text-sm font-mono text-white/30 mt-3">
              {lang === 'ro' ? 'Informații oficiale și petiții — alege unde vrei să acționezi.' : lang === 'es' ? 'Información oficial y peticiones — elige dónde actuar.' : 'Official information and petitions — choose where you want to act.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.ANDROID_LINKS.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative flex items-center justify-between px-6 py-5 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[#ff3333]/40 hover:bg-[#ff3333]/5 transition-all duration-500"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#ff3333]/10 border border-[#ff3333]/20 flex items-center justify-center group-hover/link:bg-[#ff3333]/20 group-hover/link:border-[#ff3333]/40 transition-all">
                    <i className="fa-solid fa-arrow-up-right-from-square text-[#ff3333]/60 text-sm group-hover/link:text-[#ff3333] transition-colors"></i>
                  </div>
                  <span className="text-sm font-mono text-white/50 group-hover/link:text-white/90 transition-colors">
                    {link.label}
                  </span>
                </div>
                <div className="w-2 h-2 rounded-full bg-[#ff3333]/30 group-hover/link:bg-[#ff3333] group-hover/link:shadow-[0_0_8px_#ff3333] transition-all"></div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
