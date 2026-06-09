import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import Seo from './Seo';

const LANG = {
  ro: {
    navProjects: 'Proiecte',
    navCommunity: 'Comunitate',
    heroTitle: 'CrytoTool',
    heroTag: 'Seif Digital All-in-One',
    heroDesc: 'CrytoTool respectă oamenii din spatele ecranului. Este un manager de fișiere, galerie, player muzical și vizualizator de documente — totul criptat client-side, fără urmărire, fără reclame, fără colectare de date.',
    featuresLabel: 'Funcționalități',
    categories: [
      {
        icon: 'fa-shield-halved', title: 'Security',
        items: [
          { title: 'Parolă Principală (30+ caractere)', desc: 'Minim 30 de caractere pentru o securitate maximă, forțează parole puternice din start' },
          { title: 'Blocare Progresivă', desc: 'După 3 încercări greșite, timpul de așteptare crește exponențial — descurajează forța brută' },
          { title: 'Parolă separată pentru Setări', desc: 'Protejează configurația sensibilă cu o parolă diferită de cea principală' },
          { title: 'Auto-Distrugere', desc: 'La un număr configurat de încercări eșuate, vault-ul se șterge automat ireversibil' },
          { title: 'Blocare Automată + Blur', desc: 'Ecranul se blurează și se blochează automat după inactivitate prelungită' },
          { title: 'Cheie unică per fișier', desc: 'Fiecare fișier și folder primește o cheie de criptare unică, independentă' },
          { title: 'Blacklist PIN', desc: 'PIN-uri interzise configurate manual — împiedică parole evidente' },
          { title: 'Cheie separată pentru Backup', desc: 'Backup-urile se criptează cu o cheie diferită de vault-ul principal' },
        ],
      },
      {
        icon: 'fa-rotate-left', title: 'Recovery',
        items: [
          { title: '10 Coduri de Recuperare', desc: 'Coduri one-time imprimabile salvate offline, fiecare poate debloca vault-ul o singură dată' },
          { title: 'Backup-uri complet criptate', desc: 'Fișiere .enc care conțin tot vault-ul, recuperabile doar cu cheia dedicată de backup' },
        ],
      },
      {
        icon: 'fa-folder-tree', title: 'File Manager',
        items: [
          { title: 'Adaugă fișiere/foldere', desc: 'Importă orice tip de fișier direct în vault, criptat automat la upload' },
          { title: 'Redenumește, duplică, mută', desc: 'Operații complete de organizare direct în vault fără a decripta vreodată pe disc' },
          { title: 'Download și criptare', desc: 'Descarcă fișiere în forma lor criptată sau decriptată, la alegere' },
          { title: 'Vizualizare spațiu de stocare', desc: 'Grafic și statistici detaliate despre tipurile de fișiere și memoria ocupată' },
          { title: 'Căutare în toate fișierele', desc: 'Caută după nume, tip, dată sau conținut în tot vault-ul, instantaneu' },
          { title: 'Coș de gunoi cu restaurări', desc: 'Fișierele șterse stau în coș 30 de zile înainte de eliminarea definitivă' },
        ],
      },
      {
        icon: 'fa-cubes', title: 'Module',
        items: [
          { title: 'Galerie Foto/Video', desc: 'Previzualizează imagini și videouri direct din vault, cu suport pentru favorite și albume' },
          { title: 'Player Muzical', desc: 'Redă fișiere audio direct criptat, cu organizare pe albume, artiști și playlist-uri' },
          { title: 'Vizualizator Documente', desc: 'Deschide PDF, DOCX, TXT și alte formate fără a decripta pe disc, totul în memorie' },
          { title: 'Seif Chei de criptare', desc: 'Manager dedicat pentru chei publice/private, ideal pentru comunicare securizată' },
          { title: 'Backup/Restore din .enc', desc: 'Exportă și importă vault-ul complet într-un singur fișier .enc portabil' },
          { title: 'Setări centralizate', desc: 'Un singur loc pentru toate configurările — limbă, temă, securitate, module' },
        ],
      },
      {
        icon: 'fa-palette', title: 'Customizare',
        items: [
          { title: '100+ Teme', desc: 'De la întunecat la deschis, create manual — fiecare temă are accente cromatice unice' },
          { title: '40+ Fonturi', desc: 'Monospace, sans-serif, serif — alege cum arată textul în întreaga aplicație' },
          { title: 'Mod Dark / Light / System', desc: 'Comută manual sau lasă sistemul să decidă automat în funcție de ora zilei' },
          { title: 'Culoare accent', desc: 'Selector de culoare live care modifică instant toate elementele evidențiate' },
          { title: '10+ Pachete de iconițe', desc: 'Seturi complete de iconițe pentru butoane, foldere și tipuri de fișiere' },
          { title: '50+ Limbi', desc: 'Interfața complet tradusă cu suport pentru limbi de la comunitate prin fișiere JSON' },
        ],
      },
    ],
    stats: [
      { value: '52', label: 'Limbi' },
      { value: '100', label: 'Teme' },
      { value: '6', label: 'Algoritmi de criptare' },
      { value: '4', label: 'Platforme' },
    ],
    downloadTitle: 'Disponibil pe toate platformele',
    downloadDesc: 'Windows, Linux, macOS și Android. Aceeași experiență, aceeași confidențialitate.',
    downloadBtns: ['Windows', 'Linux', 'macOS', 'Android'],
    archDesc: 'CrytoTool folosește o arhitectură 100% client-side cu 4 straturi de criptare:',
    layers: [
      { layer: '1. Criptare Bază de Date', what: 'Auto-criptează fiecare fișier în IndexedDB', key: 'AES-256-GCM, chei din Parola Principală via Argon2id' },
      { layer: '2. Criptare Fișiere', what: 'Criptare manuală cu 6 algoritmi', key: 'AES-GCM, XChaCha20-Poly1305, ChaCha20-Poly1305, AES-CTR, Salsa20-Poly1305, AES-GCM-Stream' },
      { layer: '3. Backup Criptat', what: 'Creează backup-uri securizate ale tuturor datelor', key: 'Argon2id + AES-256-GCM, cheie unică de 26 caractere' },
      { layer: '4. Criptare Streaming', what: 'Procesează fișiere mari pe orice dispozitiv', key: '4MB chunk-uri, AES-GCM per chunk, sigur pe dispozitive cu RAM redusă' },
    ],
  },
  en: {
    navProjects: 'Projects',
    navCommunity: 'Community',
    heroTitle: 'CrytoTool',
    heroTag: 'All-in-One Privacy',
    heroDesc: 'CrytoTool respects the people behind the screen. It is a four-in-one, client-side encrypted file manager, gallery, music player, and document viewer where your privacy comes first: no tracking, no ads, no data collection.',
    featuresLabel: 'Features',
    categories: [
      {
        icon: 'fa-shield-halved', title: 'Security',
        items: [
          { title: 'Master Password (30+ chars)', desc: 'Enforces a minimum of 30 characters, forcing strong passwords from the very start' },
          { title: 'Progressive Lockout', desc: 'After 3 failed attempts, wait time grows exponentially — deters brute force attacks' },
          { title: 'Separate Settings Password', desc: 'Protects sensitive configuration behind a password different from your master password' },
          { title: 'Self-Destruct', desc: 'At a configurable number of failed attempts, the vault permanently wipes itself' },
          { title: 'Auto-Lock + Screen Blur', desc: 'Screen blurs and locks automatically after extended inactivity to prevent shoulder surfing' },
          { title: 'Unique Key per File', desc: 'Every file and folder gets its own independent encryption key' },
          { title: 'PIN Blacklist', desc: 'Manually configure forbidden PINs — stops obvious passwords before they are set' },
          { title: 'Separate Backup Key', desc: 'Backups are encrypted with a key different from your main vault key' },
        ],
      },
      {
        icon: 'fa-rotate-left', title: 'Recovery',
        items: [
          { title: '10 Recovery Codes', desc: 'Printable one-time codes stored offline, each can unlock the vault a single time' },
          { title: 'Fully Encrypted Backups', desc: '.enc files containing the entire vault, recoverable only with the dedicated backup key' },
        ],
      },
      {
        icon: 'fa-folder-tree', title: 'File Management',
        items: [
          { title: 'Add files/folders', desc: 'Import any file type directly into the vault, automatically encrypted on upload' },
          { title: 'Rename, duplicate, move', desc: 'Full organization operations inside the vault without ever decrypting to disk' },
          { title: 'Download and encrypt', desc: 'Download files in encrypted or decrypted form, your choice every time' },
          { title: 'Storage overview', desc: 'Detailed charts and statistics about file types and storage usage across the vault' },
          { title: 'Cross-folder search', desc: 'Search by name, type, date or content across the entire vault, instantly' },
          { title: 'Trash with restore', desc: 'Deleted files stay in trash for 30 days before permanent removal' },
        ],
      },
      {
        icon: 'fa-cubes', title: 'Modules',
        items: [
          { title: 'Photo/Video Gallery', desc: 'Preview images and videos directly in the vault, with favorites and album support' },
          { title: 'Music Player', desc: 'Play audio files while encrypted, organized by albums, artists and playlists' },
          { title: 'Document Viewer', desc: 'Open PDF, DOCX, TXT and more without ever decrypting to disk — all in memory' },
          { title: 'Encryption Key Vault', desc: 'Dedicated manager for public/private keys, ideal for secure communication' },
          { title: 'Backup/Restore from .enc', desc: 'Export and import the entire vault as a single portable .enc file' },
          { title: 'Centralized Settings', desc: 'One place for all configuration — language, theme, security, modules' },
        ],
      },
      {
        icon: 'fa-palette', title: 'Customization',
        items: [
          { title: '100+ Themes', desc: 'From dark to light, hand-crafted with unique chromatic accents in every theme' },
          { title: '40+ Fonts', desc: 'Monospace, sans-serif, serif — choose how text looks across the entire application' },
          { title: 'Dark / Light / System mode', desc: 'Switch manually or let your system decide automatically based on time of day' },
          { title: 'Custom accent color', desc: 'Live color picker that instantly updates all highlighted elements across the UI' },
          { title: '10+ Icon packs', desc: 'Complete icon sets for buttons, folders, and file types' },
          { title: '50+ Languages', desc: 'Fully translated interface with community-driven language support via JSON files' },
        ],
      },
    ],
    stats: [
      { value: '52', label: 'Languages' },
      { value: '100', label: 'Themes' },
      { value: '6', label: 'Encryption algorithms' },
      { value: '4', label: 'Platforms' },
    ],
    downloadTitle: 'Available on all platforms',
    downloadDesc: 'Windows, Linux, macOS and Android. Same experience, same privacy.',
    downloadBtns: ['Windows', 'Linux', 'macOS', 'Android'],
    githubBtn: 'GitHub',
    archTitle: 'Architecture',
    archDesc: 'CrytoTool uses a 100% client-side architecture with 4 layers of encryption:',
    layers: [
      { layer: '1. Database Encryption', what: 'Auto-encrypts every file in IndexedDB', key: 'AES-256-GCM, keys from Master Password via Argon2id' },
      { layer: '2. File & Folder Encryption', what: 'Manual encryption with 6 algorithms', key: 'AES-GCM, XChaCha20-Poly1305, ChaCha20-Poly1305, AES-CTR, Salsa20-Poly1305, AES-GCM-Stream' },
      { layer: '3. Encrypted Backup', what: 'Creates secure backups of all data', key: 'Argon2id + AES-256-GCM, unique 26-char key' },
      { layer: '4. Streaming Encryption', what: 'Handles large files on any device', key: '4MB chunks, AES-GCM per chunk, safe for low-RAM devices' },
    ],
  },
  es: {
    navProjects: 'Proyectos',
    navCommunity: 'Comunidad',
    heroTitle: 'CrytoTool',
    heroTag: 'Bóveda Digital All-in-One',
    heroDesc: 'CrytoTool respeta a las personas detrás de la pantalla. Es un administrador de archivos, galería, reproductor de música y visor de documentos — todo cifrado client-side, sin rastreo, sin anuncios, sin recolección de datos.',
    featuresLabel: 'Funcionalidades',
    categories: [
      {
        icon: 'fa-shield-halved', title: 'Seguridad',
        items: [
          { title: 'Contraseña Maestra (30+ caracteres)', desc: 'Exige mínimo 30 caracteres para forzar contraseñas fuertes desde el inicio' },
          { title: 'Bloqueo Progresivo', desc: 'Tras 3 intentos fallidos, la espera crece exponencialmente — disuade ataques de fuerza bruta' },
          { title: 'Contraseña de Ajustes', desc: 'Protege la configuración sensible con una contraseña distinta a la principal' },
          { title: 'Autodestrucción', desc: 'Al número configurado de intentos fallidos, la bóveda se borra irreversiblemente' },
          { title: 'Bloqueo Automático + Desenfoque', desc: 'La pantalla se desenfoca y bloquea automáticamente tras inactividad prolongada' },
          { title: 'Clave única por archivo', desc: 'Cada archivo y carpeta recibe una clave de cifrado única e independiente' },
          { title: 'Lista Negra PIN', desc: 'Configura PINs prohibidos manualmente — impide contraseñas obvias antes de crearlas' },
          { title: 'Clave separada para Backup', desc: 'Las copias de seguridad se cifran con una clave diferente a la bóveda principal' },
        ],
      },
      {
        icon: 'fa-rotate-left', title: 'Recuperación',
        items: [
          { title: '10 Códigos de Recuperación', desc: 'Códigos imprimibles de un solo uso, almacenados offline, cada uno desbloquea la bóveda una vez' },
          { title: 'Copias completamente cifradas', desc: 'Archivos .enc con toda la bóveda, recuperables solo con la clave de backup dedicada' },
        ],
      },
      {
        icon: 'fa-folder-tree', title: 'Archivos',
        items: [
          { title: 'Añadir archivos/carpetas', desc: 'Importa cualquier tipo de archivo directo a la bóveda, cifrado automáticamente al subir' },
          { title: 'Renombrar, duplicar, mover', desc: 'Operaciones completas de organización dentro de la bóveda sin descifrar nunca en disco' },
          { title: 'Descargar y cifrar', desc: 'Descarga archivos cifrados o descifrados, tú eliges cada vez' },
          { title: 'Resumen de almacenamiento', desc: 'Gráficos detallados y estadísticas sobre tipos de archivo y espacio usado en la bóveda' },
          { title: 'Búsqueda en todos los archivos', desc: 'Busca por nombre, tipo, fecha o contenido en toda la bóveda, al instante' },
          { title: 'Papelera con restauración', desc: 'Archivos eliminados permanecen 30 días en la papelera antes de borrado definitivo' },
        ],
      },
      {
        icon: 'fa-cubes', title: 'Módulos',
        items: [
          { title: 'Galería Fotos/Vídeos', desc: 'Previsualiza imágenes y vídeos directo en la bóveda, con favoritos y álbumes' },
          { title: 'Reproductor Musical', desc: 'Reproduce archivos de audio mientras están cifrados, organizado por álbumes y artistas' },
          { title: 'Visor de Documentos', desc: 'Abre PDF, DOCX, TXT y más sin descifrar nunca en disco — todo en memoria' },
          { title: 'Caja Fuerte de Claves', desc: 'Gestor dedicado para claves públicas/privadas, ideal para comunicación segura' },
          { title: 'Respaldar/Restaurar desde .enc', desc: 'Exporta e importa la bóveda completa como un solo archivo .enc portátil' },
          { title: 'Ajustes centralizados', desc: 'Un solo lugar para toda la configuración — idioma, tema, seguridad, módulos' },
        ],
      },
      {
        icon: 'fa-palette', title: 'Personalización',
        items: [
          { title: '100+ Temas', desc: 'De oscuro a claro, creados manualmente con acentos cromáticos únicos en cada tema' },
          { title: '40+ Fuentes', desc: 'Monospace, sans-serif, serif — elige cómo se ve el texto en toda la aplicación' },
          { title: 'Modo Oscuro / Claro / Sistema', desc: 'Cambia manualmente o deja que el sistema decida según la hora del día' },
          { title: 'Color de acento personalizado', desc: 'Selector de color en vivo que actualiza al instante todos los elementos destacados' },
          { title: '10+ Paquetes de iconos', desc: 'Juegos completos de iconos para botones, carpetas y tipos de archivo' },
          { title: '50+ Idiomas', desc: 'Interfaz completamente traducida con soporte comunitario mediante archivos JSON' },
        ],
      },
    ],
    stats: [
      { value: '52', label: 'Idiomas' },
      { value: '100', label: 'Temas' },
      { value: '6', label: 'Algoritmos de cifrado' },
      { value: '4', label: 'Plataformas' },
    ],
    downloadTitle: 'Disponible en todas las plataformas',
    downloadDesc: 'Windows, Linux, macOS y Android. Misma experiencia, misma privacidad.',
    downloadBtns: ['Windows', 'Linux', 'macOS', 'Android'],
    githubBtn: 'GitHub',
    archTitle: 'Arquitectura',
    archDesc: 'CrytoTool usa una arquitectura 100% client-side con 4 capas de cifrado:',
    layers: [
      { layer: '1. Cifrado de Base de Datos', what: 'Auto-cifra cada archivo en IndexedDB', key: 'AES-256-GCM, claves desde Contraseña Maestra via Argon2id' },
      { layer: '2. Cifrado de Archivos', what: 'Cifrado manual con 6 algoritmos', key: 'AES-GCM, XChaCha20-Poly1305, ChaCha20-Poly1305, AES-CTR, Salsa20-Poly1305, AES-GCM-Stream' },
      { layer: '3. Backup Cifrado', what: 'Crea copias de seguridad cifradas de todos los datos', key: 'Argon2id + AES-256-GCM, clave única de 26 caracteres' },
      { layer: '4. Cifrado Streaming', what: 'Maneja archivos grandes en cualquier dispositivo', key: 'Fragmentos de 4MB, AES-GCM por fragmento, seguro en dispositivos con poca RAM' },
    ],
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
  return <div ref={ref} className="transition-all duration-700 ease-out" style={{ opacity: 0, transform: 'translateY(16px)' }}>{children}</div>;
};

const MOCKUPS = ['/assets/dashboard.png', '/assets/settings.png', '/assets/animation.png', '/assets/encryption.png'];

const FeatureExplorer: React.FC<{ categories: any[]; lang: string }> = ({ categories, lang }) => {
  const [active, setActive] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const autoRef = useRef<ReturnType<typeof setInterval>>();

  const cat = categories[active];

  const goTo = (i: number) => {
    setActive(i);
    setVisibleItems([]);
  };

  const next = () => goTo((active + 1) % categories.length);
  const prev = () => goTo((active - 1 + categories.length) % categories.length);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setVisibleItems((prev) => {
        const next = prev.length + 1;
        return next > cat.items.length ? [] : [...Array(next).keys()];
      });
    }, 1200);
    return () => clearInterval(autoRef.current);
  }, [active, cat.items.length]);

  useEffect(() => {
    const t = setTimeout(() => setVisibleItems([0]), 100);
    return () => clearTimeout(t);
  }, [active]);

  return (
    <div className="relative">
      {/* Category indicator dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {categories.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-500 ${i === active ? 'w-8 h-[3px] bg-white/60' : 'w-3 h-[3px] bg-white/15 hover:bg-white/30'}`} />
        ))}
      </div>

      {/* Main visual */}
      <div key={active} className="relative bg-[#080808] border border-white/8 rounded-3xl p-8 md:p-16 overflow-hidden min-h-[320px] md:min-h-[400px] flex items-center">
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Background category number */}
        <div className="absolute right-4 md:right-12 bottom-4 md:bottom-8 text-[120px] md:text-[200px] font-black text-white/[0.015] select-none leading-none pointer-events-none">
          {String(active + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Icon */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
              <i className={`fa-solid ${cat.icon} text-white/50 text-3xl md:text-5xl`}></i>
            </div>
            <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-[7px] md:text-[8px] font-mono text-white/50">{String(active + 1).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 w-full">
            <div className="mb-4 md:mb-6">
              <span className="text-[7px] font-mono text-white/60 uppercase tracking-[0.4em]">
                {lang === 'ro' ? 'Categorie' : lang === 'es' ? 'Categoría' : 'Category'}
              </span>
              <h3 className="text-xl md:text-3xl font-black tracking-tight text-white/90 mt-1">{cat.title}</h3>
            </div>

            <div className="space-y-2.5 md:space-y-3">
              {cat.items.map((item: { title: string; desc: string }, i: number) => (
                <div key={i}
                  className={`transition-all duration-500 ease-out ${visibleItems.includes(i) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                  style={{ transitionDelay: `${i * 60}ms` }}>
                  <div className="flex items-start gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 transition-all duration-500 ${visibleItems.includes(i) ? 'bg-white/40' : 'bg-white/5'}`}></span>
                    <div>
                      <span className="text-[11px] md:text-sm font-medium text-white/60 leading-relaxed">{item.title}</span>
                      <p className="text-[9px] md:text-[10px] font-mono text-white/50 leading-relaxed mt-0.5 max-w-lg">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav arrows */}
        <button onClick={prev}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 bg-black/50 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all opacity-50 hover:opacity-100">
          <i className="fa-solid fa-chevron-left text-[10px] md:text-xs text-white/60"></i>
        </button>
        <button onClick={next}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/10 bg-black/50 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all opacity-50 hover:opacity-100">
          <i className="fa-solid fa-chevron-right text-[10px] md:text-xs text-white/60"></i>
        </button>
      </div>

      {/* Auto-rotate hint */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {cat.items.map((_, i) => (
          <div key={i}
            className={`h-[2px] rounded-full transition-all duration-300 ${
              visibleItems.includes(i) ? 'bg-white/25 w-4' : 'bg-white/8 w-2'
            }`} />
        ))}
      </div>
    </div>
  );
};

export const CrytoToolPage: React.FC = () => {
  const { lang, setLang } = useLanguage();
  const t = LANG[lang];
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const devices = el.querySelectorAll('.device-mock');
      devices.forEach((d) => {
        const dEl = d as HTMLElement;
        dEl.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${y * -6}deg) translateZ(20px)`;
      });
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <>
      <Seo
        title="CrytoTool"
        description="CrytoTool — all-in-one digital vault. Encrypted file manager, gallery, music player, and document viewer. 100% client-side, zero tracking."
        path="/crytotool"
      />
      <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ffffff] selection:text-black overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <Link to="/" className="flex items-center gap-3">
          <img src="/CrytoTool.png" alt="CrytoTool" className="h-7 w-auto object-contain" />
          <span className="text-[10px] font-black text-white/80">Cryto<span className="text-[#39ff14]">Tool</span></span>
        </Link>
        <div className="flex items-center gap-1.5">
          {(['ro', 'en', 'es'] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className={`text-[8px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-full transition-all ${lang === l ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/60'}`}>{l}</button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen md:min-h-screen flex items-center justify-center pt-20 md:pt-24 pb-12 md:pb-20 px-5 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-blue-500/[0.04] via-purple-500/[0.03] to-transparent blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-8 md:mb-16">
            <FadeIn delay={200}>
              <div className="flex justify-center mb-4 md:mb-6">
                <img src="/CrytoTool.png" alt="CrytoTool" className="h-32 md:h-56 w-auto object-contain" />
              </div>
              <h1 className="text-5xl md:text-[10rem] font-black leading-[0.8] mb-4 md:mb-6">
                <span className="bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">Cryto</span>
                <span className="text-[#39ff14]">Tool</span>
              </h1>
            </FadeIn>
            <FadeIn delay={300}>
              <p className="text-lg md:text-2xl font-mono text-white/50 max-w-xl mx-auto leading-relaxed">
                {t.heroTag}
              </p>
            </FadeIn>
            <FadeIn delay={400}>
              <p className="text-sm md:text-base font-mono text-white/60 max-w-2xl mx-auto leading-relaxed mt-4">
                {t.heroDesc}
              </p>
            </FadeIn>
            <FadeIn delay={450}>
              <p className="text-[10px] md:text-xs font-mono text-white/50 max-w-xl mx-auto leading-relaxed mt-6">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/30"></span>
                  {lang === 'ro'
                    ? 'CrytoTool este compatibil cu Protocol-3305 și respectă toate principiile sale.'
                    : lang === 'es'
                    ? 'CrytoTool es compatible con Protocol-3305 y respeta todos sus principios.'
                    : 'CrytoTool is compliant with Protocol-3305 and respects all its principles.'}
                  <a href="https://github.com/ObscuritySecurity/protocol-3305" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white underline underline-offset-2 transition-colors">
                    Protocol-3305
                  </a>
                </span>
              </p>
            </FadeIn>
          </div>

          {/* Mockup Gallery */}
          <FadeIn delay={500}>
            <div className="perspective-[1200px]">
              {/* Desktop: asymmetric grid */}
              <div className="hidden md:grid md:grid-cols-12 gap-4 max-w-6xl mx-auto">
                <div className="col-span-7 device-mock transition-all duration-500 hover:z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#080808] hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                    <img src={MOCKUPS[0]} alt="CrytoTool Dashboard" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
                <div className="col-span-5 device-mock transition-all duration-500 self-center hover:z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#080808] hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                    <img src={MOCKUPS[1]} alt="CrytoTool Settings" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
                <div className="col-span-5 device-mock transition-all duration-500 self-center hover:z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#080808] hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                    <img src={MOCKUPS[2]} alt="CrytoTool Animation" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
                <div className="col-span-7 device-mock transition-all duration-500 hover:z-10" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative group rounded-2xl overflow-hidden border border-white/10 bg-[#080808] hover:border-white/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.06)]">
                    <img src={MOCKUPS[3]} alt="CrytoTool Encryption" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Mobile: snap carousel */}
              <div className="md:hidden relative">
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 px-4 pb-4">
                  {MOCKUPS.map((src, i) => (
                    <div key={i} className="snap-center shrink-0 w-[85vw] first:ml-0 last:mr-4">
                      <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080808]">
                        <img src={src} alt={`CrytoTool screenshot ${i + 1}`} className="w-full h-auto" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  {MOCKUPS.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={700}>
            <div className="flex items-center justify-center gap-4 mt-12">
              <Link to="/download"
                className="px-8 py-4 bg-[#ffffff] text-black font-black uppercase text-[10px] tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                {lang === 'ro' ? 'Descarcă' : lang === 'es' ? 'Descargar' : 'Download'}
              </Link>
              <a href="https://github.com/ObscuritySecurity/CrytoTool" target="_blank" rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 text-white/70 font-black uppercase text-[10px] tracking-widest rounded-full hover:bg-white/5 hover:text-white transition-all duration-300">
                <i className="fa-brands fa-github mr-2"></i> GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-20 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {t.stats.map((s, i) => (
              <FadeIn key={s.label} delay={100 + i * 100}>
                <div className="text-center">
                  <div className="text-4xl md:text-7xl font-black text-white/30 mb-2">{s.value}</div>
                  <div className="text-[9px] font-mono text-white/50 uppercase tracking-[0.3em]">{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-32 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full bg-white/[0.015] blur-[140px]" />
          <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/[0.01] blur-[140px]" />
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/50 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{t.featuresLabel}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </FadeIn>

          {/* Feature slides */}
          <FadeIn delay={100}>
            <FeatureExplorer categories={t.categories} lang={lang} />
          </FadeIn>
        </div>
      </section>

      {/* Download */}
      <section className="py-12 md:py-32 px-5 relative overflow-hidden" style={{ background: '#080808' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-white/[0.02] blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/50 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{lang === 'ro' ? 'Descărcare' : lang === 'es' ? 'Descarga' : 'Download'}</span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="text-2xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6">{t.downloadTitle}</h2>
          </FadeIn>
          <FadeIn delay={250}>
            <p className="text-sm md:text-base font-mono text-white/50 max-w-xl mx-auto leading-relaxed mb-10">{t.downloadDesc}</p>
          </FadeIn>
          <FadeIn delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {t.downloadBtns.map((btn: string) => (
                <Link key={btn} to="/download"
                  className="px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 text-white/70 font-black uppercase text-[8px] md:text-[9px] tracking-[0.3em] rounded-full hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300">
                  {btn}
                </Link>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={450}>
            <div className="mt-10 pt-10 border-t border-white/5">
              <a href="https://github.com/ObscuritySecurity/CrytoTool" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[9px] font-mono text-white/50 hover:text-white uppercase tracking-[0.3em] transition-colors">
                <i className="fa-brands fa-github"></i> {t.githubBtn}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-12 md:py-28 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.02] blur-[100px]" />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-white/50 font-mono text-[10px] uppercase tracking-[0.6em] font-bold">{t.archTitle}</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="text-sm md:text-base font-mono text-white/60 max-w-2xl leading-relaxed mb-10">
              {t.archDesc}
            </p>
          </FadeIn>
          <div className="space-y-3">
            {t.layers.map((l, i) => (
              <FadeIn key={i} delay={150 + i * 100}>
                <div className="group relative bg-[#080808] border border-white/8 rounded-xl p-5 md:p-6 hover:border-white/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity"
                    style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="relative z-10 grid md:grid-cols-12 gap-3 md:gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0"></span>
                        <span className="text-xs md:text-sm font-mono text-white/90 font-bold">{l.layer}</span>
                      </div>
                    </div>
                    <div className="md:col-span-4">
                      <span className="text-[10px] md:text-xs font-mono text-white/50 leading-relaxed">{l.what}</span>
                    </div>
                    <div className="md:col-span-5">
                      <div className="text-[9px] md:text-[10px] font-mono text-white/60 leading-relaxed bg-white/5 border border-white/10 rounded-lg px-3 py-2">
                        {l.key}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-5 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-[7px] font-mono text-white/40 uppercase tracking-[0.6em]">©2026 ObscuritySecurity — AGPL-3.0</span>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-[7px] font-mono text-white/40 hover:text-white/60 uppercase tracking-[0.4em] transition-colors">Privacy</Link>
            <Link to="/terms" className="text-[7px] font-mono text-white/40 hover:text-white/60 uppercase tracking-[0.4em] transition-colors">Terms</Link>
            <Link to="/ethics" className="text-[7px] font-mono text-white/40 hover:text-white/60 uppercase tracking-[0.4em] transition-colors">Ethics</Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};
