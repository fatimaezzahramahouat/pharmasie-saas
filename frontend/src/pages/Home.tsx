import { motion } from 'motion/react';
import { useAuthStore } from '../store/useAuthStore';
import { Search, MapPin, Clock, MessageCircle, FileText, ShoppingBag, HeartPulse, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Authenticated Navbar */}
      <nav className="bg-white border-b border-slate-100 py-4 fixed top-0 w-full z-50">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <HeartPulse size={24} />
             </div>
             <span className="font-display font-bold text-2xl tracking-tighter text-slate-900 hidden sm:block">
                Pharma<span className="text-emerald-600">Flow</span>
             </span>
          </Link>

          <div className="flex items-center gap-6">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">{user?.email}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none mt-1">Patient Portal</p>
             </div>
             <button 
                onClick={logout}
                className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
             >
                Déconnexion
             </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 container mx-auto px-6">
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-4xl mx-auto"
        >
           <h1 className="text-4xl font-display font-bold text-slate-900 mb-4 tracking-tight">Bonjour ! 👋</h1>
           <p className="text-slate-500 text-lg mb-12">Bienvenue dans votre espace santé personnel. Comment pouvons-nous vous aider aujourd'hui ?</p>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-emerald-600 p-10 rounded-3xl text-white shadow-xl shadow-emerald-200 relative overflow-hidden group">
                 <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
                 <FileText size={48} className="mb-6 opacity-80" />
                 <h2 className="text-2xl font-bold mb-4">Envoyer une Ordonnance</h2>
                 <p className="text-emerald-100 mb-8 max-w-xs">Prenez votre ordonnance en photo et nous la préparerons pour vous immédiatement.</p>
                 <button className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all">
                    Télécharger document
                 </button>
              </div>

              <div className="bg-slate-900 p-10 rounded-3xl text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
                 <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
                 <ShoppingBag size={48} className="mb-6 opacity-80 decoration-emerald-500" />
                 <h2 className="text-2xl font-bold mb-4">Mes Commandes</h2>
                 <p className="text-slate-400 mb-8 max-w-xs">Suivez vos achats récents et demandez des renouvellements en un clic.</p>
                 <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-emerald-400 transition-all">
                    Voir historique
                 </button>
              </div>
           </div>

           <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm mb-16">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-2xl font-bold">Services Rapides</h2>
                 <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-full">
                    <Clock size={14} />
                    <span>24/7 Support</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                 {[
                    { name: 'Conseil Pro', icon: <MessageCircle size={20} />, color: 'emerald' },
                    { name: 'Pharmacies', icon: <MapPin size={20} />, color: 'blue' },
                    { name: 'Chercher', icon: <Search size={20} />, color: 'purple' },
                    { name: 'Mon Profil', icon: <Users size={20} />, color: 'amber' },
                 ].map((s) => (
                    <button key={s.name} className="flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                       <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                          s.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                          s.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                          s.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                          'bg-amber-50 text-amber-600'
                       }`}>
                          {s.icon}
                       </div>
                       <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{s.name}</span>
                    </button>
                 ))}
              </div>
           </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
