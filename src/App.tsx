import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ChevronRight,
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
  Phone,
  Mail,
  ChevronLeft,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const partnerLogos = [
  { name: 'Jaida', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/03/Jaida.jpg' },
  { name: 'Universite Hassan 2', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/03/universit%C3%A9-hassan-2.jpg' },
  { name: 'Fondation Micro-Credit du Nord', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Fondation-Micro-cr%C3%A9dit-du-Nord.jpg' },
  { name: 'Amos', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Amos.jpg' },
  { name: 'Bab Rizq Jamel', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Bab-Rizq-Jamel.jpg' },
  { name: 'Aimc', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Aimc.jpg' },
  { name: 'Al Karama Microfinance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Al-Karama-Microfinance.jpg' },
  { name: 'Attadamoune Microfinance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Attadamoune-Microfinance.jpg' },
  { name: 'Inmaa', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Inmaa.jpg' },
  { name: 'Fondation Ardi', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/01/logo-ardi-2024.jpg' },
  { name: 'Al Amana Microfinance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Al-Amana-Microfinance.jpg' },
  { name: 'Arrawaj', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/01/Arrawaj.jpg' },
  { name: 'Attawfiq Microfinance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Attawfiq-Microfinance.jpg' },
  { name: 'Anapec', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/agence-nationale-de-promotion-de-lemploi-et-des-comp%C3%A9tences.jpg' },
  { name: 'FNAM', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Fnam.jpg' },
  { name: 'OFPPT', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Ofppt.jpg' },
  { name: 'Fondation CDG', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Fondation-CDG.jpg' },
  { name: 'Credit Agricole', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/01/logo-cam-2024.jpg' },
  { name: 'Banque Populaire', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/01/bp-nv.jpg' },
  { name: 'Fondation Mohammed V', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Fondation-Mohammed-V.jpg' },
  { name: 'Acim', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Acim.jpg' },
  { name: 'Ada', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Ada.jpg' },
  { name: 'Apefe', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Apefe.jpg' },
  { name: 'BRS', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Brs.jpg' },
  { name: 'CFPB', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Cfpb.jpg' },
  { name: 'Experian', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Experian.jpg' },
  { name: 'Microfact', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Microfact.jpg' },
  { name: 'Smart Campaign', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Smart-campaign.jpg' },
  { name: 'SPTF', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/SPTF.jpg' },
  { name: 'Sanabel', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/02/Sanabel.jpg' },
  { name: 'AFD', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2018/03/Afd-1.jpg' },
];

const heroSlides = [
  {
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/rs-foire-ramadan.jpg-scaled.jpeg',
    title: 'Foire Solidaire Ramadan a Mohammedia',
  },
  {
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/rs-PNME-11eme-edition.jpg-scaled.jpeg',
    title: 'Prix National du Micro-Entrepreneurs - 11eme edition',
  },
  {
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/Plan-de-travail-1-copie-2.png',
    title: 'Lancement du Marche Solidaire d\'Hiver a Casablanca',
  },
  {
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/Plan-de-travail-1-copie.png',
    title: 'Organisation de la 5e edition du Bazar Solidaire de Casablanca',
  },
  {
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/Plan-de-travail-1.png',
    title: 'Organisation de la 5e edition du Bazar Solidaire de Mdiq',
  },
];

const newsItems = [
  {
    title: 'Foire Solidaire Ramadan a Mohammedia',
    excerpt: 'A l\'occasion de la Journee internationale des droits des femmes...',
  },
  {
    title: 'Lancement du Marche Solidaire d\'Hiver a Casablanca',
    excerpt: 'Le CMS, en partenariat avec Casa Anfa, donne rendez-vous du...',
  },
  {
    title: 'Participation CMS au "Women in Business"',
    excerpt: 'Le 15 octobre 2025, le Centre Mohammed VI de Soutien...',
  },
  {
    title: 'Signature d\'une Convention de Partenariat',
    excerpt: 'Entre Le Secretariat d\'Etat Charge de l\'Artisanat et de l\'Economie Sociale et Solidaire...',
  },
  {
    title: 'Participation du CMS a la Semaine Nationale de la Microfinance',
    excerpt: 'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire...',
  },
  {
    title: 'Organisation de la 5e edition du Bazar Solidaire de Casablanca',
    excerpt: 'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire...',
  },
  {
    title: 'Organisation de la 5e edition du Bazar Solidaire de Mdiq',
    excerpt: 'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire...',
  },
  {
    title: 'Salon Solidaire des Artistes',
    excerpt: 'Le 23 juin, la Galerie d\'art de la Fondation CDG...',
  },
];

const activityCards = [
  {
    title: 'Formation',
    desc: 'Actions de formation et d\'accompagnement des agents des Associations de Micro-Credit (AMC) et des micro-entrepreneurs.',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/10.png',
    href: '#',
  },
  {
    title: 'Appui a la micro-entreprise',
    desc: 'Accompagnement des micro-entrepreneurs par le renforcement de leurs capacites techniques et manageriales.',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/012.png',
    href: '#',
  },
  {
    title: 'Observatoire',
    desc: 'Plateforme d\'information, d\'etudes et de veille sur le secteur de la Microfinance.',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/11.png',
    href: '#',
  },
];

const toolCards = [
  { title: 'Communication et partenariats', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/04.png', href: '#' },
  { title: 'Education financiere pour tous', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/03.png', href: '#' },
  { title: 'Cartographie nationale de la microfinance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/geo.png', href: '#' },
  { title: 'e-Learning Formation a distance', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/02.png', href: '#' },
  { title: 'Bibliotheque', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/01.png', href: '#' },
  { title: 'Publications', img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/0.png', href: '#' },
];

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const partnerTrackRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        heroImgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: 'power2.out' }
      );
      gsap.fromTo(
        heroTextRef.current?.children || [],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
      );

      // Nav scroll effect
      ScrollTrigger.create({
        start: 80,
        onUpdate: (self) => {
          if (navRef.current) {
            navRef.current.style.backgroundColor = self.progress > 0 ? 'rgba(250,248,245,0.97)' : 'transparent';
            navRef.current.style.boxShadow = self.progress > 0 ? '0 1px 12px rgba(0,0,0,0.06)' : 'none';
          }
        },
      });

      // Section reveals
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
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  // Auto-advance hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length);

  const addSectionRef = (i: number) => (el: HTMLDivElement | null) => {
    sectionRefs.current[i] = el;
  };

  return (
    <div className="min-h-screen bg-cms-warm">
      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className="flex items-center gap-3">
              <img
                src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/logo.png"
                alt="CMS Logo"
                className="h-12 w-auto"
              />
            </a>
            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
                Accueil
              </a>
              <a href="#activites" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
                Activites
              </a>
              <a href="#outils" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
                Outils de suivi
              </a>
              <a href="#partenaires" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
                Partenaires
              </a>
              <a href="#actualites" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
                Actualites
              </a>
              <a href="#contact" className="text-sm font-medium text-cms-charcoal hover:text-cms-green transition-colors">
                Contact
              </a>
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
            <button
              className="lg:hidden p-2 text-cms-charcoal"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-cms-warm/98 backdrop-blur-sm border-t border-stone-200">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-sm font-medium text-cms-charcoal">Accueil</a>
              <a href="#activites" className="block text-sm font-medium text-cms-charcoal">Activites</a>
              <a href="#outils" className="block text-sm font-medium text-cms-charcoal">Outils de suivi</a>
              <a href="#partenaires" className="block text-sm font-medium text-cms-charcoal">Partenaires</a>
              <a href="#actualites" className="block text-sm font-medium text-cms-charcoal">Actualites</a>
              <a href="#contact" className="block text-sm font-medium text-cms-charcoal">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0">
          {heroSlides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: i === currentSlide ? 1 : 0 }}
            >
              <img
                src={slide.img}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
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
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Conformement aux Hautes Instructions Royales, la Fondation Mohammed V pour la Solidarite a realise le Centre Mohammed VI de Soutien a la Microfinance Solidaire.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#actualites"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded hover:bg-cms-green-dark transition-colors"
                >
                  En savoir plus
                  <ChevronRight className="w-4 h-4" />
                </a>
                <button className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Slide controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
          <button onClick={prevSlide} className="p-2 text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentSlide ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className="p-2 text-white/70 hover:text-white transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Quick links bar */}
      <div className="bg-cms-green py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <ImageIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Phototheque
            </a>
            <a href="#actualites" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <Newspaper className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Actualites
            </a>
            <a href="#" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Agenda
            </a>
            <a href="#" className="flex items-center justify-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors group">
              <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Publications
            </a>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <section id="activites" className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addSectionRef(0)} className="text-center mb-16">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Nos activites</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3 mb-4">
              Au service de la microfinance
            </h2>
            <p className="text-cms-stone max-w-2xl mx-auto">
              Le CMS accompagne les Associations de Micro-Credit et les micro-entrepreneurs a travers des actions de formation, d'appui et de veille.
            </p>
          </div>
          <div ref={addSectionRef(1)} className="grid md:grid-cols-3 gap-8">
            {activityCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-cms-charcoal/0 group-hover:bg-cms-charcoal/20 transition-colors duration-500" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-cms-green" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-cms-charcoal mb-2 group-hover:text-cms-green transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-cms-stone leading-relaxed">{card.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="outils" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addSectionRef(2)} className="text-center mb-16">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Outils de suivi</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3 mb-4">
              Ressources et outils
            </h2>
            <p className="text-cms-stone max-w-2xl mx-auto">
              Decouvrez nos plateformes dediees a l'education, la cartographie et la formation a distance.
            </p>
          </div>
          <div ref={addSectionRef(3)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolCards.map((tool) => (
              <a
                key={tool.title}
                href={tool.href}
                className="group relative block rounded-xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={tool.img}
                  alt={tool.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cms-charcoal/80 via-cms-charcoal/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-bold text-lg mb-1">{tool.title}</h3>
                  <span className="inline-flex items-center gap-1 text-cms-gold-light text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    En savoir plus <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* News Ticker Section */}
      <section id="actualites" className="py-20 lg:py-28 bg-cms-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div ref={addSectionRef(4)} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Actualites</span>
                  <h2 className="text-3xl font-bold text-cms-charcoal mt-2">Dernieres nouvelles</h2>
                </div>
                <a href="#" className="hidden sm:inline-flex items-center gap-1 text-cms-green font-medium hover:text-cms-green-dark transition-colors">
                  Voir toutes <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <div className="space-y-4">
                {newsItems.slice(0, 5).map((news, i) => (
                  <a
                    key={i}
                    href="#"
                    className="group flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-cms-gold flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <div>
                      <h4 className="font-semibold text-cms-charcoal group-hover:text-cms-green transition-colors text-sm leading-snug">
                        {news.title}
                      </h4>
                      <p className="text-xs text-cms-stone mt-1 line-clamp-1">{news.excerpt}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-cms-stone opacity-0 group-hover:opacity-100 flex-shrink-0 ml-auto transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
            <div ref={addSectionRef(5)} className="bg-cms-green rounded-2xl p-8 text-white">
              <GraduationCap className="w-10 h-10 mb-6 text-cms-gold-light" />
              <h3 className="text-2xl font-bold mb-4">Formation et accompagnement</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Le CMS propose des actions de formation et d'accompagnement des agents des AMC et des micro-entrepreneurs beneficiaires des produits et services.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Decouvrir nos formations
                <ChevronRight className="w-4 h-4" />
              </a>
              <div className="mt-8 pt-8 border-t border-white/20">
                <Users className="w-10 h-10 mb-6 text-cms-gold-light" />
                <h3 className="text-2xl font-bold mb-4">Promotion et appui</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Accompagnement des micro-entrepreneurs par le renforcement de leurs capacites et l'appui a la commercialisation de leurs produits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partenaires" className="py-20 lg:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addSectionRef(6)} className="text-center mb-12">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Partenariats</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3">
              Nos principaux partenaires
            </h2>
          </div>
        </div>
        <div ref={partnerTrackRef} className="relative">
          <div className="flex animate-marquee gap-12 py-6">
            {[...partnerLogos, ...partnerLogos].map((p, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-40 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
              >
                <img
                  src={p.img}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Royal Quote Section */}
      <section className="py-20 lg:py-28 bg-cms-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div ref={addSectionRef(7)} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-white/10 flex items-center justify-center">
            <img
              src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/fm5.png"
              alt="Fondation Mohammed V"
              className="w-10 h-10 object-contain"
            />
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

      {/* Footer */}
      <footer id="contact" className="bg-cms-charcoal text-white/70 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Qui sommes-nous</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Presentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Infrastructure</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Conseil d'administration</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Organigramme</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Notre equipe</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Partenaires</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Activite</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Formation</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Appui a la micro-entreprise</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Observatoire</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Communication et partenariats</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Outils de suivi</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Agenda</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Education financiere</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> e-Learning</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Cartographie nationale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Carrefour communication</h4>
              <ul className="space-y-2.5">
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Actualites</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Phototheque</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Videotheque</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Recrutement et stages</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-sm flex items-center gap-2"><ChevronRight className="w-3 h-3 text-cms-gold" /> Bibliotheque</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="https://www.cm6-microfinance.ma/wp-content/themes/cm6/img/logo.png"
                alt="CMS"
                className="h-10 w-auto opacity-80"
              />
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cms-gold" />
                +212 5XX-XXXXXX
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cms-gold" />
                contact@cm6-microfinance.ma
              </span>
            </div>
            <p className="text-xs text-white/40">
              Tous droits reserves &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
