import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { ClipboardPlus, Mail, Lock, User, Hash, MapPin, Phone, Building2, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', licenseNum: '', address: '', city: '', phone: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register-pharma', formData);
      alert("Pharmacie créée avec succès ! Vous pouvez maintenant vous connecter.");
      navigate('/login');
    } catch (err: any) {
      alert(err.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Building2 size={120} className="text-emerald-600" />
        </div>

        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
            <ClipboardPlus size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Ouvrir un Espace Pro</h1>
            <p className="text-slate-500 font-medium">Inscrivez votre pharmacie sur PharmaFlow</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} /> Email Professionnel
            </label>
            <input 
              type="email" 
              placeholder="pharmacien@exemple.com" 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Lock size={14} /> Mot de passe
            </label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Building2 size={14} /> Nom de la Pharmacie
            </label>
            <input 
              type="text" 
              placeholder="Pharmacie El Baraka" 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Hash size={14} /> N° de Licence
            </label>
            <input 
              type="text" 
              placeholder="12345/MAR" 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
              onChange={(e) => setFormData({...formData, licenseNum: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Ville
            </label>
            <input 
              type="text" 
              placeholder="Marrakech" 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
              onChange={(e) => setFormData({...formData, city: e.target.value})} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Phone size={14} /> Téléphone
            </label>
            <input 
              type="text" 
              placeholder="0524..." 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
              onChange={(e) => setFormData({...formData, phone: e.target.value})} 
              required 
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} /> Adresse complète
            </label>
            <textarea 
              placeholder="Rue, Quartier, Code postal..." 
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50 resize-none"
              rows={3}
              onChange={(e) => setFormData({...formData, address: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="md:col-span-2 bg-emerald-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-4"
          >
            {loading ? "Création en cours..." : "Confirmer l'inscription"}
            {!loading && <ChevronRight size={20} />}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
          <p className="text-slate-500 font-medium">
            Déjà inscrit sur la plateforme ? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Se connecter</Link>
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <span>Serveur sécurisé & Données cryptées</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
