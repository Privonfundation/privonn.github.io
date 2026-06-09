import React from 'react';
import { TermsNavbar } from './TermsNavbar';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

const TERMS = {
  ro: {
    title: 'Termeni și Condiții',
    lastUpdated: 'Ultima actualizare: Mai 2026',
    intro: 'Bine ai venit la ObscuritySecurity. Folosind site-ul și serviciile noastre, ești de acord cu următorii termeni și condiții.',
    acceptance: 'Acceptarea Termenilor',
    acceptanceDesc: 'Accesând sau folosind în orice mod site-ul nostru, serviciile sau aplicațiile, confirmi că ai citit, înțeles și ești de acord să respecți acești termeni. Dacă nu ești de acord, nu folosi serviciile noastre.',
    services: 'Descrierea Serviciilor',
    servicesDesc: 'ObscuritySecurity oferă soluții de securitate cibernetică, instrumente de confidențialitate și aplicații open-source. Toate serviciile noastre sunt furnizate „ca atare", în conformitate cu principiile Protocolului 3305 — zero colectare de date, zero încredere, zero cunoștințe.',
    noWarranty: 'Fără Garanție',
    noWarrantyDesc: 'Serviciile și aplicațiile noastre sunt oferite „ca atare", fără nicio garanție, expresă sau implicită. Nu garantăm că vor funcționa corect în orice mediu, în orice condiții sau pentru orice scop. Folosești serviciile noastre pe propriul tău risc. Nu garantăm că serviciile noastre vor fi neîntrerupte, sigure sau fără erori.',
    noData: 'Zero Date',
    noDataDesc: 'Ca parte a angajamentului nostru față de confidențialitate, NU colectăm, stocăm, procesăm sau transmitem date personale ale vizitatorilor sau ale oamenilor care ne folosesc serviciile. Aceasta este o garanție arhitecturală, nu doar o promisiune legală. Consultă Politica noastră de Confidențialitate pentru detalii.',
    intellectual: 'Proprietate Intelectuală',
    intellectualDesc: 'Tot codul, designul, conținutul și materialele site-ului ObscuritySecurity sunt licențiate sub AGPL-3.0, cu excepția cazului în care se specifică altfel. Ești liber să folosești, modifici și distribui codul în conformitate cu termenii AGPL-3.0.',
    license: 'AGPL-3.0',
    licenseDesc: 'Acest proiect și toate aplicațiile noastre sunt licențiate sub GNU Affero General Public License v3.0. Aceasta înseamnă că poți folosi, modifica și distribui software-ul, cu condiția ca orice versiune modificată să fie, de asemenea, distribuită sub aceeași licență, iar oamenii care folosesc rețeaua să aibă acces la codul sursă.',
    liability: 'Limitarea Răspunderii',
    liabilityDesc: 'În cea mai mare măsură permisă de lege, ObscuritySecurity nu va fi răspunzătoare pentru daune directe, indirecte, accidentale sau consecutive rezultate din folosirea sau imposibilitatea de a folosi serviciile noastre. Deoarece nu colectăm date, nu putem fi considerați responsabili pentru pierderea de date care oricum nu există.',
    changes: 'Modificări ale Termenilor',
    changesDesc: 'Ne rezervăm dreptul de a modifica acești termeni în orice moment. Modificările vor fi publicate pe această pagină. Continuarea utilizării serviciilor după publicarea modificărilor constituie acceptarea noilor termeni.',
    governing: 'Legea Aplicabilă',
    governingDesc: 'Acești termeni sunt guvernați de legile Elveției, unde planificăm să ne stabilim oficial. Orice dispută va fi soluționată în instanțele competente din Elveția.',
    contact: 'Contact',
    contactDesc: 'Pentru întrebări legate de acești termeni, contactează-ne la: obscurity.devv@protonmail.com'
  },
  en: {
    title: 'Terms and Conditions',
    lastUpdated: 'Last updated: May 2026',
    intro: 'Welcome to ObscuritySecurity. By using our website and services, you agree to the following terms and conditions.',
    acceptance: 'Acceptance of Terms',
    acceptanceDesc: 'By accessing or using our website, services, or applications in any way, you confirm that you have read, understood, and agree to be bound by these terms. If you do not agree, do not use our services.',
    services: 'Description of Services',
    servicesDesc: 'ObscuritySecurity provides cybersecurity solutions, privacy tools, and open-source applications. All our services are provided "as is" in accordance with the principles of Protocol 3305 — zero data collection, zero trust, zero knowledge.',
    noWarranty: 'No Warranty',
    noWarrantyDesc: 'Our services and applications are provided "as is" without any warranty, express or implied. We do not guarantee that they will function correctly in any environment, under any conditions, or for any purpose. You use our services at your own risk. We do not guarantee that our services will be uninterrupted, secure, or error-free.',
    noData: 'Zero Data',
    noDataDesc: 'As part of our commitment to privacy, we do NOT collect, store, process, or transmit personal data of our visitors or users. This is an architectural guarantee, not just a legal promise. See our Privacy Policy for details.',
    intellectual: 'Intellectual Property',
    intellectualDesc: 'All code, design, content, and materials on the ObscuritySecurity website are licensed under AGPL-3.0, unless otherwise specified. You are free to use, modify, and distribute the code in accordance with the terms of AGPL-3.0.',
    license: 'AGPL-3.0 License',
    licenseDesc: 'This project and all our applications are licensed under the GNU Affero General Public License v3.0. This means you may use, modify, and distribute the software, provided that any modified version is also distributed under the same license and the people using the network have access to the source code.',
    liability: 'Limitation of Liability',
    liabilityDesc: 'To the maximum extent permitted by law, ObscuritySecurity shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services. Since we do not collect data, we cannot be held liable for data loss that does not exist.',
    changes: 'Changes to Terms',
    changesDesc: 'We reserve the right to modify these terms at any time. Changes will be posted on this page. Continued use of our services after changes are posted constitutes acceptance of the new terms.',
    governing: 'Governing Law',
    governingDesc: 'These terms are governed by the laws of Switzerland, where we plan to establish ourselves officially. Any dispute shall be resolved in the competent courts of Switzerland.',
    contact: 'Contact',
    contactDesc: 'For questions regarding these terms, contact us at: obscurity.devv@protonmail.com'
  },
  es: {
    title: 'Términos y Condiciones',
    lastUpdated: 'Última actualización: Mayo 2026',
    intro: 'Bienvenido a ObscuritySecurity. Al usar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones.',
    acceptance: 'Aceptación de los Términos',
    acceptanceDesc: 'Al acceder o usar nuestro sitio web, servicios o aplicaciones de cualquier manera, confirmas que has leído, entendido y aceptas cumplir con estos términos. Si no estás de acuerdo, no uses nuestros servicios.',
    services: 'Descripción de los Servicios',
    servicesDesc: 'ObscuritySecurity proporciona soluciones de ciberseguridad, herramientas de privacidad y aplicaciones de código abierto. Todos nuestros servicios se proporcionan "tal cual" de acuerdo con los principios del Protocolo 3305 — cero recopilación de datos, cero confianza, cero conocimiento.',
    noWarranty: 'Sin Garantía',
    noWarrantyDesc: 'Nuestros servicios y aplicaciones se proporcionan "tal cual", sin ninguna garantía, expresa o implícita. No garantizamos que funcionen correctamente en cualquier entorno, bajo cualquier condición o para cualquier propósito. Usas nuestros servicios bajo tu propio riesgo. No garantizamos que nuestros servicios sean ininterrumpidos, seguros o libres de errores.',
    noData: 'Cero Datos',
    noDataDesc: 'Como parte de nuestro compromiso con la privacidad, NO recopilamos, almacenamos, procesamos ni transmitimos datos personales de nuestros visitantes o usuarios. Esta es una garantía arquitectónica, no solo una promesa legal. Consulta nuestra Política de Privacidad para más detalles.',
    intellectual: 'Propiedad Intelectual',
    intellectualDesc: 'Todo el código, diseño, contenido y materiales del sitio web de ObscuritySecurity están licenciados bajo AGPL-3.0, a menos que se especifique lo contrario. Eres libre de usar, modificar y distribuir el código de acuerdo con los términos de AGPL-3.0.',
    license: 'Licencia AGPL-3.0',
    licenseDesc: 'Este proyecto y todas nuestras aplicaciones están licenciados bajo la GNU Affero General Public License v3.0. Esto significa que puedes usar, modificar y distribuir el software, siempre que cualquier versión modificada también se distribuya bajo la misma licencia y las personas que usan la red tengan acceso al código fuente.',
    liability: 'Limitación de Responsabilidad',
    liabilityDesc: 'En la máxima medida permitida por la ley, ObscuritySecurity no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de usar nuestros servicios. Dado que no recopilamos datos, no podemos ser responsables por la pérdida de datos que no existen.',
    changes: 'Cambios en los Términos',
    changesDesc: 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se publicarán en esta página. El uso continuado de nuestros servicios después de la publicación de los cambios constituye la aceptación de los nuevos términos.',
    governing: 'Ley Aplicable',
    governingDesc: 'Estos términos se rigen por las leyes de Suiza, donde planeamos establecernos oficialmente. Cualquier disputa se resolverá en los tribunales competentes de Suiza.',
    contact: 'Contacto',
    contactDesc: 'Para preguntas sobre estos términos, contáctanos en: obscurity.devv@protonmail.com'
  }
};

export const TermsAndConditions: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const t = TERMS[lang];

  return (
    <>
      <Seo
        title="Terms and Conditions"
        description="Terms and conditions for ObscuritySecurity services and applications. AGPL-3.0 licensed, zero data collection, no warranty."
        path="/terms"
      />
      <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
      <TermsNavbar lang={lang} setLang={setLang} />

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.6em' }}>
            {t.lastUpdated}
          </span>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, lineHeight: 1.1, marginTop: '16px', letterSpacing: '-0.02em' }}>
            {t.title}
          </h1>
        </div>

        <section style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '32px', marginBottom: '48px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>{t.intro}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.acceptance}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.acceptanceDesc}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.services}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.servicesDesc}</p>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.noWarranty}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.noWarrantyDesc}</p>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.noData}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.noDataDesc}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.intellectual}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace', marginBottom: '16px' }}>{t.intellectualDesc}</p>
          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontFamily: 'Fragment Mono, monospace', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>AGPL-3.0</span>
              <h3 style={{ fontSize: '14px', fontWeight: 600 }}>{t.license}</h3>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>{t.licenseDesc}</p>
          </div>
        </section>

        <section style={{ marginBottom: '48px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.liability}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.liabilityDesc}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.changes}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.changesDesc}</p>
        </section>

        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.governing}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.governingDesc}</p>
        </section>

        <section style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: 'rgba(255,255,255,0.8)' }}>{t.contact}</h2>
          <p style={{ fontSize: '13px', lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', fontFamily: 'Fragment Mono, monospace' }}>{t.contactDesc}</p>
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
