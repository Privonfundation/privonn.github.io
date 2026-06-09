import React, { useRef, useEffect } from 'react';
import { CommunityNavbar } from './CommunityNavbar';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

const NetworkLogo: React.FC<{ name: string }> = ({ name }) => {
  const svgs: Record<string, React.ReactNode> = {
    Matrix: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M.632.55v22.9H2.28V24H0V0h2.28v.55zm7.043 7.26v1.157h.033c.309-.443.683-.784 1.117-1.024.433-.245.936-.365 1.5-.365.54 0 1.033.107 1.481.314.448.208.785.582 1.02 1.108.254-.374.6-.706 1.034-.992.434-.287.95-.43 1.546-.43.453 0 .872.056 1.26.167.388.11.716.286.993.53.276.245.489.559.646.951.152.392.23.863.23 1.417v5.728h-2.349V11.52c0-.286-.01-.559-.032-.812a1.755 1.755 0 0 0-.18-.66 1.106 1.106 0 0 0-.438-.448c-.194-.11-.457-.166-.785-.166-.332 0-.6.064-.803.189a1.38 1.38 0 0 0-.48.499 1.946 1.946 0 0 0-.231.696 5.56 5.56 0 0 0-.06.785v4.768h-2.35v-4.8c0-.254-.004-.503-.018-.752a2.074 2.074 0 0 0-.143-.688 1.052 1.052 0 0 0-.415-.503c-.194-.125-.476-.19-.854-.19-.111 0-.259.024-.439.074-.18.051-.36.143-.53.282-.171.138-.319.337-.439.595-.12.259-.18.6-.18 1.02v4.966H5.46V7.81zm15.693 15.64V.55H21.72V0H24v24h-2.28v-.55z" />
      </svg>
    ),
    Mastodon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z" />
      </svg>
    ),
    Pixelfed: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M 12 24 C 5.3726 24 0 18.6274 0 12 S 5.3726 0 12 0 s 12 5.3726 12 12 -5.3726 12 -12 12 m -0.9526 -9.3802 h 2.2014 c 2.0738 0 3.7549 -1.6366 3.7549 -3.6554 S 15.3226 7.309 13.2488 7.309 h -3.1772 c -1.1964 0 -2.1663 0.9442 -2.1663 2.1089 v 8.208 z" />
      </svg>
    ),
    Lemmy: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M2.9595 4.2228a3.9132 3.9132 0 0 0-.332.019c-.8781.1012-1.67.5699-2.155 1.3862-.475.8-.5922 1.6809-.35 2.4971.2421.8162.8297 1.5575 1.6982 2.1449.0053.0035.0106.0076.0163.0114.746.4498 1.492.7431 2.2877.8994-.02.3318-.0272.6689-.006 1.0181.0634 1.0432.4368 2.0006.996 2.8492l-2.0061.8189a.4163.4163 0 0 0-.2276.2239.416.416 0 0 0 .0879.455.415.415 0 0 0 .2941.1231.4156.4156 0 0 0 .1595-.0312l2.2093-.9035c.408.4859.8695.9315 1.3723 1.318.0196.0151.0407.0264.0603.0423l-1.2918 1.7103a.416.416 0 0 0 .664.501l1.314-1.7385c.7185.4548 1.4782.7927 2.2294 1.0242.3833.7209 1.1379 1.1871 2.0202 1.1871.8907 0 1.6442-.501 2.0242-1.2072.744-.2347 1.4959-.5729 2.2073-1.0262l1.332 1.7606a.4157.4157 0 0 0 .7439-.1936.4165.4165 0 0 0-.0799-.3074l-1.3099-1.7345c.0083-.0075.0178-.0113.0261-.0188.4968-.3803.9549-.8175 1.3622-1.2939l2.155.8794a.4156.4156 0 0 0 .5412-.2276.4151.4151 0 0 0-.2273-.5432l-1.9438-.7928c.577-.8538.9697-1.8183 1.0504-2.8693.0268-.3507.0242-.6914.0079-1.0262.7905-.1572 1.5321-.4502 2.2737-.8974.0053-.0033.011-.0076.0163-.0113.8684-.5874 1.456-1.3287 1.6982-2.145.2421-.8161.125-1.697-.3501-2.497-.4849-.8163-1.2768-1.2852-2.155-1.3863a3.2175 3.2175 0 0 0-.332-.0189c-.7852-.0151-1.6231.229-2.4286.6942-.5926.342-1.1252.867-1.5433 1.4387-1.1699-.6703-2.6923-1.0476-4.5635-1.0785a15.5768 15.5768 0 0 0-.5111 0c-2.085.034-3.7537.43-5.0142 1.1449-.0033-.0038-.0045-.0114-.008-.0152-.4233-.5916-.973-1.1365-1.5835-1.489-.8055-.465-1.6434-.7083-2.4286-.6941Zm.2858.7365c.5568.042 1.1696.2358 1.7787.5875.485.28.9757.7554 1.346 1.2696a5.6875 5.6875 0 0 0-.4969.4085c-.9201.8516-1.4615 1.9597-1.668 3.2335-.6809-.1402-1.3183-.3945-1.984-.7948-.7553-.5128-1.2159-1.1225-1.4004-1.7445-.1851-.624-.1074-1.2712.2776-1.9196.3743-.63.9275-.9534 1.6118-1.0322a2.796 2.796 0 0 1 .5352-.0076Zm17.5094 0a2.797 2.797 0 0 1 .5353.0075c.6842.0786 1.2374.4021 1.6117 1.0322.385.6484.4627 1.2957.2776 1.9196-.1845.622-.645 1.2317-1.4004 1.7445-.6578.3955-1.2881.6472-1.9598.7888-.1942-1.2968-.7375-2.4338-1.666-3.302a5.5639 5.5639 0 0 0-.4709-.3923c.3645-.49.8287-.9428 1.2938-1.2113.6091-.3515 1.2219-.5454 1.7787-.5875ZM12.006 6.0036a14.832 14.832 0 0 1 .487 0c2.3901.0393 4.0848.67 5.1631 1.678 1.1501 1.0754 1.6423 2.6006 1.499 4.467-.1311 1.7079-1.2203 3.2281-2.652 4.324-.694.5313-1.4626.9354-2.2254 1.2294.0031-.0453.014-.0888.014-.1349.0029-1.1964-.9313-2.2133-2.2918-2.2133-1.3606 0-2.3222 1.0154-2.2918 2.2213.0013.0507.014.0972.0181.1471-.781-.2933-1.5696-.7013-2.2777-1.2456-1.4239-1.0945-2.4997-2.6129-2.6037-4.322-.1129-1.8567.3778-3.3382 1.5212-4.3965C7.5094 6.7 9.352 6.047 12.006 6.0036Zm-3.6419 6.8291c-.6053 0-1.0966.4903-1.0966 1.0966 0 .6063.4913 1.0986 1.0966 1.0986s1.0966-.4923 1.0966-1.0986c0-.6063-.4913-1.0966-1.0966-1.0966zm7.2819.0113c-.5998 0-1.0866.4859-1.0866 1.0866s.4868 1.0885 1.0866 1.0885c.5997 0 1.0865-.4878 1.0865-1.0885s-.4868-1.0866-1.0865-1.0866zM12 16.0835c1.0237 0 1.5654.638 1.5634 1.4829-.0018.7849-.6723 1.485-1.5634 1.485-.9167 0-1.54-.5629-1.5634-1.493-.0212-.8347.5397-1.4749 1.5634-1.4749Z" />
      </svg>
    ),
  };
  return svgs[name] || null;
};

const COMMUNITY = {
  ro: {
    heroTitle: 'Comunitatea\nObscurity',
    heroSub: 'Construim un ecosistem digital liber. Fiecare voce contează.',
    protoLabel: 'Rețele Federale',
    protoDesc: 'Folosim doar platforme federale și open-source. Fără lock-in, fără algoritmi care te manipulează. Datele și conversațiile tale rămân ale tale.',
    networks: [
      { name: 'Matrix', handle: '@obscuritysecurity:matrix.org', url: 'https://matrix.to/#/#obscuritysecurity:matrix.org', desc: 'Chat criptat end-to-end. Discuții tehnice, suport, comunitate.', protocol: 'Protocol: Matrix / Olm-Megolm' },
      { name: 'Mastodon', handle: '@ObscuritySecurity', url: 'https://mastodon.social/@ObscuritySecurity', desc: 'Microblogging federat. Anunțuri, gânduri, actualizări.', protocol: 'Protocol: ActivityPub' },
      { name: 'Pixelfed', handle: '@ObscuritySecurity', url: 'https://pixelfed.social/i/web/profile/ObscuritySecurity', desc: 'Galerie foto federată, fără algoritmi, fără reclame.', protocol: 'Protocol: ActivityPub' },
      { name: 'Lemmy', handle: 'c/obscuritysecurity', url: 'https://lemmy.world/c/obscuritysecurity', desc: 'Agregator de link-uri și discuții federat. Alternativa la Reddit.', protocol: 'Protocol: ActivityPub' },
    ],
    githubTitle: 'GitHub',
    githubDesc: 'Tot codul e deschis. Contribuie, auditează, fork-uiește. Transparența e fundamentul nostru.',
    githubUrl: 'https://github.com/ObscuritySecurity',
    discussionsTitle: 'Discuții GitHub',
    discussionsDesc: 'Propune funcționalități, raportează probleme, discută cu comunitatea. Totul e deschis.',
    discussionsUrl: 'https://github.com/ObscuritySecurity/CrytoTool/discussions',
  },
  en: {
    heroTitle: 'Obscurity\nCommunity',
    heroSub: 'Building a free digital ecosystem. Every voice matters.',
    protoLabel: 'Federated Networks',
    protoDesc: 'We use only federated and open-source platforms. No lock-in, no algorithms that manipulate you. Your data and conversations remain yours.',
    networks: [
      { name: 'Matrix', handle: '@obscuritysecurity:matrix.org', url: 'https://matrix.to/#/#obscuritysecurity:matrix.org', desc: 'End-to-end encrypted chat. Technical discussions, support, community.', protocol: 'Protocol: Matrix / Olm-Megolm' },
      { name: 'Mastodon', handle: '@ObscuritySecurity', url: 'https://mastodon.social/@ObscuritySecurity', desc: 'Federated microblogging. Announcements, thoughts, updates.', protocol: 'Protocol: ActivityPub' },
      { name: 'Pixelfed', handle: '@ObscuritySecurity', url: 'https://pixelfed.social/i/web/profile/ObscuritySecurity', desc: 'Federated photo gallery. No algorithms, no ads.', protocol: 'Protocol: ActivityPub' },
      { name: 'Lemmy', handle: 'c/obscuritysecurity', url: 'https://lemmy.world/c/obscuritysecurity', desc: 'Federated link aggregator and discussions. Reddit alternative.', protocol: 'Protocol: ActivityPub' },
    ],
    githubTitle: 'GitHub',
    githubDesc: 'All code is open. Contribute, audit, fork. Transparency is our foundation.',
    githubUrl: 'https://github.com/ObscuritySecurity',
    discussionsTitle: 'GitHub Discussions',
    discussionsDesc: 'Request features, report issues, discuss with the community. Everything is open.',
    discussionsUrl: 'https://github.com/ObscuritySecurity/CrytoTool/discussions',
  },
  es: {
    heroTitle: 'Comunidad\nObscurity',
    heroSub: 'Construyendo un ecosistema digital libre. Cada voz importa.',
    protoLabel: 'Redes Federales',
    protoDesc: 'Usamos solo plataformas federales y de código abierto. Sin bloqueo, sin algoritmos que te manipulen. Tus datos y conversaciones siguen siendo tuyos.',
    networks: [
      { name: 'Matrix', handle: '@obscuritysecurity:matrix.org', url: 'https://matrix.to/#/#obscuritysecurity:matrix.org', desc: 'Chat cifrado de extremo a extremo. Discusiones técnicas, soporte, comunidad.', protocol: 'Protocolo: Matrix / Olm-Megolm' },
      { name: 'Mastodon', handle: '@ObscuritySecurity', url: 'https://mastodon.social/@ObscuritySecurity', desc: 'Microblogging federado. Anuncios, pensamientos, actualizaciones.', protocol: 'Protocolo: ActivityPub' },
      { name: 'Pixelfed', handle: '@ObscuritySecurity', url: 'https://pixelfed.social/i/web/profile/ObscuritySecurity', desc: 'Galería de fotos federada. Sin algoritmos, sin anuncios.', protocol: 'Protocolo: ActivityPub' },
      { name: 'Lemmy', handle: 'c/obscuritysecurity', url: 'https://lemmy.world/c/obscuritysecurity', desc: 'Agregador de enlaces y discusiones federado. Alternativa a Reddit.', protocol: 'Protocolo: ActivityPub' },
    ],
    githubTitle: 'GitHub',
    githubDesc: 'Todo el código es abierto. Contribuye, audita, haz fork. La transparencia es nuestro fundamento.',
    githubUrl: 'https://github.com/ObscuritySecurity',
    discussionsTitle: 'Discusiones GitHub',
    discussionsDesc: 'Solicita funciones, reporta problemas, discute con la comunidad. Todo es abierto.',
    discussionsUrl: 'https://github.com/ObscuritySecurity/CrytoTool/discussions',
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

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
    <path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656"/>
  </svg>
);

export const CommunityPage: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const c = COMMUNITY[lang];

  return (
    <>
      <Seo
        title="Community"
        description="Join the ObscuritySecurity community on Matrix, Mastodon, Pixelfed, Lemmy, and GitHub. Privacy-first, open-source, for people."
        path="/community"
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden">
      <CommunityNavbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.04]"
               style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.04] blur-[120px]" />
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
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
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

      {/* Federated Networks */}
      <section className="py-20 md:py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{c.protoLabel}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-sm md:text-base font-mono text-white/40 max-w-3xl leading-relaxed mb-12">
              {c.protoDesc}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {c.networks.map((n, i) => (
              <FadeIn key={n.name} delay={100 + i * 120}>
                <a href={n.url} target="_blank" rel="noopener noreferrer"
                  className="relative group block bg-[#080808] border border-white/8 rounded-2xl p-8 overflow-hidden hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500"
                       style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                  <div className="relative z-10">
<div className="flex items-center justify-between mb-4">
  <div className="flex items-center gap-3">
    <NetworkLogo name={n.name} />
    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white/90">{n.name}</h3>
  </div>
  <span className="text-[7px] font-mono text-white/15 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full border border-white/5">{n.protocol}</span>
</div>
                    <p className="text-[11px] md:text-[12px] font-mono text-white/35 leading-relaxed mb-4">{n.desc}</p>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-white/50">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {n.handle}
                    </div>
                  </div>
                  <div className="absolute top-5 right-5 flex flex-col gap-0.5 opacity-10 group-hover:opacity-30 transition-opacity duration-500">
                    <div className="w-5 h-[1px] bg-white" />
                    <div className="w-2.5 h-[1px] bg-white self-end" />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub */}
      <section className="py-20 md:py-28 px-5 relative overflow-hidden" style={{ background: '#080808' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">Open Source</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-white/40"><GitHubIcon /></div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/90">{c.githubTitle}</h2>
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <p className="text-sm md:text-base font-mono text-white/40 max-w-xl mx-auto leading-relaxed mb-10">
              {c.githubDesc}
            </p>
          </FadeIn>
          <FadeIn delay={350}>
            <a href={c.githubUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#ffffff] text-black font-black uppercase text-[11px] tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <GitHubIcon />
              Explore GitHub
            </a>
          </FadeIn>
        </div>
      </section>

      {/* GitHub Discussions */}
      <section className="py-20 md:py-28 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/30 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{lang === 'ro' ? 'Discuții' : lang === 'es' ? 'Discusiones' : 'Discussions'}</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <i className="fa-brands fa-github text-3xl text-white/40"></i>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white/90">{c.discussionsTitle}</h2>
            </div>
          </FadeIn>
          <FadeIn delay={250}>
            <p className="text-sm md:text-base font-mono text-white/40 max-w-xl mx-auto leading-relaxed mb-10">
              {c.discussionsDesc}
            </p>
          </FadeIn>
          <FadeIn delay={350}>
            <a href={c.discussionsUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 border border-white/30 text-white font-black uppercase text-[11px] tracking-widest rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300 backdrop-blur-sm">
              <i className="fa-solid fa-comments text-sm"></i>
              {lang === 'ro' ? 'Deschide Discuțiile' : lang === 'es' ? 'Abrir Discusiones' : 'Open Discussions'}
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex justify-center">
          <span className="text-[8px] font-mono text-white/15 uppercase tracking-[0.6em]">
            ©2026 OBSCURITYSECURITY — AGPL-3.0
          </span>
        </div>
      </section>
    </div>
    </>
  );
};
