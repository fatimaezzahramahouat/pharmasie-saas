import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  FileText, 
  ShoppingBag, 
  Stethoscope, 
  Truck, 
  Instagram, 
  Facebook, 
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Users,
  Award,
  HeartPulse,
  Baby,
  Sparkles,
  Plus,
  Minus,
  Send,
  Star,
  Quote,
  Search
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { user, logout } = useAuthStore();

  const navLinks = [
    { name: 'Accueil', href: '#accueil' },
    { name: 'Catégories', href: '#categories' },
    { name: 'Services', href: '#services' },
    { name: 'Avis', href: '#avis' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 medical-gradient rounded-xl flex items-center justify-center shadow-lg shadow-medical-emerald/20">
            <Plus className="text-white" size={28} />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter text-slate-900">
            Pharmacie <span className="text-medical-emerald">Marrakech</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-semibold text-slate-600 hover:text-medical-emerald transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4 border-l border-slate-200 pl-6 ml-2">
            {user ? (
              <>
                <Link 
                  to={user.role === 'CLIENT' ? '/home' : '/dashboard'}
                  className="font-bold text-sm text-medical-emerald hover:underline"
                >
                  {user.role === 'CLIENT' ? 'Espace Patient' : 'Tableau de Bord'}
                </Link>
                <button 
                  onClick={logout}
                  className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-bold text-sm text-slate-700 hover:text-medical-emerald transition-colors">
                  Connexion
                </Link>
                <Link 
                  to="/register-pharma"
                  className="medical-gradient text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-medical-emerald/20 hover:shadow-xl transition-all"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-bold text-slate-800 hover:text-medical-emerald"
                >
                  {link.name}
                </a>
              ))}
              <a href="tel:+212524000000" className="btn-premium-primary w-full">
                <Phone size={20} />
                Appeler Maintenant
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LiveStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const checkStatus = () => {
      const hours = new Date().getHours();
      setIsOpen(hours >= 9 && hours < 21);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card absolute top-10 right-10 md:right-20 p-4 rounded-2xl flex items-center gap-4 z-20"
    >
      <div className={`w-3 h-3 rounded-full animate-pulse ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Statut en direct</p>
        <p className="text-sm font-bold text-slate-900">
          {isOpen ? 'Ouvert • Jusqu\'à 21:00' : 'Fermé • Ouvre à 09:00'}
        </p>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Split Layout Background */}
      <div className="absolute inset-0 flex flex-col lg:flex-row z-0">
        <div className="w-full lg:w-1/2 bg-white" />
        <div className="w-full lg:w-1/2 relative overflow-hidden">
          <motion.img 
            style={{ y: y1 }}
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical Professional" 
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent lg:from-white lg:via-white/20" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-medical-mint text-medical-emerald font-bold text-xs uppercase tracking-widest mb-8"
            >
              <Award size={14} />
              Établissement Agréé à Marrakech
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
              Votre Santé, <br />
              <span className="text-medical-emerald">Notre Excellence.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Plus qu'une pharmacie, un centre de soins moderne au cœur de Guéliz. Expertise, rapidité et produits premium pour votre bien-être.
            </p>

            {/* Mock Search Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col sm:flex-row gap-2 max-w-2xl transform hover:scale-[1.02] transition-transform duration-300 mb-10">
               <div className="flex-1 flex items-center bg-slate-50 rounded-xl px-4 py-3 border border-transparent focus-within:border-medical-emerald transition-colors">
                  <Search className="text-slate-400 mr-3" size={20} />
                  <input 
                     type="text" 
                     placeholder="Rechercher un médicament (ex: Doliprane 1000mg)" 
                     className="bg-transparent border-none outline-none w-full text-slate-700 font-medium"
                  />
               </div>
               <button className="medical-gradient text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-medical-emerald/20 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Trouver <ChevronRight size={18} />
               </button>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-medical-emerald" /> Livraison Rapide</span>
               <span className="flex items-center gap-1"><CheckCircle2 size={16} className="text-medical-emerald" /> Paiement Sécurisé</span>
            </div>
          </motion.div>
        </div>
      </div>

      <LiveStatus />

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Découvrir</span>
        <div className="w-[1px] h-12 bg-slate-200" />
      </motion.div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Années d'Expérience", value: "15+", icon: <Award className="text-medical-emerald" /> },
    { label: "Clients Satisfaits", value: "50k+", icon: <Users className="text-medical-emerald" /> },
    { label: "Produits Référencés", value: "12k+", icon: <ShoppingBag className="text-medical-emerald" /> },
    { label: "Support Client", value: "24/7", icon: <HeartPulse className="text-medical-emerald" /> },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-card group hover:bg-medical-emerald hover:text-white transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-display font-bold mb-1">{stat.value}</h3>
              <p className="text-sm font-semibold opacity-70 text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoriesBento = () => {
  const categories = [
    { 
      title: "Parapharmacie", 
      desc: "Soins dermo-cosmétiques premium", 
      img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800",
      size: "lg",
      icon: <Sparkles size={24} />
    },
    { 
      title: "Bébé & Maman", 
      desc: "Tout pour le confort de bébé", 
      img: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800",
      size: "sm",
      icon: <Baby size={24} />
    },
    { 
      title: "Santé & Vitalité", 
      desc: "Vitamines et compléments", 
      img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800",
      size: "sm",
      icon: <HeartPulse size={24} />
    },
    { 
      title: "Beauté Bio", 
      desc: "Naturellement efficace", 
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=800",
      size: "md",
      icon: <Sparkles size={24} />
    },
  ];

  return (
    <section id="categories" className="py-32 bg-soft-gray">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl mb-6">Explorez nos <br /><span className="text-medical-emerald">Univers Santé</span></h2>
            <p className="text-slate-600 text-lg">Une sélection rigoureuse des meilleures marques internationales et locales pour répondre à tous vos besoins.</p>
          </div>
          <motion.button whileHover={{ x: 5 }} className="flex items-center gap-2 font-bold text-medical-emerald group">
            Voir tout le catalogue <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[700px]">
          {/* Bento Layout */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 bento-card group"
          >
            <img src={categories[0].img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                {categories[0].icon}
              </div>
              <h3 className="text-3xl font-bold mb-2">{categories[0].title}</h3>
              <p className="text-white/70">{categories[0].desc}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bento-card group"
          >
            <img src={categories[1].img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1">{categories[1].title}</h3>
              <p className="text-white/70 text-sm">{categories[1].desc}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bento-card group"
          >
            <img src={categories[2].img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold mb-1">{categories[2].title}</h3>
              <p className="text-white/70 text-sm">{categories[2].desc}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { 
      title: "Photo de l'ordonnance", 
      desc: "Prenez une photo claire de votre ordonnance médicale.", 
      icon: <FileText size={32} /> 
    },
    { 
      title: "Envoi WhatsApp", 
      desc: "Envoyez-la nous directement via notre ligne WhatsApp dédiée.", 
      icon: <MessageCircle size={32} /> 
    },
    { 
      title: "Récupération ou Livraison", 
      desc: "Passez récupérer votre commande ou faites-vous livrer.", 
      icon: <Truck size={32} /> 
    },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-6">Comment ça marche ?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Un processus simple et sécurisé pour gagner du temps et prendre soin de vous sans stress.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-100 -translate-y-1/2 z-0" />
          
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-3xl medical-gradient flex items-center justify-center text-white shadow-xl shadow-medical-emerald/20 mb-8 relative">
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border-4 border-medical-mint flex items-center justify-center text-medical-emerald font-bold">
                    {i + 1}
                  </div>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProfessionalServices = () => {
  const services = [
    {
      title: "Conseils Personnalisés",
      desc: "Nos pharmaciens experts vous accompagnent dans votre traitement avec des conseils sur-mesure.",
      icon: <Stethoscope size={32} />,
    },
    {
      title: "Livraison à Domicile",
      desc: "Service de livraison rapide et sécurisé dans tout Marrakech (Guéliz, Hivernage, Médina...).",
      icon: <Truck size={32} />,
    },
    {
      title: "Suivi Tension & Diabète",
      desc: "Espace dédié pour le contrôle de votre tension artérielle et de votre glycémie gratuitement.",
      icon: <HeartPulse size={32} />,
    },
    {
      title: "Préparations Magistrales",
      desc: "Réalisation de préparations spécifiques prescrites par votre médecin dans notre laboratoire.",
      icon: <Plus size={32} />,
    }
  ];

  return (
    <section id="services" className="py-32 bg-soft-gray">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl mb-8">Des services <br /><span className="text-medical-emerald">Professionnels</span> de proximité</h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Nous mettons l'humain au centre de notre pratique. Notre équipe est formée en continu pour vous offrir le meilleur de l'expertise pharmaceutique moderne.
            </p>
            <div className="space-y-4">
              {['Disponibilité immédiate', 'Produits certifiés', 'Écoute active', 'Confidentialité totale'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 font-bold text-slate-800">
                  <div className="w-6 h-6 rounded-full bg-medical-emerald/10 flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-medical-emerald" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="mt-12 btn-premium-primary"
            >
              En savoir plus sur nous
            </motion.button>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-medical-mint flex items-center justify-center text-medical-emerald mb-6 group-hover:medical-gradient group-hover:text-white transition-all duration-500">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    {
      name: "Karim El Amrani",
      role: "Client Fidèle",
      text: "Le service de livraison est incroyablement rapide. J'ai envoyé mon ordonnance sur WhatsApp et 30 minutes après, j'avais mes médicaments.",
      rating: 5
    },
    {
      name: "Sarah Benjelloun",
      role: "Maman de 2 enfants",
      text: "Une équipe très à l'écoute. Ils m'ont donné d'excellents conseils pour les soins de mon bébé. La pharmacie est magnifique et très propre.",
      rating: 5
    },
    {
      name: "Omar Tazi",
      role: "Résident Guéliz",
      text: "Enfin une pharmacie moderne à Marrakech qui utilise la technologie pour nous simplifier la vie. Je recommande vivement !",
      rating: 5
    }
  ];

  return (
    <section id="avis" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl mb-6">Ce que disent nos clients</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Votre satisfaction est notre plus belle récompense. Découvrez les témoignages de ceux qui nous font confiance.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl bg-soft-gray border border-slate-100 relative"
            >
              <Quote className="absolute top-8 right-8 text-medical-emerald/10" size={60} />
              <div className="flex gap-1 mb-6">
                {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} className="fill-medical-emerald text-medical-emerald" />)}
              </div>
              <p className="text-lg text-slate-700 italic mb-8 leading-relaxed">"{rev.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full medical-gradient flex items-center justify-center text-white font-bold">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Quels sont vos horaires d'ouverture ?",
      a: "Nous sommes ouverts du Lundi au Dimanche de 09:00 à 21:00 sans interruption. Pour les urgences de nuit, veuillez consulter le calendrier des pharmacies de garde."
    },
    {
      q: "Comment fonctionne la livraison à domicile ?",
      a: "Il vous suffit de nous contacter sur WhatsApp. La livraison est gratuite dans un rayon de 2km autour de la pharmacie pour toute commande supérieure à 200 DH."
    },
    {
      q: "Acceptez-vous les mutuelles (CNOPS, CNSS) ?",
      a: "Oui, nous acceptons toutes les mutuelles nationales. Nous préparons vos dossiers de remboursement avec soin pour faciliter vos démarches."
    },
    {
      q: "Comment savoir si vous êtes de garde ?",
      a: "Le calendrier de garde est affiché à l'entrée de la pharmacie. Vous pouvez également nous appeler ou vérifier sur l'application officielle des pharmacies de Marrakech."
    }
  ];

  return (
    <section id="faq" className="py-32 bg-soft-gray">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-center mb-16">Questions Fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <button 
                   onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-6 flex justify-between items-center text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-lg text-slate-800">{faq.q}</span>
                  {openIndex === i ? <Minus size={20} className="text-medical-emerald" /> : <Plus size={20} className="text-medical-emerald" />}
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactAndMap = () => {
  return (
    <section id="contact" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-slate-900 text-white flex flex-col justify-between"
          >
            <div>
              <h2 className="text-4xl mb-8 text-white">Contactez-nous</h2>
              <p className="text-slate-400 mb-12">Une question ? Un besoin urgent ? Notre équipe est là pour vous répondre dans les plus brefs délais.</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-medical-emerald">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Téléphone</p>
                    <p className="text-xl font-bold">+212 524 00 00 00</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-medical-emerald">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">WhatsApp</p>
                    <p className="text-xl font-bold">+212 600 00 00 00</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-medical-emerald">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Adresse</p>
                    <p className="text-xl font-bold">Av. Mohammed V, Guéliz, Marrakech</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-12 border-t border-white/10 flex gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={24} /></a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-soft-gray p-10 rounded-3xl border border-slate-100"
          >
            <h3 className="text-2xl font-bold mb-8">Envoyez un message</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nom Complet</label>
                  <input type="text" placeholder="Votre nom" className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-medical-emerald focus:ring-1 focus:ring-medical-emerald outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Téléphone</label>
                  <input type="tel" placeholder="06..." className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-medical-emerald focus:ring-1 focus:ring-medical-emerald outline-none transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sujet</label>
                <select className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-medical-emerald focus:ring-1 focus:ring-medical-emerald outline-none transition-all">
                  <option>Demande de prix</option>
                  <option>Disponibilité produit</option>
                  <option>Conseil médical</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                <textarea rows={4} placeholder="Comment pouvons-nous vous aider ?" className="w-full p-4 rounded-xl bg-white border border-slate-200 focus:border-medical-emerald focus:ring-1 focus:ring-medical-emerald outline-none transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="btn-premium-primary w-full">
                <Send size={20} />
                Envoyer le message
              </button>
            </form>
          </motion.div>
        </div>

        <div id="localisation" className="mt-12 h-[500px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3397.123456789!2d-8.0083!3d31.6295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDM3JzQ2LjIiTiA4wrAwMCcyOS45Ilc!5e0!3m2!1sfr!2sma!4v1234567890" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Localisation Pharmacie Marrakech"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center">
                <Plus className="text-white" size={24} />
              </div>
              <span className="font-display font-bold text-3xl tracking-tighter">
                Pharmacie <span className="text-medical-emerald">Marrakech</span>
              </span>
            </div>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-10">
              Votre partenaire santé de confiance au cœur de Marrakech. Nous allions tradition pharmaceutique et innovation technologique pour votre bien-être.
            </p>
            <div className="flex gap-4">
              <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-medical-emerald transition-colors">
                <Instagram size={24} />
              </motion.a>
              <motion.a whileHover={{ y: -5 }} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-medical-emerald transition-colors">
                <Facebook size={24} />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-medical-emerald">Navigation</h4>
            <ul className="space-y-4 text-slate-400 font-semibold">
              <li><a href="#accueil" className="hover:text-white transition-colors">Accueil</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Catégories</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#avis" className="hover:text-white transition-colors">Avis Clients</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-8 uppercase tracking-widest text-medical-emerald">Légal</h4>
            <ul className="space-y-4 text-slate-400 font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Conditions Générales</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pharmacie de Garde</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Pharmacie Marrakech. Conçu avec excellence à Marrakech.</p>
          <p className="flex items-center gap-2">
            Fait avec <HeartPulse size={14} className="text-rose-500" /> pour votre santé.
          </p>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <motion.a 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      href="https://wa.me/212524000000" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#25D366]/30 group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-full mr-4 bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none border border-slate-100">
        Besoin d'aide ? WhatsApp
      </span>
    </motion.a>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-medical-emerald selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <CategoriesBento />
        <HowItWorks />
        <ProfessionalServices />
        <Testimonials />
        <FAQ />
        <ContactAndMap />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
