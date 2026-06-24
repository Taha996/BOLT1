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

const news = data.news as NewsItem[];
const pages = data.pages as PageItem[];
const navigation = data.navigation as NavGroup[];
const partners = data.partners as Partner[];
const galleries = data.galleries as Gallery[];
const agenda = data.agenda as AgendaItem[];
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

/* ------------------------------- Routing -------------------------------- */

function useHashRoute(): string[] {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => {
      setHash(window.location.hash);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash.replace(/^#\/?/, '').split('/').filter(Boolean);
}

/* ----------------------------- Shared chrome ---------------------------- */

function NavBar({ route }: { route: string[] }) {
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const onHome = route.length === 0;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [route.join('/')]);

  useEffect(() => {
    const apply = () => {
      if (!navRef.current) return;
      const solid = window.scrollY > 40 || !onHome;
      navRef.current.style.backgroundColor = solid ? 'rgba(250,248,245,0.97)' : 'transparent';
      navRef.current.style.boxShadow = solid ? '0 1px 12px rgba(0,0,0,0.06)' : 'none';
    };
    apply();
    window.addEventListener('scroll', apply);
    return () => window.removeEventListener('scroll', apply);
  }, [onHome]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ backgroundColor: onHome ? 'transparent' : 'rgba(250,248,245,0.97)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#/" className="flex items-center gap-3">
            <img
              src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/logo.png"
              alt="CMS Logo"
              className="h-12 w-auto"
            />
          </a>
          <div className="hidden lg:flex items-center gap-6">
            <a href="#/" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
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
                  className="flex items-center gap-1 text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors"
                >
                  {titleCase(group.label)}
                  {group.children.length > 1 && <ChevronDown className="w-3.5 h-3.5" />}
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
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-cms-charcoal hover:text-cms-green transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-cms-stone">
              <Globe className="w-4 h-4" />
              <span className="text-cms-green">FR</span>
              <span className="cursor-pointer hover:text-cms-green">EN</span>
              <span className="cursor-pointer hover:text-cms-green">AR</span>
            </div>
          </div>
          <button className="lg:hidden p-2 text-cms-charcoal" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                  {titleCase(group.label)}
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
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0">
          {heroSlides.map((slide, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: i === currentSlide ? 1 : 0 }}>
              <img src={slide.image!} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-cms-charcoal/80 via-cms-charcoal/50 to-transparent" />
            </div>
          ))}
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div ref={heroTextRef} className="max-w-2xl">
              <span className="inline-block px-4 py-1.5 bg-cms-gold/90 text-white text-xs font-semibold tracking-wider uppercase rounded mb-6">
                Centre Mohammed VI de Soutien a la Microfinance Solidaire
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg line-clamp-3">
                {heroSlides[currentSlide].excerpt}
              </p>
              <div className="flex items-center gap-4">
                <a
                  href={`#/actualites/${heroSlides[currentSlide].slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded hover:bg-cms-green-dark transition-colors"
                >
                  Lire l'article
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#/actualites"
                  className="inline-flex items-center px-6 py-3 border-2 border-white/40 text-white font-medium rounded hover:bg-white/10 transition-colors"
                >
                  Toutes les actualites
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button onClick={prevSlide} className="p-2 text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70 w-2.5'}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="p-2 text-white/70 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
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
                      <p className="text-xs text-cms-stone mt-1 line-clamp-1">{n.excerpt}</p>
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
                <p className="text-xs text-cms-stone mt-2 line-clamp-2">{n.excerpt}</p>
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

  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: 'Actualites', href: '#/actualites' }, { label: item.category }]} />
        <a href="#/actualites" className="inline-flex items-center gap-2 text-sm text-cms-green hover:text-cms-green-dark transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Retour aux actualites
        </a>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cms-green/10 text-cms-green text-xs font-semibold"><Tag className="w-3.5 h-3.5" /> {item.category}</span>
          <span className="inline-flex items-center gap-1.5 text-cms-stone text-xs font-medium"><Calendar className="w-3.5 h-3.5" /> {item.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-cms-charcoal leading-tight mb-8">{item.title}</h1>
        {item.image && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img src={item.image} alt={item.title} className="w-full object-cover" />
          </div>
        )}
        <div className="space-y-5">
          {item.paragraphs.map((p, i) => (
            <p key={i} className="text-cms-stone leading-relaxed text-base">{p}</p>
          ))}
        </div>

        {galleryExtra.length > 0 && (
          <div className="mt-10">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-cms-gold mb-4">Galerie</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {galleryExtra.map((g, i) => (
                <img key={i} src={g} alt="" className="rounded-lg w-full h-32 object-cover" loading="lazy" />
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 pt-6 border-t border-stone-200 flex items-center gap-3 text-xs text-cms-stone">
          <Building2 className="w-4 h-4 text-cms-gold flex-shrink-0" />
          <span>Centre Mohammed VI de Soutien a la Microfinance Solidaire</span>
        </div>
      </article>

      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <h3 className="text-2xl font-bold text-cms-charcoal mb-8">Articles similaires</h3>
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
      )}
    </div>
  );
}

/* ------------------------------ Generic page ---------------------------- */

function PageView({ slug }: { slug: string }) {
  // Special data-rich pages
  if (slug === 'gallery') return <GalleryIndexView />;
  if (slug === 'agenda') return <AgendaView />;

  const page = pageBySlug(slug);
  if (!page) return <NotFound />;

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

  return (
    <div className="pt-28 pb-20 min-h-screen animate-page-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb trail={[{ label: titleCase(page.title) }]} />
        <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Centre Mohammed VI</span>
        <h1 className="text-4xl font-bold text-cms-charcoal mt-2 mb-8">{titleCase(page.title)}</h1>
        {page.images[0] && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img src={page.images[0]} alt={page.title} className="w-full object-cover" />
          </div>
        )}
        <div className="space-y-5">
          {page.paragraphs.length > 0 ? (
            page.paragraphs.map((p, i) => (
              <p key={i} className="text-cms-stone leading-relaxed text-base">{p}</p>
            ))
          ) : (
            <p className="text-cms-stone">Contenu a venir.</p>
          )}
        </div>
        {page.images.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-10">
            {page.images.slice(1).map((img, i) => (
              <img key={i} src={img} alt="" className="rounded-lg w-full h-32 object-cover" loading="lazy" />
            ))}
          </div>
        )}
        <div className="mt-12">
          <a href="#/" className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour a l'accueil
          </a>
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
