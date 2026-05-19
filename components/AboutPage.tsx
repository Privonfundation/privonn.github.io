import React from 'react';
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
    verifyTitle: 'Don\'t Take Our Word For It',
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

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center justify-center gap-4 mb-8">
    <div className="h-[1px] w-12 md:w-16 bg-[#ffffff]"></div>
    <span className="text-[#ffffff] font-mono text-[10px] uppercase tracking-[0.5em] font-bold">
      {title}
    </span>
    <div className="h-[1px] w-12 md:w-16 bg-[#ffffff]"></div>
  </div>
);

export const AboutPage: React.FC = () => {
  const [lang, setLang] = React.useState<'ro' | 'en' | 'es'>('ro');
  const content = ABOUT_CONTENT[lang];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden relative">
      <AboutScene />
      <AboutNavbar lang={lang} setLang={setLang} />

      <div className="min-h-screen flex items-center justify-center py-32 px-5 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal-text active mb-16">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-[#ffffff]/30 blur-2xl rounded-full animate-pulse pointer-events-none"></div>
              <div className="relative w-36 h-36 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden border-2 border-[#ffffff]/60 shadow-[0_0_40px_rgba(255,255,255,0.3)] bg-black/80 backdrop-blur-sm flex items-center justify-center">
                <Logo className="w-24 h-24 md:w-32 md:h-32" glow={true} />
              </div>
            </div>
          </div>

          <SectionTitle title={content.whoWeAreTitle} />

          <div className="reveal-text active space-y-8 text-left mb-16">
            {content.description.split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-base md:text-lg font-mono text-white/70 leading-relaxed"
                style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <SectionTitle title={content.whyWeStarted} />

          <div className="reveal-text active space-y-8 text-left mb-16">
            {content.startedDescription.split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-base md:text-lg font-mono text-white/70 leading-relaxed"
                style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <SectionTitle title={content.verifyTitle} />

          <div className="reveal-text active space-y-8 text-left mb-12">
            {content.verifyDescription.split('\n\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-base md:text-lg font-mono text-white/70 leading-relaxed"
                style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="relative group mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ffffff]/0 via-[#ffffff]/20 to-[#ffffff]/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 transition-all duration-500 group-hover:border-[#ffffff]/40">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#ffffff]/20 blur-2xl rounded-full animate-pulse"></div>
                  <div className="relative w-20 h-20 rounded-full border-2 border-[#ffffff]/60 flex items-center justify-center">
                    <Logo className="w-12 h-12" glow={true} />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                  <span className="text-[#ffffff]">{content.protocolLabel}</span>
                </h3>
                <p className="text-white/40 font-mono text-xs uppercase tracking-[0.3em] mb-4">
                  {content.protocolNote}
                </p>
                <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#ffffff] to-transparent"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {content.protocolArticles.map((article, index) => (
                  <div 
                    key={article.id}
                    className="group/item relative p-4 bg-black/40 border border-white/5 rounded-xl transition-all duration-300 hover:border-[#ffffff]/30 hover:bg-white/[0.02]"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-[9px] font-mono text-[#ffffff]/60 shrink-0">{article.id}</span>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover/item:text-[#ffffff] transition-colors">
                          {article.title}
                        </h4>
                        <p className="text-xs text-white/40 leading-relaxed">
                          {article.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-12 border-t border-white/5 px-5 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.6em]">
            ©2024 OBSCURITYSECURITY_NON_PROFIT
          </p>
        </div>
      </footer>
    </div>
  );
};