import React, { useRef, useEffect } from 'react';
import { ContributionsNavbar } from './ContributionsNavbar';
import { TRANSLATIONS } from '../constants';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

const CONTRIBUTIONS = {
  ro: {
    heroTitle: 'Construim\nÎmpreună',
    heroSub: 'Fiecare contribuție contează. Audit, cod, design, traduceri — orice skill contează.',
    projectsTitle: 'Proiecte Active',
    projects: [
      {
        id: '01', title: 'CrytoTool', tagline: 'Seif Digital', logoImage: '/CrytoTool.png',
        desc: 'All-in-One Privacy, manager de fișiere cu criptare client-side, galerie, player muzical și vizualizator de documente.',
        status: 'Activ', statusColor: 'bg-green-500/20 text-green-300 border-green-500/30',
        needs: 'Audit securitate, testare, traduceri, documentație'
      },
    ],
    areasTitle: 'Domenii de Contribuție',
    areas: [
      { title: 'Security Audit', desc: 'Analiză cod, identificare vulnerabilități, propuneri de remediere.' },
      { title: 'Development', desc: 'Implementare funcționalități, optimizări, arhitectură.' },
      { title: 'Design & UI/UX', desc: 'Îmbunătățiri vizuale, iconițe, layout, experiență utilizator.' },
      { title: 'Translations', desc: 'Aducerea aplicațiilor în cât mai multe limbi.' },
      { title: 'Documentation', desc: 'Ghiduri, wiki, tutoriale pentru comunitate.' },
      { title: 'Testing & QA', desc: 'Testare, raportare bug-uri, sugestii de îmbunătățire.' },
      { title: 'Ideas & Feedback', desc: 'Propune funcționalități noi, împărtășește-ți perspectiva.' },
      { title: 'Community', desc: 'Ajută pe Matrix, răspunde la întrebări, crește comunitatea.' },
    ],
    ctaTitle: 'Ready to Build?',
    ctaDesc: 'Tot codul e pe GitHub. Dă fork, deschide un PR. Sau vino pe Matrix și spune-ne de unde vrei să începi.',
  },
  en: {
    heroTitle: 'Build\nTogether',
    heroSub: 'Every contribution matters. Audit, code, design, translations — any skill counts.',
    projectsTitle: 'Active Projects',
    projects: [
      {
        id: '01', title: 'CrytoTool', tagline: 'Digital Vault', logoImage: '/CrytoTool.png',
        desc: 'All-in-One Privacy, client-side encryption file manager, gallery, music player, and document viewer.',
        status: 'Active', statusColor: 'bg-green-500/20 text-green-300 border-green-500/30',
        needs: 'Security audit, testing, translations, documentation'
      },
    ],
    areasTitle: 'Contribution Areas',
    areas: [
      { title: 'Security Audit', desc: 'Code review, vulnerability identification, remediation proposals.' },
      { title: 'Development', desc: 'Feature implementation, optimization, architecture.' },
      { title: 'Design & UI/UX', desc: 'Visual improvements, icons, layout, user experience.' },
      { title: 'Translations', desc: 'Bringing applications to as many languages as possible.' },
      { title: 'Documentation', desc: 'Guides, wiki, tutorials for the community.' },
      { title: 'Testing & QA', desc: 'Testing, bug reporting, improvement suggestions.' },
      { title: 'Ideas & Feedback', desc: 'Propose new features, share your perspective.' },
      { title: 'Community', desc: 'Help on Matrix, answer questions, grow the community.' },
    ],
    ctaTitle: 'Ready to Build?',
    ctaDesc: 'All code is on GitHub. Fork it, open a PR. Or join Matrix and tell us where you want to start.',
  },
  es: {
    heroTitle: 'Construimos\nJuntos',
    heroSub: 'Cada contribución importa. Auditoría, código, diseño, traducciones — cualquier habilidad cuenta.',
    projectsTitle: 'Proyectos Activos',
    projects: [
      {
        id: '01', title: 'CrytoTool', tagline: 'Bóveda Digital', logoImage: '/CrytoTool.png',
        desc: 'All-in-One Privacy, administrador de archivos con cifrado client-side, galería, reproductor de música y visor de documentos.',
        status: 'Activo', statusColor: 'bg-green-500/20 text-green-300 border-green-500/30',
        needs: 'Auditoría de seguridad, pruebas, traducciones, documentación'
      },
    ],
    areasTitle: 'Áreas de Contribución',
    areas: [
      { title: 'Security Audit', desc: 'Revisión de código, identificación de vulnerabilidades, propuestas de remediación.' },
      { title: 'Development', desc: 'Implementación de funciones, optimización, arquitectura.' },
      { title: 'Design & UI/UX', desc: 'Mejoras visuales, iconos, diseño, experiencia de usuario.' },
      { title: 'Translations', desc: 'Llevar las aplicaciones a tantos idiomas como sea posible.' },
      { title: 'Documentation', desc: 'Guías, wiki, tutoriales para la comunidad.' },
      { title: 'Testing & QA', desc: 'Pruebas, reporte de errores, sugerencias de mejora.' },
      { title: 'Ideas & Feedback', desc: 'Propón nuevas funciones, comparte tu perspectiva.' },
      { title: 'Community', desc: 'Ayuda en Matrix, responde preguntas, haz crecer la comunidad.' },
    ],
    ctaTitle: 'Ready to Build?',
    ctaDesc: 'Todo el código está en GitHub. Haz fork, abre un PR. O únete a Matrix y dinos por dónde quieres empezar.',
  }
};

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
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
  return <div ref={ref} className="transition-all duration-700" style={{ opacity: 0, transform: 'translateY(24px)' }}>{children}</div>;
};

export const ContributionsPage: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const c = CONTRIBUTIONS[lang];

  return (
    <>
      <Seo
        title="Contributions"
        description="Contribute to ObscuritySecurity open-source projects. Help build privacy-first, encrypted tools for everyone. CrytoTool contributions welcome."
        path="/contributions"
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden">
      <ContributionsNavbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center pt-32">
          <FadeIn delay={100}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/30 font-mono text-[9px] uppercase tracking-[0.6em] font-bold">Community</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
              {c.heroTitle.split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  <span className={i === 0 ? 'text-white' : 'text-white/20'}>{line}</span>
                </span>
              ))}
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-sm md:text-lg font-mono text-white/40 max-w-2xl mx-auto leading-relaxed">
              {c.heroSub}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.projectsTitle}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-1 max-w-lg gap-6">
            {c.projects.map((p, i) => (
              <FadeIn key={p.id} delay={100 + i * 150}>
                <div className="relative group bg-[#080808] border border-white/8 rounded-2xl p-8 overflow-hidden hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                       style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[8px] font-mono text-white/20 tracking-wider">{p.id}</span>
                      <span className={`text-[7px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${p.statusColor}`}>
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      {p.logoImage && <img src={p.logoImage} alt={p.title} className="h-10 w-auto object-contain" />}
                      <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white/90">{p.title}</h3>
                    </div>
                    <div className="w-10 h-px bg-white/20 mb-4" />
                    <p className="text-[11px] md:text-[12px] font-mono text-white/40 leading-relaxed mb-6">{p.desc}</p>
                    <div className="pt-4 border-t border-white/5">
                      <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.3em] block mb-2">Needs</span>
                      <span className="text-[10px] font-mono text-white/50">{p.needs}</span>
                    </div>
                    <a href="https://github.com/ObscuritySecurity/CrytoTool/blob/main/docs/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-[9px] font-mono text-white/50 hover:text-white uppercase tracking-[0.2em]">
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656"/>
                      </svg>
                      Contribute
                    </a>
                  </div>
                  <div className="absolute top-5 right-5 flex flex-col gap-0.5 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                    <div className="w-5 h-[1px] bg-white" />
                    <div className="w-2.5 h-[1px] bg-white self-end" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Areas */}
      <section className="py-20 md:py-32 px-5" style={{ background: '#080808' }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.areasTitle}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {c.areas.map((a, i) => (
              <FadeIn key={a.title} delay={50 + i * 60}>
                <div className="relative p-5 md:p-6 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/15 transition-all duration-300 group">
                  <div className="relative z-10">
                    <span className="text-[7px] font-mono text-white/15 tracking-wider block mb-3">0{i + 1}</span>
                    <h3 className="text-sm md:text-base font-black uppercase tracking-tight text-white/80 mb-2 group-hover:text-white transition-colors">{a.title}</h3>
                    <p className="text-[10px] md:text-[11px] font-mono text-white/35 leading-relaxed">{a.desc}</p>
                  </div>
                  <div className="absolute top-3 right-3 flex flex-col gap-0.5 opacity-5 group-hover:opacity-20 transition-opacity">
                    <div className="w-4 h-[1px] bg-white" />
                    <div className="w-2 h-[1px] bg-white self-end" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.03] blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn delay={100}>
            <span className="text-[10px] font-mono text-white/25 uppercase tracking-[0.6em] block mb-6">Protocol 3305</span>
          </FadeIn>
          <FadeIn delay={200}>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
              {c.ctaTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="text-sm md:text-base font-mono text-white/40 max-w-xl mx-auto leading-relaxed mb-10">
              {c.ctaDesc}
            </p>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://github.com/ObscuritySecurity" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#ffffff] text-black font-black uppercase text-[11px] tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                  <path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656"/>
                </svg>
                GitHub
              </a>
              <a href="https://matrix.to/#/#obscuritysecurity:matrix.org" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 border border-white/30 text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/10 transition-all backdrop-blur-sm">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z" />
                </svg>
                Matrix
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-center">
            <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.6em]">
              ©2026 OBSCURITYSECURITY — AGPL-3.0
            </span>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};
