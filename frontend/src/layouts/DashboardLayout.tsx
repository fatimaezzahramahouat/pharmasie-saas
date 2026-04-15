import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { 
  Home, 
  Package, 
  Users, 
  CreditCard, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X, 
  Plus,
  LayoutDashboard,
  Settings,
  HelpCircle
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Vue d\'ensemble', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Stock & Inventaire', href: '/inventory', icon: <Package size={20} /> },
    { name: 'Patients', href: '/patients', icon: <Users size={20} /> },
    { name: 'Crédits & Paiements', href: '/credit', icon: <CreditCard size={20} /> },
  ];

  const secondaryLinks = [
    { name: 'Paramètres', href: '/settings', icon: <Settings size={20} /> },
    { name: 'Aide', href: '/help', icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-slate-900 text-white shadow-2xl z-30">
        <div className="p-8 pb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Plus className="text-white" size={24} />
          </div>
          <span className="font-display font-bold text-2xl tracking-tighter">
            Pharma<span className="text-emerald-500">Flow</span>
          </span>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">Menu Principal</p>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-semibold ${
                location.pathname === link.href 
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <div className="pt-8 mb-4">
             <p className="px-4 text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-4">Système</p>
             {secondaryLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-semibold ${
                    location.pathname === link.href 
                    ? 'text-emerald-500' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 w-full px-4 py-4 text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all font-bold"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-6 flex-1">
             <button className="lg:hidden text-slate-600" onClick={() => setIsMobileMenuOpen(true)}>
                <Menu size={24} />
             </button>
             <div className="hidden md:flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full max-w-md focus-within:border-emerald-500 transition-colors">
                <Search size={18} className="text-slate-400" />
                <input type="text" placeholder="Rechercher un médicament, un patient..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-600" />
             </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
               <Bell size={22} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-slate-100">
               <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900">{user?.name || 'Administrateur'}</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{user?.role === 'ADMIN_PHARMA' ? 'Titulaire' : 'Staff'}</p>
               </div>
               <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold shadow-inner">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
               </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
           <Outlet />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileMenuOpen(false)}
               className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
               initial={{ x: '-100%' }}
               animate={{ x: 0 }}
               exit={{ x: '-100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed inset-y-0 left-0 w-72 bg-slate-900 text-white z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Plus className="text-emerald-500" size={24} />
                  <span className="font-display font-bold text-2xl tracking-tighter">PharmaFlow</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                   <X size={24} className="text-slate-400" />
                </button>
              </div>

              <nav className="flex-1 px-4 space-y-2 mt-4">
                 {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all font-semibold ${
                        location.pathname === link.href 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  ))}
              </nav>

              <div className="p-6 border-t border-white/5">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-4 w-full px-4 py-4 text-slate-400 font-bold"
                >
                  <LogOut size={20} />
                  Déconnexion
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
