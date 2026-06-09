import React from 'react';
import { EthicsNavbar } from './EthicsNavbar';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

const ETHICS = {
  ro: {
    title: 'Cod de Etică',
    lastUpdated: 'Ultima actualizare: Mai 2026',
    intro: 'ObscuritySecurity oferă instrumente de securitate și confidențialitate pentru a proteja oamenii, nu pentru a face rău. Acest cod de etică stabilește așteptările noastre și limitele legale.',
    purpose: 'Scopul Acestui Cod',
    purposeDesc: 'Acest document nu este doar o formalitate legală. Este o declarație a valorilor noastre și un avertisment clar: instrumentele noastre sunt create pentru protecție, nu pentru atac. În calitate de creatori, ne asumăm responsabilitatea pentru ceea ce construim. În calitate de om care le folosește, tu ești responsabil pentru modul în care folosești aceste instrumente.',
    responsibleUse: 'Utilizare Responsabilă',
    responsibleUseDesc: 'Ești de acord să NU folosești serviciile sau aplicațiile ObscuritySecurity pentru:\n\n- Activități ilegale de orice fel\n- Atacuri cibernetice, hacking sau acces neautorizat\n- Urmărirea, hărțuirea sau supravegherea persoanelor fără consimțământ\n- Crearea sau distribuirea de malware\n- Încălcarea drepturilor omului sau a libertăților fundamentale\n- Orice activitate care cauzează daune directe sau indirecte altor persoane',
    notResponsible: 'Limitarea Răspunderii Noastre',
    notResponsibleDesc: 'ObscuritySecurity oferă instrumente open-source și servicii „ca atare". Nu suntem responsabili pentru modul în care terții aleg să folosească aceste instrumente. La fel cum un producător de cuțite nu este responsabil pentru modul în care cineva folosește un cuțit, noi nu suntem responsabili pentru utilizarea greșită a instrumentelor noastre.',
    legal: 'Protecție Legală',
    legalDesc: 'Prin utilizarea serviciilor noastre, ești de acord că:\n\n- ObscuritySecurity nu poate fi trasă la răspundere pentru daune cauzate de utilizarea greșită a instrumentelor sale\n- Este responsabilitatea ta să te asiguri că utilizarea respectă toate legile aplicabile\n- Nu oferim consultanță juridică — dacă ai întrebări legate de conformitate, consultă un avocat\n- Ne rezervăm dreptul de a refuza serviciile oricui considerăm că încalcă acest cod de etică',
    ethicalPrinciple: 'Principiul Etic de Bază',
    ethicalPrincipleDesc: 'Dacă un instrument poate fi folosit atât pentru bine, cât și pentru rău, alegem să-l construim pentru bine. Dar nu putem controla ce fac alții cu el. Aceasta este realitatea tehnologiei open-source. Ceea ce putem face este să spunem clar: nu susținem, nu încurajăm și nu facilităm utilizarea rău intenționată a instrumentelor noastre.',
    contact: 'Contact',
    contactDesc: 'Dacă ai întrebări despre acest cod de etică sau vrei să raportezi o utilizare greșită, contactează-ne la: obscurity.devv@protonmail.com'
  },
  en: {
    title: 'Code of Ethics',
    lastUpdated: 'Last updated: May 2026',
    intro: 'ObscuritySecurity provides security and privacy tools to protect people, not to cause harm. This code of ethics establishes our expectations and legal boundaries.',
    purpose: 'Purpose of This Code',
    purposeDesc: 'This document is not just a legal formality. It is a statement of our values and a clear warning: our tools are created for protection, not attack. As creators, we take responsibility for what we build. As users, you are responsible for how you use these tools.',
    responsibleUse: 'Responsible Use',
    responsibleUseDesc: 'You agree NOT to use ObscuritySecurity services or applications for:\n\n- Illegal activities of any kind\n- Cyber attacks, hacking, or unauthorized access\n- Tracking, harassing, or surveilling people without consent\n- Creating or distributing malware\n- Violating human rights or fundamental freedoms\n- Any activity that causes direct or indirect harm to others',
    notResponsible: 'Limitation of Our Liability',
    notResponsibleDesc: 'ObscuritySecurity provides open-source tools and services "as is". We are not responsible for how third parties choose to use these tools. Just as a knife manufacturer is not responsible for how someone uses a knife, we are not responsible for the misuse of our tools.',
    legal: 'Legal Protection',
    legalDesc: 'By using our services, you agree that:\n\n- ObscuritySecurity cannot be held liable for damages caused by misuse of its tools\n- It is your responsibility to ensure your use complies with all applicable laws\n- We do not provide legal advice — if you have compliance questions, consult a lawyer\n- We reserve the right to refuse services to anyone we believe violates this code of ethics',
    ethicalPrinciple: 'Core Ethical Principle',
    ethicalPrincipleDesc: 'If a tool can be used for both good and harm, we choose to build it for good. But we cannot control what others do with it. This is the reality of open-source technology. What we can do is state clearly: we do not endorse, encourage, or facilitate malicious use of our tools.',
    contact: 'Contact',
    contactDesc: 'If you have questions about this code of ethics or want to report misuse, contact us at: obscurity.devv@protonmail.com'
  },
  es: {
    title: 'Código de Ética',
    lastUpdated: 'Última actualización: Mayo 2026',
    intro: 'ObscuritySecurity proporciona herramientas de seguridad y privacidad para proteger a las personas, no para causar daño. Este código de ética establece nuestras expectativas y límites legales.',
    purpose: 'Propósito de Este Código',
    purposeDesc: 'Este documento no es solo una formalidad legal. Es una declaración de nuestros valores y una advertencia clara: nuestras herramientas están creadas para la protección, no para el ataque. Como creadores, asumimos la responsabilidad de lo que construimos. Como usuarios, tú eres responsable de cómo usas estas herramientas.',
    responsibleUse: 'Uso Responsable',
    responsibleUseDesc: 'Aceptas NO utilizar los servicios o aplicaciones de ObscuritySecurity para:\n\n- Actividades ilegales de cualquier tipo\n- Ataques cibernéticos, hacking o acceso no autorizado\n- Rastrear, acosar o vigilar personas sin consentimiento\n- Crear o distribuir malware\n- Violar derechos humanos o libertades fundamentales\n- Cualquier actividad que cause daño directo o indirecto a otros',
    notResponsible: 'Limitación de Nuestra Responsabilidad',
    notResponsibleDesc: 'ObscuritySecurity proporciona herramientas de código abierto y servicios "tal cual". No somos responsables de cómo terceros elijan usar estas herramientas. Así como un fabricante de cuchillos no es responsable de cómo alguien usa un cuchillo, no somos responsables del mal uso de nuestras herramientas.',
    legal: 'Protección Legal',
    legalDesc: 'Al usar nuestros servicios, aceptas que:\n\n- ObscuritySecurity no puede ser considerada responsable por daños causados por el mal uso de sus herramientas\n- Es tu responsabilidad asegurarte de que tu uso cumpla con todas las leyes aplicables\n- No proporcionamos asesoramiento legal — si tienes preguntas de cumplimiento, consulta a un abogado\n- Nos reservamos el derecho de rechazar servicios a cualquier persona que creamos que viola este código de ética',
    ethicalPrinciple: 'Principio Ético Fundamental',
    ethicalPrincipleDesc: 'Si una herramienta puede usarse tanto para el bien como para el mal, elegimos construirla para el bien. Pero no podemos controlar lo que otros hacen con ella. Esta es la realidad de la tecnología de código abierto. Lo que podemos hacer es declarar claramente: no respaldamos, fomentamos ni facilitamos el uso malintencionado de nuestras herramientas.',
    contact: 'Contacto',
    contactDesc: 'Si tienes preguntas sobre este código de ética o quieres reportar un uso indebido, contáctanos en: obscurity.devv@protonmail.com'
  }
};

export const EthicsPage: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const e = ETHICS[lang];

  return (
    <>
      <Seo
        title="Code of Ethics"
        description="ObscuritySecurity Code of Ethics — security and privacy tools to protect people, not to cause harm. Ethical hacking, responsible disclosure."
        path="/ethics"
      />
      <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <EthicsNavbar lang={lang} setLang={setLang} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.6em' }}>
            {e.lastUpdated}
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginTop: '16px', letterSpacing: '-0.02em' }}>
            {e.title}
          </h1>
        </div>

        <section style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '48px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>{e.intro}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{e.purpose}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{e.purposeDesc}</p>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{e.responsibleUse}</h2>
          <div style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace', whiteSpace: 'pre-line' }}>{e.responsibleUseDesc}</div>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{e.notResponsible}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{e.notResponsibleDesc}</p>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{e.legal}</h2>
          <div style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace', whiteSpace: 'pre-line' }}>{e.legalDesc}</div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{e.ethicalPrinciple}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{e.ethicalPrincipleDesc}</p>
        </section>

        <section style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{e.contact}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{e.contactDesc}</p>
        </section>

        <div style={{ marginTop: '64px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center' }}>
          <span style={{ fontSize: '9px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', letterSpacing: '0.6em' }}>
            ©2026 OBSCURITYSECURITY — AGPL-3.0
          </span>
        </div>
      </main>
    </div>
    </>
  );
};
