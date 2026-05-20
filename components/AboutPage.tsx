import React, { useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { AboutScene } from './AboutScene';
import { AboutNavbar } from './AboutNavbar';

interface AboutPageProps {
  lang: 'ro' | 'en' | 'es';
}

const ABOUT = {
  ro: {
    heroTag: 'Prezentare Generală',
    heroTitle: 'Oameni.\nNu Utilizatori.',
    heroSub: 'ObscuritySecurity — organizație nonprofit pentru libertatea digitală',
    whoWeAre: 'Cine Suntem',
    whoDesc: `Suntem ObscuritySecurity, o organizație nonprofit care pune Omul pe primul loc, înaintea profitului. Avem principii și valori și credem că libertatea, securitatea, anonimatul, intimitatea, personalizarea și transparența sunt factori esențiali.

Filozofia noastră: vedem persoana din spatele ecranului. Pentru noi nu există utilizatori — credem că securitatea nu ar trebui să fie niciodată un lux, ci o funcționalitate necesară în orice software.

Suntem aici ca să facem intimitatea standard. Iubim transparența, așa că toate proiectele noastre sunt cu cod deschis.`,
    whyTitle: 'De Ce Am Început',
    whyDesc: `Am început printr-o frustrare că giganții mari precum Google, Microsoft și alții domină piața globală. Ne-am născut să oferim o alternativă etică care pune Omul pe primul loc, cu accent pe comunitate și nu pe profit.

Pentru că ne pasionează aceleași lucruri: securitatea, intimitatea, personalizarea, etica și binele comun. Făcut de oameni pentru oameni.`,
    verifyTitle: 'Nu Ne Crede Pe Cuvânt',
    verifyDesc: `Totul este transparent. Open source. Puteți verifica singuri că tot ce facem este adevărat. Tocmai de aceea am dezvoltat Protocol-3305 — ca niciodată să nu ne abandonăm principiile.`,
    protocolLabel: 'Protocol 3305',
    protocolNote: 'Un Pact Pentru Demnitate',
    values: ['Demnitate', 'Libertate', 'Confidențialitate', 'Transparență', 'Respect', 'Încredere'],
    stats: [
      { nr: '09', label: 'Articole' },
      { nr: '03', label: 'Proiecte Live' },
      { nr: '52', label: 'Limbi' },
      { nr: '100%', label: 'Open Source' },
    ],
    articles: [
      { id: 'ART 00', title: 'Monetizare Etică', desc: 'Monetizarea datelor personale este strict interzisă.', pilar: 'Etică' },
      { id: 'ART 01', title: 'Privacy by Design', desc: 'Confidențialitatea integrată în arhitectura fundamentală.', pilar: 'Arhitectură' },
      { id: 'ART 02', title: 'Security by Default', desc: 'Cele mai înalte setări de securitate activate implicit.', pilar: 'Arhitectură' },
      { id: 'ART 03', title: 'Zero Trust', desc: 'Niciodată nu ai încredere, întotdeauna verifici.', pilar: 'Arhitectură' },
      { id: 'ART 04', title: 'Zero Knowledge', desc: 'E2EE obligatoriu. Furnizorii nu pot citi conținutul.', pilar: 'Suveranitate' },
      { id: 'ART 05', title: 'Zero Date Personale', desc: 'Fără date PII stocate dincolo de funcționalitate.', pilar: 'Suveranitate' },
      { id: 'ART 06', title: 'Zero Jurnale', desc: 'Fără log-uri, adrese IP sau metadate.', pilar: 'Suveranitate' },
      { id: 'ART 07', title: 'Open Source', desc: 'Tot codul deschis pentru audit public.', pilar: 'Integritate' },
      { id: 'ART 08', title: 'Privilegiu Minim', desc: 'Doar permisiunile esențiale.', pilar: 'Integritate' },
    ],
  },
  en: {
    heroTag: 'Overview',
    heroTitle: 'People.\nNot Users.',
    heroSub: 'ObscuritySecurity — a non-profit organization for digital freedom',
    whoWeAre: 'Who We Are',
    whoDesc: `We are ObscuritySecurity, a non-profit organization that puts the Human first, before profit. We have principles and values, and we believe that freedom, security, anonymity, privacy, personalization, and transparency are essential factors.

Our philosophy: we see the person behind the screen. For us, there are no users — we believe security should never be a luxury, but a necessary feature in any software.

We are here to make privacy the standard. We love transparency, so all our projects are open source.`,
    whyTitle: 'Why We Started',
    whyDesc: `We started out of frustration that big giants like Google, Microsoft and others dominate the global market. We were born to offer an ethical alternative that puts people first, with emphasis on community over profit.

Because we are passionate about the same things: security, privacy, personalization, ethics and the common good. Made by people for people.`,
    verifyTitle: "Don't Take Our Word For It",
    verifyDesc: `Everything is transparent. Open source. You can verify for yourself that everything we do is true. That's exactly why we developed Protocol-3305 — to never abandon our principles.`,
    protocolLabel: 'Protocol 3305',
    protocolNote: 'A Pact For Dignity',
    values: ['Dignity', 'Freedom', 'Privacy', 'Transparency', 'Respect', 'Trust'],
    stats: [
      { nr: '09', label: 'Articles' },
      { nr: '03', label: 'Live Projects' },
      { nr: '52', label: 'Languages' },
      { nr: '100%', label: 'Open Source' },
    ],
    articles: [
      { id: 'ART 00', title: 'Ethical Monetization', desc: 'Monetization of personal data is strictly forbidden.', pilar: 'Ethics' },
      { id: 'ART 01', title: 'Privacy by Design', desc: 'Privacy integrated into the fundamental architecture.', pilar: 'Architecture' },
      { id: 'ART 02', title: 'Security by Default', desc: 'Highest security settings enabled by default.', pilar: 'Architecture' },
      { id: 'ART 03', title: 'Zero Trust', desc: 'Never trust, always verify.', pilar: 'Architecture' },
      { id: 'ART 04', title: 'Zero Knowledge', desc: 'E2EE is mandatory. Providers cannot read content.', pilar: 'Sovereignty' },
      { id: 'ART 05', title: 'Zero Personal Data', desc: 'No PII stored beyond absolute functionality.', pilar: 'Sovereignty' },
      { id: 'ART 06', title: 'Zero Logs', desc: 'No logs, IP addresses or metadata.', pilar: 'Sovereignty' },
      { id: 'ART 07', title: 'Open Source', desc: 'All code open for public audit.', pilar: 'Integrity' },
      { id: 'ART 08', title: 'Least Privilege', desc: 'Only essential permissions requested.', pilar: 'Integrity' },
    ],
  },
  es: {
    heroTag: 'Descripción General',
    heroTitle: 'Personas.\nNo Usuarios.',
    heroSub: 'ObscuritySecurity — una organización sin fines de lucro para la libertad digital',
    whoWeAre: 'Quiénes Somos',
    whoDesc: `Somos ObscuritySecurity, una organización sin fines de lucro que pone al Humano en primer lugar, antes del lucro. Tenemos principios y valores, y creemos que la libertad, la seguridad, el anonimato, la privacidad, la personalización y la transparencia son factores esenciales.

Nuestra filosofía: vemos a la persona detrás de la pantalla. Para nosotros no existen usuarios — creemos que la seguridad nunca debería ser un lujo, sino una funcionalidad necesaria en cualquier software.

Estamos aquí para hacer de la privacidad un estándar. Amamos la transparencia, así que todos nuestros proyectos son de código abierto.`,
    whyTitle: 'Por Qué Empezamos',
    whyDesc: `Empezamos por la frustración de que grandes gigantes como Google, Microsoft y otros dominan el mercado global. Nacimos para ofrecer una alternativa ética que pone a las personas primero, con énfasis en la comunidad y no en el lucro.

Porque nos apasionan las mismas cosas: la seguridad, la privacidad, la personalización, la ética y el bien común. Hecho por personas para personas.`,
    verifyTitle: 'No Nos Creas Bajo Palabra',
    verifyDesc: `Todo es transparente. Open source. Puedes verificar por ti mismo que todo lo que hacemos es verdad. Precisamente por eso desarrollamos Protocol-3305 — para nunca abandonar nuestros principios.`,
    protocolLabel: 'Protocolo 3305',
    protocolNote: 'Un Pacto Por La Dignidad',
    values: ['Dignidad', 'Libertad', 'Privacidad', 'Transparencia', 'Respeto', 'Confianza'],
    stats: [
      { nr: '09', label: 'Artículos' },
      { nr: '03', label: 'Proyectos' },
      { nr: '52', label: 'Idiomas' },
      { nr: '100%', label: 'Open Source' },
    ],
    articles: [
      { id: 'ART 00', title: 'Monetización Ética', desc: 'Monetización de datos personales estrictamente prohibida.', pilar: 'Ética' },
      { id: 'ART 01', title: 'Privacy by Design', desc: 'Privacidad integrada en la arquitectura fundamental.', pilar: 'Arquitectura' },
      { id: 'ART 02', title: 'Security by Default', desc: 'Seguridad máxima activada por defecto.', pilar: 'Arquitectura' },
      { id: 'ART 03', title: 'Zero Trust', desc: 'Nunca confíes, siempre verifica.', pilar: 'Arquitectura' },
      { id: 'ART 04', title: 'Zero Knowledge', desc: 'E2EE obligatorio. Proveedores no pueden leer contenido.', pilar: 'Soberanía' },
      { id: 'ART 05', title: 'Cero Datos', desc: 'Sin datos PII almacenados.', pilar: 'Soberanía' },
      { id: 'ART 06', title: 'Cero Registros', desc: 'Sin logs, IPs ni metadatos.', pilar: 'Soberanía' },
      { id: 'ART 07', title: 'Open Source', desc: 'Código abierto para auditoría pública.', pilar: 'Integridad' },
      { id: 'ART 08', title: 'Privilegio Mínimo', desc: 'Solo permisos esenciales.', pilar: 'Integridad' },
    ],
  },
};

const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, delay);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return <div ref={ref} className={`transition-all duration-700 ${className}`} style={{ opacity: 0, transform: 'translateY(24px)' }}>{children}</div>;
};

export const AboutPage: React.FC = () => {
  const [lang, setLang] = React.useState<'ro' | 'en' | 'es'>('ro');
  const c = ABOUT[lang];

  return (
    <div className="min-h-screen bg-[#111] text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden relative">
      <AboutScene />
      <AboutNavbar lang={lang} setLang={setLang} />

      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center px-5 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="max-w-4xl mx-auto text-center pt-24">
            <FadeIn delay={100}>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-px w-8 bg-white/30" />
                <span className="text-white/30 font-mono text-[9px] uppercase tracking-[0.6em] font-bold">{c.heroTag}</span>
                <div className="h-px w-8 bg-white/30" />
              </div>
            </FadeIn>
            <FadeIn delay={250}>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
                {c.heroTitle.split('\n').map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    <span className={i === 0 ? 'text-white' : 'text-white/20'}>{line}</span>
                  </span>
                ))}
              </h1>
            </FadeIn>
            <FadeIn delay={400}>
              <p className="text-sm md:text-base font-mono text-white/30 max-w-xl mx-auto leading-relaxed">
                {c.heroSub}
              </p>
            </FadeIn>
            <FadeIn delay={550}>
              <div className="mt-10 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.4em]">Scroll to explore</span>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {c.stats.map((s, i) => (
                <FadeIn key={s.label} delay={100 + i * 100}>
                  <div className="relative p-6 rounded-2xl border border-white/8 bg-white/[0.015] text-center overflow-hidden">
                    <div className="relative z-10">
                      <div className="text-3xl md:text-4xl font-black text-white/90 mb-1">{s.nr}</div>
                      <div className="text-[9px] font-mono text-white/25 uppercase tracking-[0.3em]">{s.label}</div>
                    </div>
                    <div className="absolute top-3 right-3 flex flex-col gap-0.5 opacity-10">
                      <div className="w-4 h-[1px] bg-white" />
                      <div className="w-2 h-[1px] bg-white self-end" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.whoWeAre}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn delay={100}>
                <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03]"
                       style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                  <div className="relative z-10 space-y-4">
                    {c.whoDesc.split('\n\n').map((p, i) => (
                      <p key={i} className="text-sm md:text-base font-mono text-white/60 leading-relaxed">{p}</p>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-15">
                    <div className="w-5 h-[1px] bg-white" />
                    <div className="w-2.5 h-[1px] bg-white self-end" />
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={250}>
                <div className="flex flex-wrap content-start gap-3">
                  {c.values.map((v, i) => (
                    <span key={v}
                      className="px-4 py-2 rounded-full border border-white/8 bg-white/[0.02] text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] hover:border-white/20 hover:text-white/60 transition-all duration-300"
                      style={{ animation: `menuItemIn 0.4s ${0.3 + i * 0.08}s forwards`, opacity: 0, transform: 'translateY(8px)' }}
                    >
                      {v}
                    </span>
                  ))}
                  <style>{`@keyframes menuItemIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Why We Started + Verify */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.whyTitle}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              <FadeIn delay={100}>
                <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
                  <div className="absolute inset-0 opacity-[0.03]"
                       style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                  <div className="relative z-10 space-y-4">
                    {c.whyDesc.split('\n\n').map((p, i) => (
                      <p key={i} className="text-sm md:text-base font-mono text-white/60 leading-relaxed">{p}</p>
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-15">
                    <div className="w-5 h-[1px] bg-white" />
                    <div className="w-2.5 h-[1px] bg-white self-end" />
                  </div>
                </div>
              </FadeIn>
              <FadeIn delay={250}>
                <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.03] blur-[80px] rounded-full" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">{c.verifyTitle.toUpperCase()}</span>
                    </div>
                    <p className="text-sm md:text-base font-mono text-white/60 leading-relaxed">{c.verifyDesc}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-15">
                    <div className="w-5 h-[1px] bg-white" />
                    <div className="w-2.5 h-[1px] bg-white self-end" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Protocol */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.protocolLabel}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">{c.protocolNote}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {c.articles.map((a, i) => (
                      <div key={a.id}
                        className="p-3.5 rounded-xl border border-white/5 bg-black/40 hover:bg-white/[0.015] hover:border-white/15 transition-all duration-300"
                        style={{ animation: `artIn 0.4s ${0.1 + i * 0.05}s forwards`, opacity: 0, transform: 'translateY(12px)' }}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[8px] font-mono text-white/30 tracking-wider">{a.id}</span>
                          <span className="text-[6px] font-mono text-white/15 uppercase tracking-[0.2em] bg-white/5 px-2 py-0.5 rounded-full">{a.pilar}</span>
                        </div>
                        <h4 className="text-xs md:text-sm font-black uppercase tracking-tight text-white/80 mb-1">{a.title}</h4>
                        <p className="text-[9px] font-mono text-white/35 leading-relaxed">{a.desc}</p>
                      </div>
                    ))}
                  </div>
                  <style>{`@keyframes artIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
                </div>
                <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-15">
                  <div className="w-5 h-[1px] bg-white" />
                  <div className="w-2.5 h-[1px] bg-white self-end" />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/5 px-5 bg-[#111]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <Logo className="w-8 h-8" glow={false} color="#fff" />
              <div className="flex flex-col">
                <span className="font-black tracking-[0.3em] uppercase text-xs leading-none text-white">ObscuritySecurity</span>
                <span className="text-[7px] font-mono text-white/15 uppercase tracking-[0.4em] mt-1">Non Profit</span>
              </div>
            </div>
            <p className="text-[9px] font-mono text-white/15 uppercase tracking-[0.6em]">
              ©2024 OBSCURITYSECURITY
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
