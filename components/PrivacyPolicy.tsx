import React from 'react';
import { PrivacyNavbar } from './PrivacyNavbar';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

const PRIVACY = {
  ro: {
    title: 'Politica de Confidențialitate',
    lastUpdated: 'Ultima actualizare: Mai 2026',
    summary: 'Nu colectăm NICIUN FEL DE DATE.',
    summaryDesc: 'Suntem foarte serioși în privința asta. Această politică de confidențialitate este concepută să fie înțeleasă de oricine — nu avem nimic de ascuns.',
    protocolDesc: 'Această politică este o implementare directă a Protocolului 3305 — un standard tehnic deschis care definește arhitectural imposibilitatea colectării de date ca dovadă pentru argumentele noastre din politica de confidențialitate.',
    noData: 'Ce Date NU Colectăm',
    noDataList: [
      'Adrese IP',
      'Cookie-uri de urmărire',
      'Identificatori unici de dispozitiv',
      'Locație geografică',
      'Istoric de navigare',
      'Adrese de email',
      'Nume sau prenume',
      'Numere de telefon',
      'Adrese poștale',
      'Date biometrice',
      'Informații demografice',
      'Preferințe personale',
      'Obiceiuri de consum',
      'Istoric de căutări',
      'Înregistrări audio sau video',
      'Date de conectare (log-uri)',
      'Semnături digitale',
      'CNP-uri sau acte de identitate',
      'Date bancare sau de card',
      'Profile comportamentale',
      'Date de pe rețele sociale',
      'Nicio altă formă de date personale sau nepersonale'
    ],
    impossibility: 'De Ce Este Imposibil să Predăm Date Autorităților',
    impossibilityDesc: 'Pentru că nu avem ce preda. Nu stocăm, nu procesăm, nu colectăm, nu accesăm, nu transmitem și nu solicităm niciun fel de date de la vizitatorii site-ului nostru sau de la oamenii care ne folosesc aplicațiile. Când spunem zero date, înțelegem zero date — de la zero bytes stocați până la zero cereri către servere externe. Orice autoritate care solicită date de la noi va primi un singur răspuns: nu există.',
    legal: 'Conformitate Legală',
    legalEu: 'Uniunea Europeană (GDPR)',
    legalEuDesc: 'Respectăm Regulamentul General privind Protecția Datelor (GDPR) al Uniunii Europene. Deoarece nu colectăm date personale, suntem în deplină conformitate cu principiile de minimizare a datelor, limitare a stocării și transparență. Nu avem nevoie de consimțământ pentru cookie-uri pentru că nu folosim cookie-uri de urmărire. Nu avem nevoie de notificări de confidențialitate pentru că nu există date de notificat.',
    legalCh: 'Elveția (nFADP / LPD)',
    legalChDesc: 'Ne aliniem și Legii Federale privind Protecția Datelor (nFADP/LPD) din Elveția, unde planificăm să ne stabilim oficial. Legea elvețiană cere transparență și securitate — noi oferim ambele prin arhitectura noastră zero-date.',
    rightsTitle: 'Drepturile Tale',
    rightsDesc: 'Deși nu deținem niciun fel de date despre tine, respectăm pe deplin următoarele drepturi conform GDPR și LPD:',
    rightsList: [
      'Dreptul de acces — poți solicita confirmarea că nu avem date despre tine',
      'Dreptul la ștergere — nu avem nimic de șters',
      'Dreptul la rectificare — nu avem date incorecte de corectat',
      'Dreptul la portabilitate — nu avem date de transferat',
      'Dreptul la opoziție — te poți opune colectării de date pe care oricum nu o facem',
      'Dreptul de a fi informat — ești informat chiar acum'
    ],
    thirdParty: 'Servicii Terțe',
    thirdPartyDesc: 'Site-ul nostru este static și nu încarcă scripturi externe, trackere, reclame sau analitice. Nu folosim Google Analytics, Facebook Pixel, sau orice alt serviciu de monitorizare. Singurele resurse externe sunt bibliotecile necesare funcționării site-ului (Three.js, React), care nu colectează date în numele nostru.',
    updates: 'Actualizări ale Politicii',
    updatesDesc: 'Această politică de confidențialitate poate fi actualizată ocazional pentru a reflecta schimbări în practicile noastre sau în cerințele legale. Orice modificare va fi publicată pe această pagină, iar data ultimei actualizări va fi actualizată în consecință. Deoarece nu colectăm date, aceste actualizări nu îți vor afecta drepturile sau experiența.',
    contact: 'Contact',
    contactDesc: 'Pentru întrebări legate de această politică de confidențialitate, folosim ProtonMail — un serviciu de email criptat end-to-end care nu are acces la conținutul mesajelor. Adresa este disponibilă doar pentru contacte necesare, nu pentru înregistrări sau colectare de date: obscurity.devv@protonmail.com'
  },
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: May 2026',
    summary: 'We collect NO DATA WHATSOEVER.',
    summaryDesc: 'We are absolutely serious about this. This privacy policy is designed to be understood by anyone — we have nothing to hide.',
    protocolDesc: 'This policy is a direct implementation of Protocol 3305 — an open technical standard that architecturally defines the impossibility of data collection as proof for our privacy policy arguments.',
    noData: 'What Data We Do NOT Collect',
    noDataList: [
      'IP addresses',
      'Tracking cookies',
      'Unique device identifiers',
      'Geographic location',
      'Browsing history',
      'Email addresses',
      'First or last names',
      'Phone numbers',
      'Postal addresses',
      'Biometric data',
      'Demographic information',
      'Personal preferences',
      'Consumer habits',
      'Search history',
      'Audio or video recordings',
      'Connection logs',
      'Digital signatures',
      'National ID numbers or identity documents',
      'Banking or card data',
      'Behavioral profiles',
      'Social media data',
      'No other form of personal or non-personal data'
    ],
    impossibility: 'Why It Is Impossible to Hand Over Data to Authorities',
    impossibilityDesc: 'Because there is nothing to hand over. We do not store, process, collect, access, transmit, or request any data from our website visitors or people using our applications. When we say zero data, we mean zero data — from zero bytes stored to zero requests to external servers. Any authority requesting data from us will receive a single answer: it does not exist.',
    legal: 'Legal Compliance',
    legalEu: 'European Union (GDPR)',
    legalEuDesc: 'We comply with the General Data Protection Regulation (GDPR) of the European Union. Since we do not collect personal data, we are in full compliance with the principles of data minimization, storage limitation, and transparency. We do not need cookie consent because we do not use tracking cookies. We do not need privacy notices because there is no data to report.',
    legalCh: 'Switzerland (nFADP / LPD)',
    legalChDesc: 'We also align with the Federal Act on Data Protection (nFADP/LPD) of Switzerland, where we plan to establish ourselves officially. Swiss law demands transparency and security — we deliver both through our zero-data architecture.',
    rightsTitle: 'Your Rights',
    rightsDesc: 'Although we do not hold any data about you, we fully respect the following rights under GDPR and LPD:',
    rightsList: [
      'Right of access — you may request confirmation that we have no data about you',
      'Right to erasure — we have nothing to delete',
      'Right to rectification — we have no incorrect data to correct',
      'Right to portability — we have no data to transfer',
      'Right to object — you may object to data collection that we are not doing anyway',
      'Right to be informed — you are being informed right now'
    ],
    thirdParty: 'Third-Party Services',
    thirdPartyDesc: 'Our website is static and does not load external scripts, trackers, ads, or analytics. We do not use Google Analytics, Facebook Pixel, or any other monitoring service. The only external resources are libraries required for website functionality (Three.js, React), which do not collect data on our behalf.',
    updates: 'Policy Updates',
    updatesDesc: 'This privacy policy may be updated occasionally to reflect changes in our practices or legal requirements. Any modifications will be published on this page, and the last updated date will be revised accordingly. Since we do not collect data, these updates will not affect your rights or experience.',
    contact: 'Contact',
    contactDesc: 'For questions regarding this privacy policy, we use ProtonMail — an end-to-end encrypted email service that cannot access message content. The address is available only for necessary contacts, not for registration or data collection: obscurity.devv@protonmail.com'
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: Mayo 2026',
    summary: 'NO RECOPILAMOS NINGÚN TIPO DE DATOS.',
    summaryDesc: 'Hablamos muy en serio. Esta política de privacidad está diseñada para que cualquiera la entienda — no tenemos nada que ocultar.',
    protocolDesc: 'Esta política es una implementación directa del Protocolo 3305 — un estándar técnico abierto que define arquitectónicamente la imposibilidad de recolección de datos como prueba de nuestros argumentos de privacidad.',
    noData: 'Qué Datos NO Recopilamos',
    noDataList: [
      'Direcciones IP',
      'Cookies de rastreo',
      'Identificadores únicos de dispositivo',
      'Ubicación geográfica',
      'Historial de navegación',
      'Direcciones de correo electrónico',
      'Nombres o apellidos',
      'Números de teléfono',
      'Direcciones postales',
      'Datos biométricos',
      'Información demográfica',
      'Preferencias personales',
      'Hábitos de consumo',
      'Historial de búsquedas',
      'Grabaciones de audio o video',
      'Registros de conexión',
      'Firmas digitales',
      'Documentos de identidad',
      'Datos bancarios o de tarjetas',
      'Perfiles de comportamiento',
      'Datos de redes sociales',
      'Ninguna otra forma de datos personales o no personales'
    ],
    impossibility: 'Por Qué Es Imposible Entregar Datos a las Autoridades',
    impossibilityDesc: 'Porque no hay nada que entregar. No almacenamos, procesamos, recopilamos, accedemos, transmitimos ni solicitamos ningún dato de los visitantes de nuestro sitio web o las personas que usan nuestras aplicaciones. Cuando decimos cero datos, queremos decir cero datos — desde cero bytes almacenados hasta cero solicitudes a servidores externos. Cualquier autoridad que solicite datos de nosotros recibirá una única respuesta: no existen.',
    legal: 'Cumplimiento Legal',
    legalEu: 'Unión Europea (GDPR)',
    legalEuDesc: 'Cumplimos con el Reglamento General de Protección de Datos (GDPR) de la Unión Europea. Dado que no recopilamos datos personales, estamos en pleno cumplimiento de los principios de minimización de datos, limitación del almacenamiento y transparencia. No necesitamos consentimiento de cookies porque no usamos cookies de rastreo. No necesitamos avisos de privacidad porque no hay datos que reportar.',
    legalCh: 'Suiza (nFADP / LPD)',
    legalChDesc: 'También nos alineamos con la Ley Federal de Protección de Datos (nFADP/LPD) de Suiza, donde planeamos establecernos oficialmente. La ley suiza exige transparencia y seguridad — nosotros ofrecemos ambas a través de nuestra arquitectura de cero datos.',
    rightsTitle: 'Tus Derechos',
    rightsDesc: 'Aunque no poseemos ningún dato sobre ti, respetamos plenamente los siguientes derechos conforme al GDPR y la LPD:',
    rightsList: [
      'Derecho de acceso — puedes solicitar confirmación de que no tenemos datos sobre ti',
      'Derecho de supresión — no tenemos nada que eliminar',
      'Derecho de rectificación — no tenemos datos incorrectos que corregir',
      'Derecho a la portabilidad — no tenemos datos que transferir',
      'Derecho de oposición — puedes oponerte a la recopilación de datos que de todos modos no realizamos',
      'Derecho a ser informado — estás siendo informado ahora mismo'
    ],
    thirdParty: 'Servicios de Terceros',
    thirdPartyDesc: 'Nuestro sitio web es estático y no carga scripts externos, rastreadores, anuncios ni análisis. No usamos Google Analytics, Facebook Pixel ni ningún otro servicio de monitoreo. Los únicos recursos externos son las bibliotecas necesarias para el funcionamiento del sitio (Three.js, React), que no recopilan datos en nuestro nombre.',
    updates: 'Actualizaciones de la Política',
    updatesDesc: 'Esta política de privacidad puede actualizarse ocasionalmente para reflejar cambios en nuestras prácticas o requisitos legales. Cualquier modificación se publicará en esta página y la fecha de la última actualización se revisará en consecuencia. Dado que no recopilamos datos, estas actualizaciones no afectarán tus derechos ni tu experiencia.',
    contact: 'Contacto',
    contactDesc: 'Para preguntas sobre esta política de privacidad, usamos ProtonMail — un servicio de correo electrónico cifrado de extremo a extremo que no puede acceder al contenido de los mensajes. La dirección está disponible solo para contactos necesarios, no para registro o recopilación de datos: obscurity.devv@protonmail.com'
  }
};

export const PrivacyPolicy: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const p = PRIVACY[lang];

  return (
    <>
      <Seo
        title="Privacy Policy"
        description="ObscuritySecurity collects ZERO data. Read our privacy policy — no tracking, no cookies, no data collection. Protocol 3305 compliant."
        path="/privacy"
      />
      <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <PrivacyNavbar lang={lang} setLang={setLang} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.6em' }}>
            {p.lastUpdated}
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginTop: '16px', letterSpacing: '-0.02em' }}>
            {p.title}
          </h1>
        </div>

        <section style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '12px' }}>{p.summary}</h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>{p.summaryDesc}</p>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '3px solid rgba(255,255,255,0.3)' }}>
          <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{p.protocolDesc}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.8)' }}>{p.noData}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
            {p.noDataList.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: '12px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.5)' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{p.impossibility}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{p.impossibilityDesc}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: 'rgba(255,255,255,0.8)' }}>{p.legal}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>EU</span>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{p.legalEu}</h3>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{p.legalEuDesc}</p>
            </div>
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>CH</span>
                <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{p.legalCh}</h3>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{p.legalChDesc}</p>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{p.rightsTitle}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{p.rightsDesc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {p.rightsList.map((right, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.2)', minWidth: '20px' }}>0{i + 1}</span>
                <span style={{ fontSize: '12px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.5)' }}>{right}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{p.thirdParty}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{p.thirdPartyDesc}</p>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{p.updates}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{p.updatesDesc}</p>
        </section>

        <section style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{p.contact}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{p.contactDesc}</p>
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
