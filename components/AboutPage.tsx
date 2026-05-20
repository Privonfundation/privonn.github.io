import React, { useEffect, useRef } from 'react';
import { Logo } from './Logo';
import { AboutScene } from './AboutScene';
import { AboutNavbar } from './AboutNavbar';

interface AboutPageProps {
  lang: 'ro' | 'en' | 'es';
}

const ABOUT_CONTENT = {
  ro: {
    label: 'Despre Noi',
    whoWeAre: 'Cine Suntem',
    whyWeStarted: 'De Ce Am Început',
    verifyTitle: 'Nu Ne Crede Pe Cuvânt',
    verifyDescription: `Aici nu suntem tipica organizație sau companie care îți vinde intimitatea sau face marketing. Totul este transparent. Open source. Puteți să verificați singuri că tot ce facem este adevărat.

    Tocmai din acest motiv am dezvoltat Protocol-3305 — ca niciodată să nu ne abandonăm principiile.`,
    protocolLabel: 'Protocol 3305',
    protocolNote: 'Un Pact Pentru Demnitate',
    protocolArticles: [
      { id: 'ART 00', title: 'Monetizare Etică', desc: 'Monetizarea datelor personale este strict interzisă. Modelele de business trebuie decuplate de supraveghere.', pilar: 'Etică' },
      { id: 'ART 01', title: 'Privacy by Design', desc: 'Confidențialitatea este integrată în arhitectura fundamentală pentru a minimiza colectarea datelor de la zero.', pilar: 'Arhitectură' },
      { id: 'ART 02', title: 'Security by Default', desc: 'Cele mai înalte setări de securitate sunt activate implicit. Siguranța este starea standard.', pilar: 'Arhitectură' },
      { id: 'ART 03', title: 'Zero Trust', desc: 'Niciodată nu ai încredere, întotdeauna verifici. Accesul este acordat granular și validat continuu.', pilar: 'Arhitectură' },
      { id: 'ART 04', title: 'Zero Knowledge', desc: 'E2EE este obligatoriu. Furnizorii trebuie să fie structural incapabili să citească conținutul oamenilor.', pilar: 'Suveranitate' },
      { id: 'ART 05', title: 'Zero Date Personale', desc: 'Fără date PII stocate dincolo de funcționalitatea absolută. Sistemele nu pot profila oamenii.', pilar: 'Suveranitate' },
      { id: 'ART 06', title: 'Zero Jurnale de Activitate', desc: 'Fără log-uri de activitate, adrese IP sau metadate folosite pentru a urmări comportamentul.', pilar: 'Suveranitate' },
      { id: 'ART 07', title: 'Open Source', desc: 'Transparența înseamnă încredere. Tot codul trebuie să fie deschis pentru audit public.', pilar: 'Integritate' },
      { id: 'ART 08', title: 'Privilegiu Minim', desc: 'Sunt solicitate doar permisiunile esențiale. Fără posibilitatea de abuz prin acces nenecesar.', pilar: 'Integritate' },
    ],
    startedDescription: `Am început printr-o frustrare că giganții mari, cum ar fi Google, Microsoft și alții bine cunoscuți, domină piața globală. Ne-am născut din acest motiv să oferim o alternativă la oameni etică care îi pune pe primul loc, cu accent foarte mare pe comunitate și nu pe profit.

    Pentru că ne pasionează aceleași lucruri: securitatea, intimitatea, personalizarea, etica și binele comun. De asta suntem aici — făcut de oameni pentru oameni.`,
    whoWeAreTitle: 'Cine Suntem',
    description: `Suntem ObscuritySecurity, o organizație nonprofit care pune Omul pe primul loc, înaintea profitului. Avem principii și valori negociabile și credem că libertatea, securitatea, anonimatul, intimitatea, personalizarea și transparența sunt factori esențiali.

    Filozofia noastră: vedem persoana din spatele ecranului. Pentru noi nu există utilizatori — mai mult de atât, credem că securitatea nu ar trebui să fie niciodată un lux, ci o funcționalitate necesară care se oferă în orice software gratuit.

    Suntem aici ca să facem intimitatea standard. Iubim transparența, așa că toate proiectele noastre sunt cu cod deschis.`
  },
  en: {
    label: 'About Us',
    whoWeAre: 'Who We Are',
    whyWeStarted: 'Why We Started',
    verifyTitle: "Don't Take Our Word For It",
    verifyDescription: `We are not the typical organization or company that sells you privacy or does marketing. Everything is transparent. Open source. You can verify for yourself that everything we do is true.

    That's exactly why we developed Protocol-3305 — to never abandon our principles.`,
    protocolLabel: 'Protocol 3305',
    protocolNote: 'A Pact For Dignity',
    protocolArticles: [
      { id: 'ART 00', title: 'Ethical Monetization', desc: 'The monetization of personal data is strictly forbidden. Business models must be decoupled from surveillance.', pilar: 'Ethics' },
      { id: 'ART 01', title: 'Privacy by Design', desc: 'Privacy integrated into the fundamental architecture to minimize data collection from ground zero.', pilar: 'Architecture' },
      { id: 'ART 02', title: 'Security by Default', desc: 'Highest security settings enabled by default. Safety is the standard state, not a user option.', pilar: 'Architecture' },
      { id: 'ART 03', title: 'Zero Trust', desc: 'Never trust, always verify. Access is granted granularly and continuously validated.', pilar: 'Architecture' },
      { id: 'ART 04', title: 'Zero Knowledge', desc: 'E2EE is mandatory. Service providers must be structurally unable to read person-generated content.', pilar: 'Sovereignty' },
      { id: 'ART 05', title: 'Zero Personal Data', desc: 'No PII stored beyond absolute functionality. Systems cannot possess info that profiles people.', pilar: 'Sovereignty' },
      { id: 'ART 06', title: 'Zero Activity Logs', desc: 'No logs of activity, IP addresses, or metadata used to track behavior or session times.', pilar: 'Sovereignty' },
      { id: 'ART 07', title: 'Open Source', desc: 'Transparency is trust. All code must be open for public audit and global community validation.', pilar: 'Integrity' },
      { id: 'ART 08', title: 'Least Privilege', desc: 'Only essential permissions requested. No possibility of abuse through unnecessary access.', pilar: 'Integrity' },
    ],
    startedDescription: `We started out of frustration that big giants like Google, Microsoft and other well-known ones dominate the global market. We were born to offer an ethical alternative to people who put them first, with a great emphasis on community over profit.

Because we're passionate about the same things: security, privacy, personalization, ethics and the common good. That's why we're here — made by people for people.`,
    whoWeAreTitle: 'Who We Are',
    description: `We are ObscuritySecurity, a non-profit organization that puts the Human first, before profit. We have negotiable principles and values, and we believe that freedom, security, anonymity, privacy, personalization, and transparency are essential factors.

Our philosophy: we see the person behind the screen. For us, there are no "users" — more than that, we believe security should never be a luxury, but a necessary feature provided in any free software.

We are here to make privacy the standard. We love transparency, so all our projects are open source.`
  },
  es: {
    label: 'Sobre Nosotros',
    whoWeAre: 'Quiénes Somos',
    whyWeStarted: 'Por Qué Empezamos',
    verifyTitle: 'No Nos Creas Bajo Palabra',
    verifyDescription: `Aquí no somos la típica organización o empresa que te vende privacidad o hace marketing. Todo es transparente. Open source. Puedes verificar por ti mismo que todo lo que hacemos es verdad.

    Precisamente por eso desarrollamos Protocol-3305 — para nunca abandonar nuestros principios.`,
    protocolLabel: 'Protocolo 3305',
    protocolNote: 'Un Pacto Por La Dignidad',
    protocolArticles: [
      { id: 'ART 00', title: 'Monetización Ética', desc: 'La monetización de datos personales está estrictamente prohibida. Los modelos de negocio deben estar desacoplados de la vigilancia.', pilar: 'Ética' },
      { id: 'ART 01', title: 'Privacy by Design', desc: 'La privacidad integrada en la arquitectura fundamental para minimizar la recolección de datos desde cero.', pilar: 'Arquitectura' },
      { id: 'ART 02', title: 'Security by Default', desc: 'Las configuraciones de seguridad más altas están activadas por defecto. La seguridad es el estado estándar.', pilar: 'Arquitectura' },
      { id: 'ART 03', title: 'Zero Trust', desc: 'Nunca confíes, siempre verifica. El acceso se otorga de forma granular y se valida continuamente.', pilar: 'Arquitectura' },
      { id: 'ART 04', title: 'Zero Knowledge', desc: 'E2EE es obligatorio. Los proveedores deben ser estructuralmente incapaces de leer el contenido de las personas.', pilar: 'Soberanía' },
      { id: 'ART 05', title: 'Cero Datos Personales', desc: 'No se almacenan datos PII más allá de la funcionalidad absoluta. Los sistemas no pueden perfilar a las personas.', pilar: 'Soberanía' },
      { id: 'ART 06', title: 'Cero Registros de Actividad', desc: 'Sin registros de actividad, direcciones IP o metadatos utilizados para rastrear el comportamiento.', pilar: 'Soberanía' },
      { id: 'ART 07', title: 'Open Source', desc: 'La transparencia es confianza. Todo el código debe estar abierto para auditoría pública.', pilar: 'Integridad' },
      { id: 'ART 08', title: 'Privilegio Mínimo', desc: 'Solo se solicitan los permisos esenciales. Sin posibilidad de abuso por acceso innecesario.', pilar: 'Integridad' },
    ],
    startedDescription: `Empezamos por la frustración de que grandes gigantes como Google, Microsoft y otros bien conocidos dominen el mercado global. Nacimos para ofrecer una alternativa ética a las personas que los pone en primer lugar, con un gran énfasis en la comunidad y no en el lucro.

    Porque nos apasionan las mismas cosas: la seguridad, la privacidad, la personalización, la ética y el bien común. Por eso estamos aquí — hecho por personas para personas.`,
    whoWeAreTitle: 'Quiénes Somos',
    description: `Somos ObscuritySecurity, una organización sin fines de lucro que pone al Humano en primer lugar, antes del lucro. Tenemos principios y valores negociables y creemos que la libertad, la seguridad, el anonimato, la privacidad, la personalización y la transparencia son factores esenciales.

    Nuestra filosofía: vemos a la persona detrás de la pantalla. Para nosotros no existen "usuarios" — más que eso, creemos que la seguridad nunca debería ser un lujo, sino una funcionalidad necesaria que se ofrece en cualquier software gratuito.

    Estamos aquí para hacer de la privacidad un estándar. Amamos la transparencia, así que todos nuestros proyectos son de código abierto.`
  }
};

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('opacity-100', 'translate-y-0'); el.classList.remove('opacity-0', 'translate-y-8'); }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-4 mb-6 md:mb-8">
    <div className="h-px w-10 md:w-12 bg-white/30" />
    <span className="text-white/40 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{title}</span>
    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
  </div>
);

export const AboutPage: React.FC = () => {
  const [lang, setLang] = React.useState<'ro' | 'en' | 'es'>('ro');
  const content = ABOUT_CONTENT[lang];
  const logoRef = useReveal();
  const whoRef = useReveal();
  const whyRef = useReveal();
  const verifyRef = useReveal();
  const protocolRef = useReveal();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden relative">
      <AboutScene />
      <AboutNavbar lang={lang} setLang={setLang} />

      <div className="relative z-10 pt-40 pb-16 px-5 max-w-5xl mx-auto">
        {/* Logo hero */}
        <div ref={logoRef} className="transition-all duration-700 opacity-0 translate-y-8 mb-20 md:mb-28 text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
            <div className="relative w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full border border-white/10 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <Logo className="w-16 h-16 md:w-20 md:h-20" glow={true} />
            </div>
          </div>
        </div>

        {/* Who We Are */}
        <section ref={whoRef} className="transition-all duration-700 opacity-0 translate-y-8 mb-20 md:mb-28">
          <SectionTitle title={content.whoWeAreTitle} />
          <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 space-y-5">
              {content.description.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm md:text-base font-mono text-white/60 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-20">
              <div className="w-5 h-[1px] bg-white" />
              <div className="w-2.5 h-[1px] bg-white self-end" />
            </div>
          </div>
        </section>

        {/* Why We Started */}
        <section ref={whyRef} className="transition-all duration-700 opacity-0 translate-y-8 mb-20 md:mb-28">
          <SectionTitle title={content.whyWeStarted} />
          <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 space-y-5">
              {content.startedDescription.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm md:text-base font-mono text-white/60 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-20">
              <div className="w-5 h-[1px] bg-white" />
              <div className="w-2.5 h-[1px] bg-white self-end" />
            </div>
          </div>
        </section>

        {/* Verify */}
        <section ref={verifyRef} className="transition-all duration-700 opacity-0 translate-y-8 mb-20 md:mb-28">
          <SectionTitle title={content.verifyTitle} />
          <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10 space-y-5">
              {content.verifyDescription.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm md:text-base font-mono text-white/60 leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-20">
              <div className="w-5 h-[1px] bg-white" />
              <div className="w-2.5 h-[1px] bg-white self-end" />
            </div>
          </div>
        </section>

        {/* Protocol articles */}
        <section ref={protocolRef} className="transition-all duration-700 opacity-0 translate-y-8 mb-16">
          <SectionTitle title={content.protocolLabel} />
          <div className="relative p-6 md:p-8 rounded-2xl border border-white/8 bg-white/[0.015] overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03]"
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">{content.protocolNote}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {content.protocolArticles.map((a, i) => (
                  <div key={a.id} className="p-3.5 rounded-xl border border-white/5 bg-black/40 hover:bg-white/[0.015] hover:border-white/15 transition-all duration-300"
                       style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[8px] font-mono text-white/30 tracking-wider">{a.id}</span>
                      <span className="text-[6px] font-mono text-white/15 uppercase tracking-[0.2em] bg-white/5 px-2 py-0.5 rounded-full">{a.pilar}</span>
                    </div>
                    <h4 className="text-xs md:text-sm font-black uppercase tracking-tight text-white/80 mb-1">{a.title}</h4>
                    <p className="text-[9px] font-mono text-white/35 leading-relaxed">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-4 right-4 flex flex-col gap-0.5 opacity-20">
              <div className="w-5 h-[1px] bg-white" />
              <div className="w-2.5 h-[1px] bg-white self-end" />
            </div>
          </div>
        </section>
      </div>

      <footer className="py-12 border-t border-white/5 px-5 bg-black relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[10px] font-mono text-white/15 uppercase tracking-[0.6em]">
            ©2024 OBSCURITYSECURITY_NON_PROFIT
          </p>
        </div>
      </footer>
    </div>
  );
};
