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
  MapPin,
  Tag,
  Building2,
  TrendingUp,
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

type DetailContent = {
  title: string;
  category?: string;
  date?: string;
  location?: string;
  img?: string;
  excerpt: string;
  body: string[];
};

const newsCategories = ['Tous', 'Evenements', 'Partenariats', 'International'] as const;

const newsItems: DetailContent[] = [
  {
    title: 'Foire Solidaire Ramadan a Mohammedia',
    category: 'Evenements',
    date: '9 mars 2026',
    location: 'Parc de la Ville, Mohammedia',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/rs-foire-ramadan.jpg-scaled.jpeg',
    excerpt: 'A l\'occasion de la Journee internationale des droits des femmes, le CMS annonce l\'inauguration officielle de la Rencontre Solidaire des Microentrepreneurs.',
    body: [
      'A l\'occasion de la Journee internationale des droits des femmes, le Centre Mohammed VI de Soutien a la Microfinance Solidaire (CMS) a annonce l\'inauguration officielle de la Rencontre Solidaire des Microentrepreneurs, le 8 mars 2026.',
      'Organisee par le CMS et la Prefecture de Mohammedia, la foire se tient du 24 fevrier au 20 mars 2026 au Parc de la Ville de Mohammedia. Elle reunit 300 exposants venus de toutes les regions du Royaume, beneficiaires d\'institutions de microfinance et porteurs de projets accompagnes par les partenaires du CMS.',
      'L\'evenement constitue une plateforme de visibilite et de mise en reseau, mettant en avant l\'impact de la microfinance a travers la creation de micro-entreprises, la promotion des produits du terroir, l\'artisanat national et le developpement economique local. La foire est ouverte tous les jours de midi a minuit.',
      'Le choix de la date d\'inauguration, le 8 mars, souligne le role des femmes dans l\'autonomisation economique et le developpement territorial. L\'evenement a beneficie d\'une couverture mediatique de Map TV, Maroc.ma et l\'Economiste.',
    ],
  },
  {
    title: 'Lancement du Marche Solidaire d\'Hiver a Casablanca',
    category: 'Evenements',
    date: '12 decembre 2025',
    location: 'ANFA PARK, Casablanca',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/Plan-de-travail-1-copie-2.png',
    excerpt: 'Le CMS, en partenariat avec Casa Anfa, donne rendez-vous du 12 decembre 2025 au 25 janvier 2026 pour une nouvelle edition dediee a l\'artisanat marocain.',
    body: [
      'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire (CMS), en partenariat avec Casa Anfa, organise une nouvelle edition du Marche Solidaire d\'Hiver, du 12 decembre 2025 au 25 janvier 2026, a ANFA PARK a Casablanca.',
      'Cette edition est dediee a la valorisation de l\'artisanat marocain et au soutien de l\'economie sociale et solidaire. Le marche accueille 560 exposants repartis sur quatre periodes tout au long de l\'evenement.',
      'L\'initiative met l\'accent sur trois objectifs cles : valoriser le savoir-faire marocain, soutenir l\'entrepreneuriat feminin et des jeunes, et creer un espace d\'echange commercial et culturel. Les organisateurs l\'ont presentee comme une occasion d\'achats utiles, solidaires et responsables au profit des artisans, des cooperatives et des jeunes entrepreneurs marocains.',
      'L\'evenement a beneficie d\'une couverture des principaux medias marocains, dont Map Express, Le Matin et Aujourd\'hui le Maroc.',
    ],
  },
  {
    title: 'Participation CMS au "Women in Business"',
    category: 'Partenariats',
    date: '16 octobre 2025',
    location: 'Casablanca',
    excerpt: 'Le 15 octobre 2025, le CMS a participe a la conference "Women in Business" organisee par la BERD pour le 10e anniversaire du programme WiB.',
    body: [
      'Le 15 octobre 2025, le Centre Mohammed VI de Soutien a la Microfinance Solidaire (CMS) a participe a la conference "Women in Business : Briser les barrieres pour les femmes entrepreneures - un impact de 1 milliard d\'euros", organisee par la BERD a l\'occasion du 10e anniversaire du programme mondial WiB.',
      'La conference regionale a reuni des entrepreneurs, des institutions financieres, des bailleurs de fonds, des representants gouvernementaux et des acteurs du secteur prive. Parmi les intervenants figuraient Haytham Eissa (Directeur de la BERD pour le Maroc) et Dimiter Tzantchev (Ambassadeur de l\'UE au Maroc).',
      'Mme Amina Sakioudi, Directrice Generale du CMS, a livre une allocution d\'ouverture saluant la reconnaissance du role crucial des femmes dans le developpement economique national. Elle a souligne que les femmes - artisanes, commercantes, couturieres, agricultrices - representent le souffle discret mais puissant du progres silencieux dans les regions du Maroc.',
      'L\'organisation a indique avoir accompagne plus de 1 200 femmes en 2025 a travers des formations, des bazars solidaires et des expositions, demontrant son engagement en faveur de l\'autonomisation economique des femmes.',
    ],
  },
  {
    title: 'Signature d\'une Convention de Partenariat SECAESS - CMS',
    category: 'Partenariats',
    date: '8 octobre 2025',
    location: 'Sale',
    excerpt: 'Le Secretariat d\'Etat Charge de l\'Artisanat et de l\'Economie Sociale et Solidaire (SECAESS) et le CMS ont signe une convention de partenariat.',
    body: [
      'Le Secretariat d\'Etat Charge de l\'Artisanat et de l\'Economie Sociale et Solidaire (SECAESS) et le Centre Mohammed VI de Soutien a la Microfinance Solidaire (CMS) ont signe une convention de partenariat a Sale, le 8 octobre 2025.',
      'Ce partenariat s\'inscrit dans la volonte commune de renforcer l\'accompagnement des micro-entrepreneurs et de valoriser l\'artisanat et l\'economie sociale et solidaire au Maroc.',
    ],
  },
  {
    title: 'Participation a la Semaine Nationale de la Microfinance (SeNaMif)',
    category: 'International',
    date: '26 septembre 2025',
    location: 'Benin',
    excerpt: 'Le CMS etait present a la premiere edition de la Semaine Nationale de la Microfinance (SeNaMif).',
    body: [
      'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire (CMS) etait present a la premiere edition de la Semaine Nationale de la Microfinance (SeNaMif), organisee au Benin.',
      'Cette participation temoigne de l\'ouverture du CMS sur la scene internationale et de son engagement dans le partage d\'expertise au sein du secteur de la microfinance.',
    ],
  },
  {
    title: 'Organisation de la 5e edition du Bazar Solidaire de Casablanca',
    category: 'Evenements',
    date: '26 juillet 2025',
    location: 'Casablanca',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/Plan-de-travail-1-copie.png',
    excerpt: 'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire organise une nouvelle edition du Bazar Solidaire.',
    body: [
      'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire organise la 5e edition du Bazar Solidaire de Casablanca.',
      'Le Bazar Solidaire constitue un rendez-vous incontournable pour les micro-entrepreneurs beneficiaires, offrant un espace de commercialisation et de mise en valeur de leurs produits aupres du grand public.',
    ],
  },
  {
    title: 'Organisation de la 5e edition du Bazar Solidaire de Mdiq',
    category: 'Evenements',
    date: '21 juillet 2025',
    location: 'M\'diq',
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2026/04/Plan-de-travail-1.png',
    excerpt: 'Le CMS organise, du 11 juillet au 31 juillet, la 5e edition du Bazar Solidaire de Mdiq.',
    body: [
      'Le Centre Mohammed VI de Soutien a la Microfinance Solidaire organise, du 11 juillet au 31 juillet, la 5e edition du Bazar Solidaire de Mdiq.',
      'Cette manifestation regionale offre aux micro-entrepreneurs beneficiaires une vitrine pour promouvoir et commercialiser leurs produits, tout en renforcant le dynamisme de l\'economie locale.',
    ],
  },
  {
    title: 'Salon Solidaire des Artistes',
    category: 'Evenements',
    date: '25 juin 2025',
    location: 'Rabat',
    excerpt: 'Le 23 juin, la Galerie d\'art de la Fondation CDG (Espace Expression) a accueilli l\'ouverture du Salon Solidaire des Artistes.',
    body: [
      'Le 23 juin, la Galerie d\'art de la Fondation CDG (Espace Expression) a accueilli l\'ouverture du Salon Solidaire des Artistes.',
      'L\'evenement met en lumiere la dimension culturelle et artistique de l\'action solidaire du CMS, en offrant aux artistes un espace d\'exposition et de rencontre avec le public.',
    ],
  },
];

const activityCards: DetailContent[] = [
  {
    title: 'Formation',
    excerpt: 'Actions de formation et d\'accompagnement des agents des Associations de Micro-Credit (AMC) et des micro-entrepreneurs.',
    body: [
      'La formation vise a developper et conceptualiser les pratiques du micro-credit et a transferer l\'expertise aux acteurs du secteur.',
      'Les objectifs incluent le renforcement des competences operationnelles, l\'organisation d\'ateliers et de seminaires, la formation de formateurs qualifies et la realisation d\'etudes de besoins.',
      'Le CMS propose des actions de formation et d\'accompagnement des agents des AMC et des micro-entrepreneurs beneficiaires des produits et services.',
    ],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/10.png',
  },
  {
    title: 'Appui a la micro-entreprise',
    excerpt: 'Accompagnement des micro-entrepreneurs par le renforcement de leurs capacites techniques et manageriales.',
    body: [
      'Le CMS developpe les capacites manageriales des micro-entrepreneurs grace a une formation dediee, notamment en education financiere.',
      'Le Centre fournit la logistique necessaire a la promotion des produits, facilite l\'acces aux reseaux de commerce solidaire et organise des foires regionales et des rencontres de commercialisation.',
    ],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/012.png',
  },
  {
    title: 'Observatoire',
    excerpt: 'Plateforme d\'information, d\'etudes et de veille sur le secteur de la Microfinance.',
    body: [
      'L\'Observatoire de la Microfinance met a disposition des ressources documentaires et assure une veille sur l\'evolution du secteur aux niveaux national et international.',
      'Il etablit des partenariats de recherche, publie des revues specialisees et organise des evenements de promotion du secteur de la microfinance.',
    ],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/06/11.png',
  },
];

const toolCards: DetailContent[] = [
  {
    title: 'Communication et partenariats',
    excerpt: 'Actions de communication pour promouvoir la connaissance du secteur de la microfinance au Maroc.',
    body: ['Le CMS mene des initiatives de communication visant a promouvoir la connaissance du secteur de la microfinance au Maroc et a renforcer ses partenariats institutionnels.'],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/04.png',
  },
  {
    title: 'Education financiere pour tous',
    excerpt: 'Programmes d\'education financiere destines aux micro-entrepreneurs et au grand public.',
    body: ['Les programmes d\'education financiere du CMS visent a developper les capacites de gestion des micro-entrepreneurs et a renforcer l\'inclusion financiere.'],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/03.png',
  },
  {
    title: 'Cartographie nationale de la microfinance',
    excerpt: 'Systeme de cartographie nationale du secteur de la microfinance.',
    body: ['La cartographie nationale offre une vue d\'ensemble geographique du secteur de la microfinance au Maroc, outil de pilotage et d\'analyse pour les acteurs du secteur.'],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/geo.png',
  },
  {
    title: 'e-Learning Formation a distance',
    excerpt: 'Plateforme de formation a distance pour les acteurs de la microfinance.',
    body: ['La plateforme e-Learning du CMS propose des modules de formation a distance permettant aux agents des AMC et aux micro-entrepreneurs de se former a leur rythme.'],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/02.png',
  },
  {
    title: 'Bibliotheque',
    excerpt: 'Ressources documentaires dediees au secteur de la microfinance.',
    body: ['La bibliotheque du CMS met a disposition une collection de ressources documentaires specialisees dans la microfinance et le developpement.'],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/01.png',
  },
  {
    title: 'Publications',
    excerpt: 'Revues et publications specialisees du Centre.',
    body: ['Le CMS publie des revues et des etudes specialisees rendant compte de l\'evolution du secteur de la microfinance au Maroc et a l\'international.'],
    img: 'https://www.cm6-microfinance.ma/wp-content/uploads/2017/04/0.png',
  },
];

const keyFigures = [
  { value: '2007', label: 'Annee de creation du Centre', sub: 'Inaugure le 8 novembre 2007' },
  { value: '300', label: 'Exposants', sub: 'Foire Solidaire Ramadan a Mohammedia' },
  { value: '560', label: 'Exposants', sub: 'Marche Solidaire d\'Hiver a Casablanca' },
  { value: '1 200+', label: 'Femmes accompagnees', sub: 'Formations, bazars et expositions en 2025' },
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
  const [activeDetail, setActiveDetail] = useState<DetailContent | null>(null);
  const [newsFilter, setNewsFilter] = useState<(typeof newsCategories)[number]>('Tous');

  const filteredNews =
    newsFilter === 'Tous' ? newsItems : newsItems.filter((n) => n.category === newsFilter);

  // Close detail modal on Escape + lock body scroll while open
  useEffect(() => {
    if (!activeDetail) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveDetail(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeDetail]);

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
              <button
                key={card.title}
                onClick={() => setActiveDetail(card)}
                className="group block text-left w-full bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
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
                  <p className="text-sm text-cms-stone leading-relaxed">{card.excerpt}</p>
                  <span className="inline-flex items-center gap-1 mt-4 text-cms-green text-sm font-medium">
                    En savoir plus <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </button>
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
              <button
                key={tool.title}
                onClick={() => setActiveDetail(tool)}
                className="group relative block w-full text-left rounded-xl overflow-hidden aspect-[4/3]"
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Key Figures Section */}
      <section className="py-20 lg:py-28 bg-cms-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={addSectionRef(8)} className="text-center mb-14">
            <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">En chiffres</span>
            <h2 className="text-3xl md:text-4xl font-bold text-cms-charcoal mt-3 mb-4">
              Le CMS en quelques chiffres
            </h2>
            <p className="text-cms-stone max-w-2xl mx-auto">
              Un engagement concret au service des micro-entrepreneurs et de l'inclusion economique.
            </p>
          </div>
          <div ref={addSectionRef(9)} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFigures.map((fig) => (
              <div
                key={fig.label + fig.value}
                className="group bg-white rounded-xl p-6 lg:p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
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

      {/* News Ticker Section */}
      <section id="actualites" className="py-20 lg:py-28 bg-cms-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div ref={addSectionRef(4)} className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-cms-gold text-sm font-semibold tracking-wider uppercase">Actualites</span>
                  <h2 className="text-3xl font-bold text-cms-charcoal mt-2">Dernieres nouvelles</h2>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 text-cms-stone text-sm">
                  {filteredNews.length} article{filteredNews.length > 1 ? 's' : ''}
                </span>
              </div>
              {/* Category filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {newsCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsFilter(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                      newsFilter === cat
                        ? 'bg-cms-green text-white shadow-sm'
                        : 'bg-white text-cms-stone hover:text-cms-green hover:bg-white/80'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                {filteredNews.map((news, i) => (
                  <button
                    key={news.title + i}
                    onClick={() => setActiveDetail(news)}
                    className="group flex items-start gap-4 p-4 w-full text-left bg-white rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-2 h-2 mt-2 rounded-full bg-cms-gold flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                        {news.date && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-cms-stone">
                            <Calendar className="w-3 h-3" /> {news.date}
                          </span>
                        )}
                        {news.category && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cms-green">
                            <Tag className="w-3 h-3" /> {news.category}
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-cms-charcoal group-hover:text-cms-green transition-colors text-sm leading-snug">
                        {news.title}
                      </h4>
                      <p className="text-xs text-cms-stone mt-1 line-clamp-1">{news.excerpt}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-cms-stone opacity-0 group-hover:opacity-100 flex-shrink-0 ml-auto transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
            <div ref={addSectionRef(5)} className="bg-cms-green rounded-2xl p-8 text-white">
              <GraduationCap className="w-10 h-10 mb-6 text-cms-gold-light" />
              <h3 className="text-2xl font-bold mb-4">Formation et accompagnement</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Le CMS propose des actions de formation et d'accompagnement des agents des AMC et des micro-entrepreneurs beneficiaires des produits et services.
              </p>
              <button
                onClick={() => setActiveDetail(activityCards[0])}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium"
              >
                Decouvrir nos formations
                <ChevronRight className="w-4 h-4" />
              </button>
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

      {/* Detail Modal */}
      {activeDetail && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activeDetail.title}
        >
          <div
            className="absolute inset-0 bg-cms-charcoal/70 backdrop-blur-sm animate-modal-fade"
            onClick={() => setActiveDetail(null)}
          />
          <div className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto bg-cms-warm rounded-t-2xl sm:rounded-2xl shadow-2xl animate-modal-pop">
            {/* Close button */}
            <button
              onClick={() => setActiveDetail(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-cms-charcoal hover:bg-white hover:text-cms-green shadow-md transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {activeDetail.img && (
              <div className="relative h-52 sm:h-64 overflow-hidden sm:rounded-t-2xl">
                <img src={activeDetail.img} alt={activeDetail.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cms-charcoal/70 to-transparent" />
              </div>
            )}

            <div className="p-6 sm:p-8">
              {/* Meta badges */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {activeDetail.category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cms-green/10 text-cms-green text-xs font-semibold">
                    <Tag className="w-3.5 h-3.5" /> {activeDetail.category}
                  </span>
                )}
                {activeDetail.date && (
                  <span className="inline-flex items-center gap-1.5 text-cms-stone text-xs font-medium">
                    <Calendar className="w-3.5 h-3.5" /> {activeDetail.date}
                  </span>
                )}
                {activeDetail.location && (
                  <span className="inline-flex items-center gap-1.5 text-cms-stone text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5" /> {activeDetail.location}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-cms-charcoal leading-tight mb-5">
                {activeDetail.title}
              </h3>

              <div className="space-y-4">
                {activeDetail.body.map((para, i) => (
                  <p key={i} className="text-cms-stone leading-relaxed text-sm sm:text-base">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 flex items-center gap-3 text-xs text-cms-stone">
                <Building2 className="w-4 h-4 text-cms-gold flex-shrink-0" />
                <span>Centre Mohammed VI de Soutien a la Microfinance Solidaire</span>
              </div>

              <button
                onClick={() => setActiveDetail(null)}
                className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-cms-green text-white font-medium rounded-lg hover:bg-cms-green-dark transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Retour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
