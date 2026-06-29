import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
  ChevronDown,
  GraduationCap,
  Users,
  Newspaper,
  Calendar,
  ImageIcon,
  FileText,
  Search,
  Globe,
  Menu,
  X,
  ArrowUpRight,
  ArrowLeft,
  Phone,
  Mail,
  Printer,
  MapPin,
  Tag,
  Building2,
  TrendingUp,
  ChevronLeft,
  Film,
  ExternalLink,
} from 'lucide-react';
import data from './cms-data.json';

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------- Data & types ----------------------------- */

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string | null;
  gallery: string[];
  paragraphs: string[];
  excerpt: string;
}
interface PageItem {
  slug: string;
  title: string;
  paragraphs: string[];
  images: string[];
}
interface NavChild {
  slug: string;
  title: string;
}
interface NavGroup {
  label: string;
  children: NavChild[];
}
interface Partner {
  name: string;
  logo: string;
  url: string | null;
}
interface Gallery {
  slug: string;
  title: string;
  cover: string | null;
  count: number;
  images: string[];
}
interface AgendaItem {
  slug: string;
  title: string;
  date: string;
  paragraphs: string[];
}
interface VideoItem {
  slug: string;
  title: string;
  src: string;
  source: string;
}

const news = data.news as NewsItem[];
const pages = data.pages as PageItem[];
const navigation = data.navigation as NavGroup[];
const partners = data.partners as Partner[];
const galleries = data.galleries as Gallery[];
const agenda = data.agenda as AgendaItem[];
const videos = data.videos as VideoItem[];
const contact = data.contact as { tel: string[]; fax: string; address: string; email: string };

const galleryBySlug = (s: string) => galleries.find((g) => g.slug === s);

const pageBySlug = (s: string) => pages.find((p) => p.slug === s);
const newsBySlug = (s: string) => news.find((n) => n.slug === s);

const titleCase = (s: string) =>
  s.length > 2 ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;

const childHref = (slug: string) =>
  slug === 'actualites'
    ? '#/actualites'
    : slug === 'contact'
    ? '#/contact'
    : '#/page/' + slug;

// Shorter display labels for over-long top-level nav groups so the bar stays tidy.
const navLabelOverrides: Record<string, string> = {
  'Promotion et appui à la commercialisation': 'Promotion & appui',
};
const navLabel = (label: string) => navLabelOverrides[label] || titleCase(label);

// Many scraped articles carry their date, location and trailing press labels as
// pseudo-paragraphs. Keep only the real body text.
const NOISE_RE = /^(photos|map tv|maroc\.ma|l['’]economiste|programme fitpe|communiqu|rapport|voir toutes les actualit)/i;
const contentParagraphs = (item: NewsItem) =>
  item.paragraphs.filter(
    (p) => p.trim().length > 45 && p.trim() !== item.title.trim() && !NOISE_RE.test(p.trim())
  );
const newsExcerpt = (item: NewsItem) => contentParagraphs(item)[0] || item.title;

// Some pages aren't articles — their scraped "paragraphs" are really form fields,
// link labels or document names. These configs render the real thing.
interface PageLink {
  label: string;
  href: string;
  primary?: boolean;
}
const pageExtras: Record<string, { intro?: string[]; links: PageLink[] }> = {
  bibliotheque: {
    links: [
      {
        label: 'Liste des ouvrages (PDF)',
        href: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/03/Liste-des-ouvrages.pdf',
        primary: true,
      },
    ],
  },
  'e-learning': {
    intro: [
      'Le CMS met a disposition une plateforme de formation a distance dediee aux agents des Associations de Micro-Credit et aux acteurs du secteur de la microfinance.',
    ],
    links: [{ label: 'Se connecter a la plateforme e-learning', href: 'https://www.cms-eformation.ma', primary: true }],
  },
  'education-financiere': {
    intro: [
      "Le programme « Education financiere pour tous » propose des modules en libre acces pour renforcer les connaissances financieres du grand public et des micro-entrepreneurs.",
    ],
    links: [{ label: 'Acceder a la plateforme', href: 'https://libre.cmselearning.ma', primary: true }],
  },
};

// WordPress serves resized thumbnails like `name-1024x682.jpeg`. Strip the size
// suffix to load the full-resolution original (sharper) and prefer https.
const hiRes = (url: string) =>
  url.replace(/^http:\/\//i, 'https://').replace(/-\d+x\d+(?=\.[a-z]+$)/i, '');

const heroSlides = news.filter((n) => n.image).slice(0, 5);
const homeNews = news.slice(0, 7);

const activityConfig = [
  { slug: 'formation', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/10.png' },
  { slug: 'appui-a-la-micro-entreprise', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/012.png' },
  { slug: 'observatoire', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/11.png' },
];

const toolConfig = [
  { slug: 'communication-et-partenariat', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/04.png' },
  { slug: 'education-financiere', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/03.png' },
  { slug: 'cartographie-nationale-de-la-microfinance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/geo.png' },
  { slug: 'e-learning', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/02.png' },
  { slug: 'bibliotheque', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/01.png' },
  { slug: 'publication', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/0.png' },
];

const keyFigures = [
  { value: '2007', label: 'Annee de creation', sub: 'Inaugure le 8 novembre 2007' },
  { value: String(news.length), label: 'Actualites publiees', sub: 'Evenements et activites du Centre' },
  { value: String(partners.length), label: 'Partenaires', sub: 'Acteurs nationaux et internationaux' },
  { value: '1 200+', label: 'Femmes accompagnees', sub: 'Formations, bazars et expositions en 2025' },
];

// Which top-level nav group a page belongs to (used for the side-rail of sibling links).
const groupOfSlug = (slug: string) => navigation.find((g) => g.children.some((c) => c.slug === slug));

// The team page stores its members as alternating name / role paragraphs.
interface TeamMember {
  name: string;
  role: string;
}
const teamMembers: TeamMember[] = (() => {
  const p = pageBySlug('qsn_equipes')?.paragraphs.filter((x) => x.trim()) ?? [];
  const out: TeamMember[] = [];
  for (let i = 0; i + 1 < p.length; i += 2) out.push({ name: p[i].trim(), role: p[i + 1].trim() });
  return out;
})();

// No real portraits in the dataset — render clean branded initials avatars instead.
// Swap these URLs for real photo paths when the team pictures are available.
const memberInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
const memberAvatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=256&background=1a5f3c&color=ffffff&bold=true&font-size=0.36`;

/* ------------------------------- Routing -------------------------------- */

function useHashRoute(): string[] {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    // Only jump to the top when the user actively follows a link. Back/forward
    // navigation (which never involves a link click) keeps its scroll position.
    let scrollToTopNext = false;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.('a');
      if (link && link.getAttribute('href')?.startsWith('#')) scrollToTopNext = true;
    };
    const onChange = () => {
      setHash(window.location.hash);
      if (scrollToTopNext) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        scrollToTopNext = false;
      }
    };
    document.addEventListener('click', onClick, true);
    window.addEventListener('hashchange', onChange);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('hashchange', onChange);
    };
  }, []);
  return hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

/* ----------------------------- Shared chrome ---------------------------- */

function NavBar({ route }: { route: string[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const onHome = route.length === 0;
  // "solid" = opaque cream bar with dark text. Otherwise the bar floats over the
  // dark hero image, so text/icons must be light to stay readable.
  const solid = scrolled || !onHome;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [route.join('/')]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = solid
    ? 'text-cms-charcoal hover:text-cms-green'
    : 'text-white hover:text-cms-gold-light [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-cms-warm/97 shadow-[0_1px_12px_rgba(0,0,0,0.06)]'
          : 'bg-cms-charcoal/55 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <a href="#/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/logo.png"
              alt="CMS Logo"
              className="h-12 w-auto"
            />
          </a>
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a href="#/" className={`text-sm font-medium whitespace-nowrap transition-colors ${linkClass}`}>
              Accueil
            </a>
            {navigation.map((group) => (
              <div
                key={group.label}
                className="relative"
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <a
                  href={group.children[0] ? childHref(group.children[0].slug) : '#/'}
                  className={`flex items-center gap-1 text-sm font-medium whitespace-nowrap transition-colors ${linkClass}`}
                >
                  {navLabel(group.label)}
                  {group.children.length > 1 && <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />}
                </a>
                {group.children.length > 1 && openGroup === group.label && (
                  <div className="absolute left-0 top-full pt-3 w-64">
                    <div className="bg-white rounded-lg shadow-xl border border-stone-100 py-2 overflow-hidden">
                      {group.children.map((c) => (
                        <a
                          key={c.slug}
                          href={childHref(c.slug)}
                          className="block px-4 py-2.5 text-sm text-cms-charcoal hover:bg-cms-cream hover:text-cms-green transition-colors"
                        >
                          {titleCase(c.title)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
            <button className={`p-2 transition-colors ${linkClass}`}>
              <Search className="w-5 h-5" />
            </button>
            <div className={`flex items-center gap-2 text-xs font-medium ${solid ? 'text-cms-stone' : 'text-white/90 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]'}`}>
              <Globe className="w-4 h-4" />
              <span className={solid ? 'text-cms-green' : 'text-cms-gold-light'}>FR</span>
              <span className="cursor-pointer hover:text-cms-gold-light">EN</span>
              <span className="cursor-pointer hover:text-cms-gold-light">AR</span>
            </div>
          </div>
          <button
            className={`lg:hidden p-2 transition-colors ${solid ? 'text-cms-charcoal' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cms-warm/98 backdrop-blur-sm border-t border-stone-200 max-h-[75vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-4">
            <a href="#/" className="block text-sm font-semibold text-cms-charcoal">Accueil</a>
            {navigation.map((group) => (
              <div key={group.label}>
                <div className="text-xs font-bold uppercase tracking-wider text-cms-gold mb-2">
                  {navLabel(group.label)}
                </div>
                <div className="space-y-1.5 pl-2">
                  {group.children.map((c) => (
                    <a key={c.slug} href={childHref(c.slug)} className="block text-sm text-cms-charcoal">
                      {titleCase(c.title)}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  const groups = navigation.slice(0, 4);
  return (
    <footer className="bg-cms-charcoal text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {groups.map((group) => (
            <div key={group.label}>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
                {titleCase(group.label)}
              </h4>
              <ul className="space-y-2.5">
                {group.children.map((c) => (
                  <li key={c.slug}>
                    <a href={childHref(c.slug)} className="hover:text-white transition-colors text-sm flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-cms-gold" /> {titleCase(c.title)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="#/" className="flex items-center gap-3">
            <img
              src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/logo.png"
              alt="CMS"
              className="h-10 w-auto opacity-80"
            />
          </a>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
            <a href="#/contact" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone className="w-4 h-4 text-cms-gold" />
              {contact.tel[0]}
            </a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-cms-gold" />
              {contact.email}
            </a>
          </div>
          <p className="text-xs text-white/40">Tous droits reserves &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}

function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center flex-wrap gap-2 text-xs text-cms-stone mb-6">
      <a href="#/" className="hover:text-cms-green transition-colors">Accueil</a>
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-2">
          <ChevronRight className="w-3 h-3" />
          {t.href ? (
            <a href={t.href} className="hover:text-cms-green transition-colors">{t.label}</a>
          ) : (
            <span className="text-cms-charcoal font-medium">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ------------------------------- Home view ------------------------------ */

function HomeView() {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroImgRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' });
      gsap.fromTo(
        heroTextRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);
  const addRef = (i: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[620px] overflow-hidden bg-cms-charcoal">
        <div ref={heroImgRef} className="absolute inset-0">
          {heroSlides.map((slide, i) => {
            const active = i === currentSlide;
            return (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
                style={{ opacity: active ? 1 : 0 }}
              >
                {/* Blurred fill keeps the frame full even for portrait/poster visuals */}
                <img
                  src={hiRes(slide.image!)}
                  alt=""
                  aria-hidden
                  onError={(e) => {
                    if (e.currentTarget.src !== slide.image) e.currentTarget.src = slide.image!;
                  }}
                  className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-70"
                />
                {/* Full-bleed sharp image with a slow cinematic zoom on the active slide */}
                <img
                  src={hiRes(slide.image!)}
                  alt={slide.title}
                  onError={(e) => {
                    if (e.currentTarget.src !== slide.image) e.currentTarget.src = slide.image!;
                  }}
                  className={`absolute inset-0 w-full h-full object-cover ${active ? 'animate-kenburns' : 'scale-105'}`}
                />
                {/* Layered gradients for depth + readable text */}
                <div className="absolute inset-0 bg-gradient-to-r from-cms-charcoal/90 via-cms-charcoal/55 to-cms-charcoal/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-cms-charcoal via-cms-charcoal/10 to-transparent" />
              </div>
            );
          })}
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div ref={heroTextRef} className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-cms-gold/90 text-white text-xs font-semibold tracking-wider uppercase rounded-full mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Centre Mohammed VI de Soutien a la Microfinance Solidaire
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg line-clamp-3">
                {newsExcerpt(heroSlides[currentSlide])}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={`#/actualites/${heroSlides[currentSlide].slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors shadow-lg shadow-cms-green/30"
                >
                  Lire l'article
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#/actualites"
                  className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white font-medium rounded-lg hover:bg-white/10 hover:border-white/70 transition-colors"
                >
                  Toutes les actualites
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Glass control bar: prev/next + counter + progress + thumbnail strip */}
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-7 sm:pb-9">
            <div className="flex items-end justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={prevSlide}
                    aria-label="Slide precedent"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white backdrop-blur-sm transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Slide suivant"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-white/25 bg-white/5 text-white/80 hover:bg-white/15 hover:text-white backdrop-blur-sm transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="text-white/90 text-sm font-medium tabular-nums">
                  <span className="text-white text-base font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span className="text-white/40"> / {String(heroSlides.length).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2.5">
                {heroSlides.map((slide, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Aller au slide ${i + 1}`}
                    className={`relative h-14 w-20 lg:w-24 rounded-lg overflow-hidden transition-all duration-300 ${
                      i === currentSlide
                        ? 'ring-2 ring-cms-gold ring-offset-2 ring-offset-cms-charcoal opacity-100'
                        : 'opacity-50 hover:opacity-90'
                    }`}
                  >
                    <img src={hiRes(slide.image!)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Progress track */}
            <div className="mt-4 h-[3px] w-full bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full bg-cms-gold rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <div className="bg-cms-green py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#/page/gallery" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform" /> Phototheque
            </a>
            <a href="#/actualites" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <Newspaper className="w-4 h-4 group-hover:scale-110 transition-transform" /> Actualites
            </a>
            <a href="#/page/agenda" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" /> Agenda
            </a>
            <a href="#/page/publication" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" /> Publications
            </a>
          </div>
        </div>
      </div>

      {/* Activities */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addRef(0)} className="text-center mb-16">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Nos activites</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3 mb-4">Au service de la microfinance</h2>
            <p className="text-cms-stone max-w-2xl mx-auto">
              Le CMS accompagne les Associations de Micro-Credit et les micro-entrepreneurs a travers des actions de formation, d'appui et de veille.
            </p>
          </div>
          <div ref={addRef(1)} className="grid md:grid-cols-3 gap-8">
            {activityConfig.map((card) => {
              const pg = pageBySlug(card.slug);
              return (
                <a
                  key={card.slug}
                  href={`#/page/${card.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={card.img} alt={pg?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-cms-charcoal/0 group-hover:bg-cms-charcoal/20 transition-colors duration-500" />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 text-cms-green" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-cms-charcoal mb-2 group-hover:text-cms-green transition-colors">
                      {titleCase(pg?.title || card.slug)}
                    </h3>
                    <p className="text-sm text-cms-stone leading-relaxed line-clamp-3">{pg?.paragraphs[0]}</p>
                    <span className="inline-flex items-center gap-1 mt-4 text-cms-green text-sm font-medium">
                      En savoir plus <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addRef(2)} className="text-center mb-16">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Outils de suivi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3 mb-4">Ressources et outils</h2>
            <p className="text-cms-stone max-w-2xl mx-auto">
              Decouvrez nos plateformes dediees a l'education, la cartographie et la formation a distance.
            </p>
          </div>
          <div ref={addRef(3)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolConfig.map((tool) => {
              const pg = pageBySlug(tool.slug);
              return (
                <a key={tool.slug} href={`#/page/${tool.slug}`} className="group relative block rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={tool.img} alt={pg?.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-cms-charcoal/80 via-cms-charcoal/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white font-bold text-lg mb-1">{titleCase(pg?.title || tool.slug)}</h3>
                    <span className="inline-flex items-center gap-1 text-cms-gold-light text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      En savoir plus <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key figures */}
      <section className="py-20 lg:py-28 bg-cms-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addRef(4)} className="text-center mb-14">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">En chiffres</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3 mb-4">Le CMS en quelques chiffres</h2>
          </div>
          <div ref={addRef(5)} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFigures.map((fig) => (
              <div key={fig.label + fig.value} className="group bg-white rounded-xl p-6 lg:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-cms-green/10 flex items-center justify-center group-hover:bg-cms-green group-hover:scale-110 transition-all duration-500">
                  <TrendingUp className="w-6 h-6 text-cms-green group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-cms-green mb-2">{fig.value}</div>
                <div className="text-sm font-semibold text-cms-charcoal">{fig.label}</div>
                <div className="text-xs text-cms-stone mt-2 leading-relaxed">{fig.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 lg:py-28 bg-cms-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div ref={addRef(6)} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Actualites</span>
                  <h2 className="text-3xl font-bold text-cms-charcoal mt-2">Dernieres nouvelles</h2>
                </div>
                <a href="#/actualites" className="hidden sm:inline-flex items-center gap-1 text-cms-green font-medium hover:text-cms-green-dark transition-colors">
                  Voir toutes <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-4">
                {homeNews.map((n) => (
                  <a key={n.slug} href={`#/actualites/${n.slug}`} className="group flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300">
                    <div className="w-2 h-2 mt-2 rounded-full bg-cms-gold flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                        <span className="inline-flex items-center gap-1 text-[11px] text-cms-stone"><Calendar className="w-3 h-3" /> {n.date}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cms-green"><Tag className="w-3 h-3" /> {n.category}</span>
                      </div>
                      <h4 className="font-semibold text-cms-charcoal group-hover:text-cms-green transition-colors text-sm leading-snug line-clamp-2">{n.title}</h4>
                      <p className="text-xs text-cms-stone mt-1 line-clamp-1">{newsExcerpt(n)}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-cms-stone opacity-0 group-hover:opacity-100 flex-shrink-0 ml-auto transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
            <div ref={addRef(7)} className="bg-cms-green rounded-2xl p-8 text-white h-fit">
              <GraduationCap className="w-10 h-10 mb-6 text-cms-gold-light" />
              <h3 className="text-2xl font-bold mb-4">Formation et accompagnement</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Le CMS propose des actions de formation et d'accompagnement des agents des AMC et des micro-entrepreneurs beneficiaires des produits et services.
              </p>
              <a href="#/page/formation" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium">
                Decouvrir nos formations <ChevronRight className="w-4 h-4" />
              </a>
              <div className="mt-8 pt-8 border-t border-white/20">
                <Users className="w-10 h-10 mb-6 text-cms-gold-light" />
                <h3 className="text-2xl font-bold mb-4">Promotion et appui</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  Accompagnement des micro-entrepreneurs par le renforcement de leurs capacites et l'appui a la commercialisation de leurs produits.
                </p>
                <a href="#/page/valorisationmicroentrepreneurs" className="inline-flex items-center gap-2 text-cms-gold-light text-sm font-medium hover:text-white transition-colors">
                  En savoir plus <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addRef(8)} className="text-center mb-12">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Partenariats</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3">Nos principaux partenaires</h2>
          </div>
        </div>
        <div className="relative">
          <div className="flex animate-marquee gap-12 py-6">
            {[...partners, ...partners].map((p, i) => (
              <a
                key={i}
                href={p.url || '#/page/partenaires'}
                target={p.url ? '_blank' : undefined}
                rel={p.url ? 'noopener noreferrer' : undefined}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
              >
                <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
        <div className="text-center mt-8">
          <a href="#/page/partenaires" className="inline-flex items-center gap-1 text-cms-green font-medium hover:text-cms-green-dark transition-colors">
            Tous nos partenaires <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Royal quote */}
      <section className="py-20 lg:py-28 bg-cms-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center">
            <img src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/fm5.png" alt="Fondation Mohammed V" className="w-10 h-10 object-contain" />
          </div>
          <blockquote className="text-xl md:text-2xl text-white/95 font-light leading-relaxed italic">
            "Conformement aux Hautes Instructions Royales, et en concertation avec les acteurs du micro credit au Maroc, la Fondation Mohammed V pour la Solidarite a realise le Centre Mohammed VI de Soutien a la Microfinance Solidaire."
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-cms-gold/60" />
            <span className="text-cms-gold-light text-sm font-medium">Fondation Mohammed V pour la Solidarite</span>
            <div className="w-12 h-px bg-cms-gold/60" />
          </div>
        </div>
      </section>
    </>
  );
}

/* ------------------------------ News list ------------------------------- */

const newsCategories = ['Tous', ...Array.from(new Set(news.map((n) => n.category)))];

function NewsListView() {
  const [filter, setFilter] = useState('Tous');
  const [query, setQuery] = useState('');
  const list = news.filter(
    (n) =>
      (filter === 'Tous' || n.category === filter) &&
      (query === '' || n.title.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Actualites' }]} />
        <div className="mb-10">
          <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Carrefour communication</span>
          <h1 className="text-4xl font-bold text-cms-charcoal mt-2">Actualites</h1>
          <p className="text-cms-stone mt-3 max-w-2xl">
            Retrouvez l'ensemble des evenements, activites et temps forts du Centre Mohammed VI de Soutien a la Microfinance Solidaire.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  filter === cat ? 'bg-cms-green text-white shadow-sm' : 'bg-white text-cms-stone hover:text-cms-green'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-cms-stone absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une actualite..."
              className="pl-9 pr-4 py-2 rounded-full text-sm bg-white border border-stone-200 focus:outline-none focus:border-cms-green w-full md:w-64"
            />
          </div>
        </div>

        <div className="text-xs text-cms-stone mb-6">{list.length} article{list.length > 1 ? 's' : ''}</div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((n) => (
            <a key={n.slug} href={`#/actualites/${n.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative h-48 overflow-hidden bg-cms-cream">
                {n.image ? (
                  <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Newspaper className="w-10 h-10 text-cms-stone/40" /></div>
                )}
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-cms-green text-[11px] font-semibold">{n.category}</span>
              </div>
              <div className="p-5">
                <span className="inline-flex items-center gap-1 text-[11px] text-cms-stone mb-2"><Calendar className="w-3 h-3" /> {n.date}</span>
                <h3 className="font-bold text-cms-charcoal leading-snug group-hover:text-cms-green transition-colors line-clamp-3">{n.title}</h3>
                <p className="text-xs text-cms-stone mt-2 line-clamp-2">{newsExcerpt(n)}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-cms-green text-sm font-medium">
                  Lire l'article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
        {list.length === 0 && <p className="text-center text-cms-stone py-16">Aucune actualite ne correspond a votre recherche.</p>}
      </div>
    </div>
  );
}

/* ----------------------------- News detail ------------------------------ */

function NewsDetailView({ slug }: { slug: string }) {
  const item = newsBySlug(slug);
  if (!item) return <NotFound />;
  const related = news.filter((n) => n.slug !== slug && n.category === item.category).slice(0, 3);
  const galleryExtra = item.gallery.filter((g) => g !== item.image);
  const bodyParagraphs = contentParagraphs(item);
  const paragraphs = bodyParagraphs.length
    ? bodyParagraphs
    : item.paragraphs.filter((p) => p.trim() && p.trim() !== item.date.trim() && !NOISE_RE.test(p.trim()));

  return (
    <div className="min-h-screen animate-page-in bg-cms-warm">
      {/* Immersive header — image-backed when available, green band otherwise */}
      {item.image ? (
        <header className="relative h-[58vh] min-h-[420px] max-h-[640px] overflow-hidden bg-cms-charcoal">
          <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cms-charcoal via-cms-charcoal/55 to-cms-charcoal/20" />
          <div className="relative h-full flex items-end">
            <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cms-gold text-white text-xs font-semibold uppercase tracking-wider"><Tag className="w-3.5 h-3.5" /> {item.category}</span>
                <span className="inline-flex items-center gap-1.5 text-white/80 text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl [text-shadow:0_2px_20px_rgba(0,0,0,0.4)]">
                {item.title}
              </h1>
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-cms-green text-white pt-28 pb-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cms-gold text-white text-xs font-semibold uppercase tracking-wider"><Tag className="w-3.5 h-3.5" /> {item.category}</span>
              <span className="inline-flex items-center gap-1.5 text-white/80 text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-4xl">{item.title}</h1>
          </div>
        </header>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <a href="#/actualites" className="inline-flex items-center gap-2 text-sm text-cms-green hover:text-cms-green-dark transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Retour aux actualites
        </a>
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Body */}
          <article className="lg:col-span-2">
            <div className="space-y-5">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? 'text-lg text-cms-charcoal leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-cms-green first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85]'
                      : 'text-cms-stone leading-relaxed text-base'
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {galleryExtra.length > 0 && (
              <div className="mt-12">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-cms-gold mb-4">
                  <ImageIcon className="w-4 h-4" /> Galerie
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {galleryExtra.map((g, i) => (
                    <img key={i} src={g} alt="" className="rounded-lg w-full h-32 object-cover hover:opacity-90 transition-opacity" loading="lazy" />
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky meta rail */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cms-gold mb-4">A propos</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-cms-green flex-shrink-0" />
                    <span className="text-cms-stone">{item.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-4 h-4 text-cms-green flex-shrink-0" />
                    <span className="text-cms-charcoal font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-cms-green flex-shrink-0 mt-0.5" />
                    <span className="text-cms-stone leading-snug">Centre Mohammed VI de Soutien a la Microfinance Solidaire</span>
                  </div>
                </dl>
              </div>
              <a
                href="#/actualites"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-stone-200 text-cms-charcoal font-medium rounded-xl hover:border-cms-green hover:text-cms-green transition-colors"
              >
                <Newspaper className="w-4 h-4" /> Toutes les actualites
              </a>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <div className="bg-cms-cream py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1.5 h-7 rounded-full bg-cms-gold" />
              <h3 className="text-2xl font-bold text-cms-charcoal">Articles similaires</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {related.map((n) => (
                <a key={n.slug} href={`#/actualites/${n.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                  <div className="h-40 overflow-hidden bg-cms-cream">
                    {n.image && <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />}
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] text-cms-stone">{n.date}</span>
                    <h4 className="font-bold text-cms-charcoal leading-snug mt-1 group-hover:text-cms-green transition-colors line-clamp-3">{n.title}</h4>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ Generic page ---------------------------- */

function PageView({ slug }: { slug: string }) {
  // Special data-rich pages
  if (slug === 'gallery') return <GalleryIndexView />;
  if (slug === 'gallery-video') return <VideothequeView />;
  if (slug === 'agenda') return <AgendaView />;
  if (slug === 'recrutement') return <RecrutementView />;
  if (slug === 'publication') return <PublicationView />;
  if (slug === 'qsn_equipes') return <TeamView />;

  const page = pageBySlug(slug);
  if (!page) return <NotFound />;

  const extras = pageExtras[slug];
  // For link/document pages, the short label-paragraphs are not real prose.
  const textParagraphs = extras ? page.paragraphs.filter((p) => p.trim().length > 40) : page.paragraphs;
  const introParagraphs = textParagraphs.length ? textParagraphs : extras?.intro || [];

  // Partner grid page
  if (slug === 'partenaires') {
    return (
      <div className="pt-28 pb-20 min-h-screen animate-page-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb trail={[{ label: titleCase(page.title) }]} />
          <h1 className="text-4xl font-bold text-cms-charcoal mb-4">{titleCase(page.title)}</h1>
          <p className="text-cms-stone mb-10 max-w-2xl">{page.paragraphs[0]}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {partners.map((p, i) => (
              <a
                key={i}
                href={p.url || undefined}
                target={p.url ? '_blank' : undefined}
                rel={p.url ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-xl p-5 h-28 flex items-center justify-center shadow-sm hover:shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
              >
                <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const group = groupOfSlug(slug);
  const siblings = group?.children.filter((c) => c.slug !== slug) ?? [];
  // A paragraph that ends in ":" reads as a sub-heading; the rest is body prose.
  const isHeading = (p: string) => /[: ]\s*$/.test(p.trim()) && p.trim().length < 90;

  return (
    <div className="min-h-screen animate-page-in">
      {/* Editorial header band — distinct from a plain image-on-top layout */}
      <header className="relative bg-cms-green text-white pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute -top-20 -left-16 w-96 h-96 rounded-full bg-white" />
          <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full bg-cms-gold" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center flex-wrap gap-2 text-xs text-white/70 mb-6">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            {group && (
              <span className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/90">{navLabel(group.label)}</span>
              </span>
            )}
            <span className="flex items-center gap-2">
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium">{titleCase(page.title)}</span>
            </span>
          </nav>
          <span className="inline-block text-cms-gold-light text-sm font-semibold tracking-wider uppercase">
            {group ? navLabel(group.label) : 'Centre Mohammed VI'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 max-w-3xl leading-tight">{titleCase(page.title)}</h1>
          <div className="mt-6 w-20 h-1 rounded-full bg-cms-gold" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {/* Main content */}
          <article className="lg:col-span-2">
            {page.images[0] && (
              <div className="rounded-2xl overflow-hidden mb-10 shadow-sm">
                <img src={page.images[0]} alt={page.title} className="w-full object-cover" />
              </div>
            )}
            <div className="space-y-5">
              {introParagraphs.length > 0 ? (
                introParagraphs.map((p, i) =>
                  isHeading(p) ? (
                    <h2 key={i} className="flex items-center gap-3 text-xl font-bold text-cms-charcoal pt-6 first:pt-0">
                      <span className="w-1.5 h-6 rounded-full bg-cms-gold flex-shrink-0" />
                      {p.replace(/[:\s]+$/, '')}
                    </h2>
                  ) : (
                    <p
                      key={i}
                      className={
                        i === 0
                          ? 'text-lg text-cms-charcoal leading-relaxed first-letter:text-5xl first-letter:font-bold first-letter:text-cms-green first-letter:mr-2 first-letter:float-left first-letter:leading-[0.85]'
                          : 'text-cms-stone leading-relaxed text-base'
                      }
                    >
                      {p}
                    </p>
                  )
                )
              ) : (
                !extras && <p className="text-cms-stone">Contenu a venir.</p>
              )}
            </div>
            {extras && (
              <div className="flex flex-wrap gap-4 mt-10">
                {extras.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors ${
                      l.primary
                        ? 'bg-cms-green text-white hover:bg-cms-green-dark'
                        : 'border border-cms-green text-cms-green hover:bg-cms-green/10'
                    }`}
                  >
                    {l.label} <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
            {page.images.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-12">
                {page.images.slice(1).map((img, i) => (
                  <img key={i} src={img} alt="" className="rounded-lg w-full h-32 object-cover" loading="lazy" />
                ))}
              </div>
            )}
          </article>

          {/* Sticky side rail */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              {siblings.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cms-gold mb-4">
                    {group ? navLabel(group.label) : 'Sur le meme theme'}
                  </h3>
                  <ul className="space-y-1">
                    {siblings.map((c) => (
                      <li key={c.slug}>
                        <a
                          href={childHref(c.slug)}
                          className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm text-cms-charcoal hover:bg-cms-cream hover:text-cms-green transition-colors"
                        >
                          <span className="line-clamp-1">{titleCase(c.title)}</span>
                          <ChevronRight className="w-4 h-4 flex-shrink-0 text-cms-stone group-hover:text-cms-green group-hover:translate-x-0.5 transition-all" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-cms-green rounded-2xl p-6 text-white">
                <Building2 className="w-8 h-8 mb-3 text-cms-gold-light" />
                <h3 className="font-bold text-lg mb-2">Une question ?</h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Notre equipe est a votre ecoute pour toute information complementaire.
                </p>
                <a
                  href="#/contact"
                  className="inline-flex items-center gap-2 text-cms-gold-light text-sm font-medium hover:text-white transition-colors"
                >
                  Nous contacter <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <a
                href="#/"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 border border-stone-200 text-cms-charcoal font-medium rounded-xl hover:border-cms-green hover:text-cms-green transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Retour a l'accueil
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Gallery -------------------------------- */

function GalleryIndexView() {
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Phototheque' }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Carrefour communication</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-3">Phototheque</h1>
        <p className="text-cms-stone mb-10 max-w-2xl">
          {galleries.length} albums retracant les evenements, ceremonies et rencontres organises par le Centre.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((g) => (
            <a key={g.slug} href={`#/gallery/${g.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative h-52 overflow-hidden bg-cms-cream">
                {g.cover && <img src={g.cover} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />}
                <div className="absolute inset-0 bg-cms-charcoal/0 group-hover:bg-cms-charcoal/20 transition-colors duration-500" />
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/90 text-cms-green text-[11px] font-semibold">
                  <ImageIcon className="w-3 h-3" /> {g.count} photos
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-cms-charcoal leading-snug group-hover:text-cms-green transition-colors line-clamp-2">{g.title}</h3>
                <span className="inline-flex items-center gap-1 mt-3 text-cms-green text-sm font-medium">
                  Voir l'album <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecrutementView() {
  const [sent, setSent] = useState(false);
  const formationLevels = ['Niveau bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5'];
  const fileClass =
    'w-full text-sm text-cms-stone file:mr-4 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-cms-green/10 file:text-cms-green file:font-medium hover:file:bg-cms-green/20';
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Recrutement et stages' }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Carrefour communication</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-4">Recrutement et stages</h1>
        <p className="text-cms-stone mb-10 max-w-2xl">
          Vous souhaitez rejoindre le Centre Mohammed VI de Soutien a la Microfinance Solidaire ? Deposez votre
          candidature en remplissant le formulaire ci-dessous.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="bg-cms-green/10 text-cms-green rounded-lg p-6 text-sm font-medium">
              Merci, votre candidature a bien ete enregistree. Le CMS reviendra vers vous si votre profil correspond a
              ses besoins.
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="Nom complet" className="px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
                <input required type="email" placeholder="Email" className="px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
              </div>
              <input placeholder="Telephone" className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-cms-charcoal mb-1.5">Formation</label>
                  <select required defaultValue="" className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm bg-white focus:outline-none focus:border-cms-green">
                    <option value="" disabled>Niveau de formation</option>
                    {formationLevels.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cms-charcoal mb-1.5">Annees d'experience</label>
                  <select required defaultValue="" className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm bg-white focus:outline-none focus:border-cms-green">
                    <option value="" disabled>Nombre d'annees</option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input placeholder="Poste souhaite (ou candidature spontanee)" className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
              <div>
                <label className="block text-sm font-medium text-cms-charcoal mb-1.5">CV</label>
                <input required type="file" accept=".pdf,.doc,.docx" className={fileClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-cms-charcoal mb-1.5">Lettre de motivation</label>
                <input type="file" accept=".pdf,.doc,.docx" className={fileClass} />
              </div>
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors">
                Envoyer ma candidature <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- Team ---------------------------------- */

function TeamView() {
  const page = pageBySlug('qsn_equipes');
  const group = groupOfSlug('qsn_equipes');
  const [lead, ...rest] = teamMembers;

  const Avatar = ({ name, className }: { name: string; className?: string }) => (
    <div className={`relative ${className ?? ''}`}>
      <img
        src={memberAvatar(name)}
        alt={name}
        loading="lazy"
        onError={(e) => {
          // Fall back to a CSS initials chip if the avatar service is unreachable.
          const el = e.currentTarget;
          el.style.display = 'none';
          el.nextElementSibling?.classList.remove('hidden');
        }}
        className="w-full h-full object-cover"
      />
      <div className="hidden absolute inset-0 items-center justify-center bg-cms-green text-white font-bold">
        {memberInitials(name)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen animate-page-in">
      {/* Header band — matches the redesigned page layout */}
      <header className="relative bg-cms-green text-white pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute -top-20 -left-16 w-96 h-96 rounded-full bg-white" />
          <div className="absolute -bottom-32 right-0 w-80 h-80 rounded-full bg-cms-gold" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center flex-wrap gap-2 text-xs text-white/70 mb-6">
            <a href="#/" className="hover:text-white transition-colors">Accueil</a>
            <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {group ? navLabel(group.label) : 'Qui sommes-nous'}</span>
            <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> <span className="text-white font-medium">Notre equipe</span></span>
          </nav>
          <span className="inline-flex items-center gap-2 text-cms-gold-light text-sm font-semibold tracking-wider uppercase">
            <Users className="w-4 h-4" /> {teamMembers.length} collaborateurs
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 leading-tight">{titleCase(page?.title || 'Notre equipe')}</h1>
          <p className="text-white/80 mt-4 max-w-2xl">
            Une equipe pluridisciplinaire engagee au service du developpement de la microfinance solidaire au Maroc.
          </p>
          <div className="mt-6 w-20 h-1 rounded-full bg-cms-gold" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        {/* Featured leadership card */}
        {lead && (
          <div className="mb-14 bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden flex flex-col sm:flex-row">
            <div className="sm:w-64 h-64 sm:h-auto flex-shrink-0 bg-cms-cream">
              <Avatar name={lead.name} className="w-full h-full flex" />
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <span className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-cms-gold/10 text-cms-gold text-xs font-semibold uppercase tracking-wider mb-4">
                Direction
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-cms-charcoal">{lead.name}</h2>
              <p className="text-cms-green font-medium mt-2">{lead.role}</p>
              <p className="text-cms-stone text-sm leading-relaxed mt-4 max-w-md">
                A la tete du Centre Mohammed VI de Soutien a la Microfinance Solidaire, elle coordonne l'ensemble des
                poles et veille a la mise en oeuvre de la strategie de l'institution.
              </p>
            </div>
          </div>
        )}

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {rest.map((m) => (
            <div
              key={m.name}
              className="group bg-white rounded-2xl p-6 text-center shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative mx-auto mb-5 w-24 h-24">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-cms-gold/40 to-cms-green/40 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
                <Avatar name={m.name} className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-stone-100 group-hover:ring-cms-gold/60 transition-all flex" />
              </div>
              <h3 className="font-bold text-cms-charcoal leading-snug group-hover:text-cms-green transition-colors">{m.name}</h3>
              <p className="text-xs text-cms-stone mt-1.5 leading-relaxed">{m.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <a
            href="#/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors"
          >
            Contacter le Centre <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function PublicationView() {
  const page = pageBySlug('publication');
  const items = page?.paragraphs.filter((p) => p.trim()) ?? [];
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Publications' }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Outils de suivi</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-3">Publications</h1>
        <p className="text-cms-stone mb-10 max-w-2xl">
          Retrouvez l'ensemble des publications du CMS : etudes, rapports, notes de tendances et tableaux de bord du
          secteur de la microfinance au Maroc.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((label) => (
            <a
              key={label}
              href="https://www.cm6-microfinance.ma/fr/publication/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-cms-green/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cms-green transition-colors">
                <FileText className="w-5 h-5 text-cms-green group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-cms-charcoal text-sm leading-snug group-hover:text-cms-green transition-colors">{label}</h3>
                <span className="inline-flex items-center gap-1 mt-1 text-xs text-cms-stone">
                  Consulter <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideothequeView() {
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Videotheque' }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Carrefour communication</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-3">Videotheque</h1>
        <p className="text-cms-stone mb-10 max-w-2xl">
          Temoignages de micro-entrepreneurs accompagnes par le Centre Mohammed VI de Soutien a la Microfinance Solidaire.
        </p>
        {videos.length === 0 ? (
          <p className="text-cms-stone">Aucune video disponible pour le moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((v) => (
              <div key={v.slug} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative bg-cms-charcoal aspect-video">
                  <video
                    src={v.src}
                    controls
                    preload="none"
                    className="w-full h-full object-cover"
                  >
                    Votre navigateur ne prend pas en charge la lecture video.
                  </video>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-cms-charcoal leading-snug flex items-center gap-2">
                    <Film className="w-4 h-4 text-cms-gold flex-shrink-0" /> {v.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <a
                      href={v.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cms-green font-medium hover:text-cms-green-dark transition-colors"
                    >
                      <Film className="w-4 h-4" /> Plein ecran
                    </a>
                    <a
                      href={v.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cms-stone hover:text-cms-green transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" /> Voir sur le site
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12">
          <a
            href="https://www.cm6-microfinance.ma/fr/gallery-video/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cms-green font-medium hover:text-cms-green-dark transition-colors"
          >
            Toutes les videos sur cm6-microfinance.ma <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function GalleryDetailView({ slug }: { slug: string }) {
  const g = galleryBySlug(slug);
  const [lightbox, setLightbox] = useState<string | null>(null);
  if (!g) return <NotFound />;
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Phototheque', href: '#/page/gallery' }, { label: g.title }]} />
        <a href="#/page/gallery" className="inline-flex items-center gap-2 text-sm text-cms-green hover:text-cms-green-dark transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour a la phototheque
        </a>
        <h1 className="text-3xl md:text-4xl font-bold text-cms-charcoal mb-2">{g.title}</h1>
        <p className="text-cms-stone text-sm mb-8">{g.count} photos</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {g.images.map((img, i) => (
            <button key={i} onClick={() => setLightbox(img)} className="group relative rounded-lg overflow-hidden aspect-square bg-cms-cream">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-cms-charcoal/0 group-hover:bg-cms-charcoal/20 transition-colors" />
            </button>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-cms-charcoal/90 animate-page-in" onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Fermer">
            <X className="w-6 h-6" />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[88vh] rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
}

/* -------------------------------- Agenda -------------------------------- */

function AgendaView() {
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Agenda' }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Outils de suivi</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-10">Agenda</h1>
        {agenda.length === 0 && <p className="text-cms-stone">Aucun evenement programme pour le moment.</p>}
        <div className="space-y-6">
          {agenda.map((a) => (
            <div key={a.slug} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border-l-4 border-cms-green">
              <div className="flex items-center gap-2 text-cms-gold text-sm font-semibold mb-3">
                <Calendar className="w-4 h-4" /> {a.date}
              </div>
              <h2 className="text-xl font-bold text-cms-charcoal mb-4">{a.title}</h2>
              <div className="space-y-3">
                {a.paragraphs
                  .filter((p) => p !== a.title && !/^\d/.test(p))
                  .map((p, i) => (
                    <p key={i} className="text-cms-stone leading-relaxed text-sm">{p}</p>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Contact -------------------------------- */

function ContactView() {
  const [sent, setSent] = useState(false);
  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Contact' }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Nous contacter</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-10">Contact</h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info + map */}
          <div>
            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cms-green/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-cms-green" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-cms-charcoal">Adresse</div>
                  <p className="text-sm text-cms-stone">{contact.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cms-green/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-cms-green" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-cms-charcoal">Telephone</div>
                  {contact.tel.map((t) => (
                    <a key={t} href={`tel:${t.replace(/\s/g, '')}`} className="block text-sm text-cms-stone hover:text-cms-green transition-colors">{t}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cms-green/10 flex items-center justify-center flex-shrink-0">
                  <Printer className="w-5 h-5 text-cms-green" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-cms-charcoal">Fax</div>
                  <p className="text-sm text-cms-stone">{contact.fax}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-cms-green/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-cms-green" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-cms-charcoal">Email</div>
                  <a href={`mailto:${contact.email}`} className="text-sm text-cms-stone hover:text-cms-green transition-colors">{contact.email}</a>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-sm border border-stone-200">
              <iframe
                title="Localisation CMS"
                src={`https://www.google.com/maps?q=${encodeURIComponent(contact.address)}&output=embed`}
                className="w-full h-72"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-cms-charcoal mb-6">Envoyez-nous un message</h2>
            {sent ? (
              <div className="bg-cms-green/10 text-cms-green rounded-lg p-6 text-sm font-medium">
                Merci, votre message a bien ete pris en compte. Le CMS vous repondra dans les meilleurs delais.
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input required placeholder="Nom complet" className="px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
                  <input required type="email" placeholder="Email" className="px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
                </div>
                <input placeholder="Sujet" className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green" />
                <textarea required rows={5} placeholder="Votre message" className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-cms-green resize-none" />
                <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors">
                  Envoyer le message <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Not found ------------------------------ */

function NotFound() {
  return (
    <div className="pt-40 pb-32 min-h-screen text-center animate-page-in">
      <div className="max-w-md mx-auto px-4">
        <div className="text-6xl font-bold text-cms-green/20 mb-4">404</div>
        <h1 className="text-2xl font-bold text-cms-charcoal mb-3">Page introuvable</h1>
        <p className="text-cms-stone mb-8">La page que vous recherchez n'existe pas ou a ete deplacee.</p>
        <a href="#/" className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors">
          <ArrowLeft className="w-4 h-4" /> Retour a l'accueil
        </a>
      </div>
    </div>
  );
}

/* --------------------------------- App ---------------------------------- */

function App() {
  const route = useHashRoute();

  let view;
  if (route.length === 0) view = <HomeView />;
  else if (route[0] === 'actualites' && route[1]) view = <NewsDetailView slug={route[1]} />;
  else if (route[0] === 'actualites') view = <NewsListView />;
  else if (route[0] === 'gallery' && route[1]) view = <GalleryDetailView slug={route[1]} />;
  else if (route[0] === 'page' && route[1]) view = <PageView slug={route[1]} />;
  else if (route[0] === 'contact') view = <ContactView />;
  else view = <NotFound />;

  return (
    <div className="min-h-screen bg-cms-warm">
      <NavBar route={route} />
      {view}
      <Footer />
    </div>
  );
}

export default App;
