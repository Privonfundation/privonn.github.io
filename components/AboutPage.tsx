import React, { useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { AboutScene } from './AboutScene';
import { AboutNavbar } from './AboutNavbar';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

interface AboutPageProps {
  lang: 'ro' | 'en' | 'es';
}

const ABOUT = {
  ro: {
    founderTitle: 'FONDATOR',
    founderName: 'WTSHEX — 18 ani, România',
    founderStory: `Am început ObscuritySecurity de pe telefon. Nu aveam laptop, nu aveam echipă, nu aveam funding. Aveam doar o frustrare: giganții tehnologici ne tratează ca produse, nu ca oameni.

Sunt autodidact în:
    • Cybersecurity
    • Digital design
    • Privacy
    • Artificial intelligence (ca tool de dezvoltare)

Viziunea mea:
    Să fac intimitatea standard. Nu opțional, nu premium, nu "pentru cei care au bani". Standard.
    Să scriu standarde, nu doar să le respect.
    Să construiesc unelte care protejează oameni, nu să monetizeze oameni.
    Să demonstrez că un singur om, la 18 ani, cu un telefon, poate construi alternativa la industrii de miliarde.

De ce ObscuritySecurity:
    Pentru că "obscurity" nu e ascundere — e demnitatea de a exista fără a fi urmărit, profilat, vândut.
    Pentru că securitatea nu e un lux — e un drept.
    Pentru că libertatea digitală e libertate reală.`,
    heroTag: 'Prezentare Generală',
    heroTitle: 'Oameni.\nNu Utilizatori.',
    heroSub: 'ObscuritySecurity — construim pentru libertatea digitală',
    whoWeAre: 'Cine Suntem',
    whoDesc: `Suntem ObscuritySecurity. Nu suntem încă înregistrați oficial, dar operăm pe principii nonprofit — și suntem 100% transparenți în privința asta. Punem Omul pe primul loc, înaintea profitului. Avem principii și valori și credem că libertatea, securitatea, anonimatul, intimitatea, personalizarea și transparența sunt factori esențiali.

Planificăm să ne înregistrăm oficial în sistemul juridic din Elveția, pentru a oferi un cadru legal solid și transparent.

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
    founderTitle: 'FOUNDER',
    founderName: 'WTSHEX — 18 years old, Romania',
    founderStory: `I started ObscuritySecurity from my phone. I had no laptop, no team, no funding. I only had one frustration: tech giants treat us like products, not people.

I am self-taught in:
    • Cybersecurity
    • Digital design
    • Privacy
    • Artificial intelligence (as a development tool)

My vision:
    To make privacy the standard. Not optional, not premium, not "for those who can afford it." Standard.
    To write standards, not just follow them.
    To build tools that protect people, not monetize people.
    To prove that one person, at 18, with a phone, can build the alternative to billion-dollar industries.

Why ObscuritySecurity:
    Because "obscurity" is not hiding — it is the dignity of existing without being tracked, profiled, sold.
    Because security is not a luxury — it is a right.
    Because digital freedom is real freedom.`,
    heroTag: 'Overview',
    heroTitle: 'People.\nNot Users.',
    heroSub: 'ObscuritySecurity — engineering for digital freedom',
    whoWeAre: 'Who We Are',
    whoDesc: `We are ObscuritySecurity. We are not yet officially registered, but we operate on nonprofit principles — and we are 100% transparent about it. We put the Human first, before profit. We have principles and values, and we believe that freedom, security, anonymity, privacy, personalization, and transparency are essential factors.

We plan to officially register under Swiss jurisdiction, to provide a solid and transparent legal framework.

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
    founderTitle: 'FUNDADOR',
    founderName: 'WTSHEX — 18 años, Rumania',
    founderStory: `Empecé ObscuritySecurity desde mi teléfono. No tenía laptop, no tenía equipo, no tenía financiación. Solo tenía una frustración: los gigantes tecnológicos nos tratan como productos, no como personas.

Soy autodidacta en:
    • Cybersecurity
    • Digital design
    • Privacy
    • Artificial intelligence (como herramienta de desarrollo)

Mi visión:
    Hacer de la privacidad el estándar. No opcional, no premium, no "para los que pueden pagarlo". Estándar.
    Escribir estándares, no solo seguirlos.
    Construir herramientas que protejan a las personas, no que mercantilicen a las personas.
    Demostrar que una sola persona, a los 18 años, con un teléfono, puede construir la alternativa a industrias de miles de millones.

Por qué ObscuritySecurity:
    Porque "obscurity" no es ocultarse — es la dignidad de existir sin ser rastreado, perfilado, vendido.
    Porque la seguridad no es un lujo — es un derecho.
    Porque la libertad digital es libertad real.`,
    heroTag: 'Descripción General',
    heroTitle: 'Personas.\nNo Usuarios.',
    heroSub: 'ObscuritySecurity — construyendo para la libertad digital',
    whoWeAre: 'Quiénes Somos',
    whoDesc: `Somos ObscuritySecurity. Aún no estamos registrados oficialmente, pero operamos bajo principios sin fines de lucro — y somos 100% transparentes al respecto. Ponemos a las personas en primer lugar, antes que el beneficio. Tenemos principios y valores, y creemos que la libertad, la seguridad, el anonimato, la privacidad, la personalización y la transparencia son factores esenciales.

Planeamos registrarnos oficialmente bajo la jurisdicción suiza, para proporcionar un marco legal sólido y transparente.

Nuestra filosofía: vemos a la persona detrás de la pantalla. Para nosotros no existen usuarios — creemos que la seguridad nunca debería ser un lujo, sino una funcionalidad necesaria en cualquier software.

Estamos aquí para hacer de la privacidad un estándar. Amamos la transparencia, así que todos nuestros proyectos son de código abierto.`,
    whyTitle: 'Por Qué Empezamos',
    whyDesc: `Empezamos por la frustración de que grandes gigantes como Google, Microsoft y otros dominan el mercado global. Nacimos para ofrecer una alternativa ética que pone a las personas primero, con énfasis en la comunidad.

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
  const { lang, setLang } = useLanguage();
  const c = ABOUT[lang];

  return (
    <>
      <Seo
        title="About Us"
        description="We are ObscuritySecurity — a privacy-first, open-source organization. We put the Human first, before profit. Freedom, security, anonymity, and transparency."
        path="/about"
      />
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

        {/* Founder */}
        <section className="py-20 md:py-28 px-5">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-white/30" />
                <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.founderTitle}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="relative p-6 md:p-10 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                     style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <img src="/wtshex.png" alt="WTSHEX"
                      className="w-28 h-28 md:w-36 md:h-36 rounded-full border border-white/10 object-cover"
                      style={{ filter: 'grayscale(1)' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white mb-1">{c.founderName}</h3>
                    <div className="w-12 h-px bg-white/20 mb-4" />
                    <div className="space-y-3 font-mono text-[11px] md:text-[12px] text-white/50 leading-relaxed whitespace-pre-line">
                      {c.founderStory}
                    </div>
                  </div>
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
          <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
            <div className="flex items-center gap-6">
              {[
                { href: 'https://github.com/ObscuritySecurity', label: 'GitHub', icon: '<svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4"><path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656"/></svg>' },
                { href: 'https://matrix.to/#/#obscuritysecurity:matrix.org', label: 'Matrix', icon: '<svg viewBox="0 0 32 32" fill="currentColor" className="w-4 h-4"><path d="M 30,2.0000001 V 30 h -1 -2 v 2 h 5 V -3.3333334e-8 L 27,0 v 2 z"/><path d="M 9.9515939,10.594002 V 12.138 h 0.043994 c 0.3845141,-0.563728 0.8932271,-1.031728 1.4869981,-1.368 0.580003,-0.322998 1.244999,-0.485 1.993002,-0.485 0.72,0 1.376999,0.139993 1.971998,0.42 0.595,0.279004 1.047001,0.771001 1.355002,1.477001 0.338003,-0.500001 0.795999,-0.941 1.376999,-1.323001 0.579999,-0.382998 1.265998,-0.574 2.059998,-0.574 0.602003,0 1.160002,0.074 1.674002,0.220006 0.514,0.148006 0.953998,0.382998 1.321999,0.706998 0.36601,0.322999 0.653001,0.746 0.859,1.268002 0.205001,0.521998 0.307994,1.15 0.307994,1.887001 v 7.632997 h -3.127 v -6.463997 c 0,-0.383002 -0.01512,-0.743002 -0.04399,-1.082003 -0.02079,-0.3072 -0.103219,-0.607113 -0.242003,-0.881998 -0.133153,-0.25081 -0.335962,-0.457777 -0.584001,-0.596002 -0.257008,-0.146003 -0.605998,-0.220006 -1.046997,-0.220006 -0.440002,0 -0.796003,0.085 -1.068,0.253002 -0.272013,0.170003 -0.485001,0.390002 -0.639001,0.662003 -0.159119,0.287282 -0.263585,0.601602 -0.307994,0.926997 -0.05197,0.346923 -0.07801,0.697217 -0.07801,1.048002 v 6.353999 h -3.128005 v -6.398 c 0,-0.338003 -0.0072,-0.673001 -0.02116,-1.004001 -0.01134,-0.313663 -0.07487,-0.623229 -0.187994,-0.915999 -0.107943,-0.276623 -0.300435,-0.512126 -0.550001,-0.673001 -0.25799,-0.168 -0.636,-0.253002 -1.134999,-0.253002 -0.198123,0.0083 -0.394383,0.04195 -0.584002,0.100006 -0.258368,0.07446 -0.498455,0.201827 -0.704999,0.373985 -0.227981,0.183987 -0.421999,0.449 -0.583997,0.794003 -0.161008,0.345978 -0.242003,0.797998 -0.242003,1.356998 v 6.618999 H 6.99942 V 10.590001 Z"/><path d="M 2,2.0000001 V 30 h 3 v 2 H 0 V 9.2650922e-8 L 5,0 v 2 z"/></svg>' },
                { href: 'https://mastodon.social/@ObscuritySecurity', label: 'Mastodon', icon: '<svg viewBox="0 0 74 79" fill="currentColor" className="w-4 h-4"><path d="M73.7014 17.9592C72.5616 9.62034 65.1774 3.04876 56.424 1.77536C54.9472 1.56019 49.3517 0.7771 36.3901 0.7771H36.2933C23.3281 0.7771 20.5465 1.56019 19.0697 1.77536C10.56 3.01348 2.78877 8.91838 0.903306 17.356C-0.00357857 21.5113 -0.100361 26.1181 0.068112 30.3439C0.308275 36.404 0.354874 42.4535 0.91406 48.489C1.30064 52.498 1.97502 56.4751 2.93215 60.3905C4.72441 67.6217 11.9795 73.6395 19.0876 76.0945C26.6979 78.6548 34.8821 79.0799 42.724 77.3221C43.5866 77.1245 44.4398 76.8953 45.2833 76.6342C47.1867 76.0381 49.4199 75.3714 51.0616 74.2003C51.0841 74.1839 51.1026 74.1627 51.1156 74.1382C51.1286 74.1138 51.1359 74.0868 51.1368 74.0592V68.2108C51.1364 68.185 51.1302 68.1596 51.1185 68.1365C51.1069 68.1134 51.0902 68.0932 51.0695 68.0773C51.0489 68.0614 51.0249 68.0503 50.9994 68.0447C50.9738 68.0391 50.9473 68.0392 50.9218 68.045C45.8976 69.226 40.7491 69.818 35.5836 69.8087C26.694 69.8087 24.3031 65.6569 23.6184 63.9285C23.0681 62.4347 22.7186 60.8764 22.5789 59.2934C22.5775 59.2669 22.5825 59.2403 22.5934 59.216C22.6043 59.1916 22.621 59.1702 22.6419 59.1533C22.6629 59.1365 22.6876 59.1248 22.714 59.1191C22.7404 59.1134 22.7678 59.1139 22.794 59.1206C27.7345 60.2936 32.799 60.8856 37.8813 60.8843C39.1036 60.8843 40.3223 60.8843 41.5447 60.8526C46.6562 60.7115 52.0437 60.454 57.0728 59.4874C57.1983 59.4628 57.3237 59.4416 57.4313 59.4098C65.3638 57.9107 72.9128 53.2051 73.6799 41.2895C73.7086 40.8204 73.7803 36.3758 73.7803 35.889C73.7839 34.2347 74.3216 24.1533 73.7014 17.9592ZM61.4925 47.6918H53.1514V27.5855C53.1514 23.3526 51.3591 21.1938 47.7136 21.1938C43.7061 21.1938 41.6988 23.7476 41.6988 28.7919V39.7974H33.4078V28.7919C33.4078 23.7476 31.3969 21.1938 27.3894 21.1938C23.7654 21.1938 21.9552 23.3526 21.9516 27.5855V47.6918H13.6176V26.9752C13.6176 22.7423 14.7157 19.3795 16.9118 16.8868C19.1772 14.4 22.1488 13.1231 25.8373 13.1231C30.1064 13.1231 33.3325 14.7386 35.4832 17.9662L37.5587 21.3949L39.6377 17.9662C41.7884 14.7386 45.0145 13.1231 49.2765 13.1231C52.9614 13.1231 55.9329 14.4 58.2055 16.8868C60.4017 19.3772 61.4997 22.74 61.4997 26.9752L61.4925 47.6918Z"/></svg>' },
                { href: 'https://pixelfed.social/i/web/profile/ObscuritySecurity', label: 'Pixelfed', icon: '<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 24C5.3726 24 0 18.6274 0 12S5.3726 0 12 0s12 5.3726 12 12-5.3726 12-12 12m-.9526-9.3802h2.2014c2.0738 0 3.7549-1.6366 3.7549-3.6554S15.3226 7.309 13.2488 7.309h-3.1772c-1.1964 0-2.1663.9442-2.1663 2.1089v8.208z"/></svg>' },
                { href: 'https://lemmy.world/c/obscuritysecurity', label: 'Lemmy', icon: '<svg viewBox="0 0 1024 1024" fill="currentColor" className="w-4 h-4"><path d="m 167.03908,270.78735 c -0.94784,-0.002 -1.8939,0.004 -2.83789,0.0215 -4.31538,0.0778 -8.58934,0.3593 -12.8125,0.8457 -33.78522,3.89116 -64.215716,21.86394 -82.871086,53.27344 -18.27982,30.77718 -22.77749,64.66635 -13.46094,96.06837 9.31655,31.40203 31.88488,59.93174 65.296886,82.5332 0.20163,0.13618 0.40678,0.26709 0.61523,0.39258 28.65434,17.27768 57.18167,28.93179 87.74218,34.95508 -0.74566,12.61339 -0.72532,25.5717 0.082,38.84375 2.43989,40.10943 16.60718,77.03742 38.0957,109.67187 l -77.00781,31.4375 c -8.30605,3.25932 -12.34178,12.68234 -8.96967,20.94324 3.37211,8.2609 12.84919,12.16798 21.06342,8.68371 l 84.69727,-34.57617 c 15.70675,18.72702 33.75346,35.68305 53.12109,50.57032 0.74013,0.56891 1.4904,1.12236 2.23437,1.68554 l -49.61132,65.69141 c -5.45446,7.0474 -4.10058,17.19288 3.01098,22.5634 7.11156,5.37052 17.24028,3.89649 22.52612,-3.27824 l 50.38672,-66.71876 c 27.68572,17.53469 57.07524,31.20388 86.07227,40.25196 14.88153,27.28008 43.96965,44.64648 77.58789,44.64648 33.93762,0 63.04252,-18.68693 77.80082,-45.4375 28.7072,-9.21295 57.7527,-22.93196 85.1484,-40.40234 l 51.0977,67.66016 c 5.2858,7.17473 15.4145,8.64876 22.5261,3.27824 7.1115,-5.37052 8.4654,-15.516 3.011,-22.5634 l -50.3614,-66.68555 c 0.334,-0.25394 0.6727,-0.50077 1.0059,-0.75586 19.1376,-14.64919 37.0259,-31.28581 52.7031,-49.63476 l 82.5625,33.70507 c 8.2143,3.48427 17.6913,-0.42281 21.0634,-8.68371 3.3722,-8.2609 -0.6636,-17.68392 -8.9696,-20.94324 l -74.5391,-30.42773 c 22.1722,-32.82971 37.0383,-70.03397 40.1426,-110.46094 1.0253,-13.35251 1.2292,-26.42535 0.6387,-39.17578 30.3557,-6.05408 58.7164,-17.66833 87.2011,-34.84375 0.2085,-0.12549 0.4136,-0.2564 0.6153,-0.39258 33.412,-22.60147 55.9803,-51.13117 65.2968,-82.5332 9.3166,-31.40202 4.8189,-65.29118 -13.4609,-96.06837 -18.6553,-31.40951 -49.0859,-49.38228 -82.8711,-53.27344 -4.2231,-0.4864 -8.4971,-0.76791 -12.8125,-0.8457 -30.2077,-0.54448 -62.4407,8.82427 -93.4316,26.71484 -22.7976,13.16063 -43.3521,33.31423 -59.4375,55.30469 -44.9968,-25.75094 -103.5444,-40.25065 -175.4785,-41.43945 -6.4522,-0.10663 -13.0125,-0.10696 -19.67974,0.002 -80.18875,1.30929 -144.38284,16.5086 -192.87109,43.9922 -0.11914,-0.19111 -0.24287,-0.37932 -0.37109,-0.56446 -16.29,-22.764 -37.41085,-43.73706 -60.89649,-57.29493 -30.02247,-17.33149 -61.21051,-26.66489 -90.59375,-26.73633 z M 801.23205,576.8699 C 812.73478,427.06971 720.58431,321.98291 511.99999,325.38859 303.41568,328.79426 213.71393,428.0311 222.76794,576.8699 c 8.64289,142.08048 176.80223,246.40388 288.12038,246.40388 111.31815,0 279.45076,-104.5447 290.34373,-246.40388 z M 610.4991,644.28932 c 0,23.11198 18.70595,41.84795 41.78091,41.84795 23.07495,0 41.7809,-18.73597 41.7809,-41.84795 0,-23.112 -18.70594,-41.84796 -41.7809,-41.84796 -23.07496,0 -41.78091,18.73596 -41.78091,41.84796 z m -280.56002,0 c 0,23.32492 18.87829,42.23352 42.16586,42.23352 23.28755,0 42.16585,-18.9086 42.16585,-42.23352 0,-23.32494 -18.87829,-42.23353 -42.16585,-42.23353 -23.28757,0 -42.16586,18.90859 -42.16586,42.23353 z"/></svg>' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300"
                  dangerouslySetInnerHTML={{ __html: s.icon }} />
              ))}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
              <div className="flex items-center gap-4">
                <Logo className="w-8 h-8" glow={false} color="#fff" />
                <div className="flex flex-col">
                  <span className="font-black tracking-[0.3em] uppercase text-xs leading-none text-white">ObscuritySecurity</span>
                  <span className="text-[7px] font-mono text-white/50 uppercase tracking-[0.4em] mt-1">For People</span>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-1">
                <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.6em]">
                  ©2026 OBSCURITYSECURITY — AGPL-3.0
                </p>
                <p className="text-[7px] font-mono text-white/25 uppercase tracking-[0.4em]">
                  All projects &amp; this website are AGPL-3.0
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </div>
    </>
  );
};
