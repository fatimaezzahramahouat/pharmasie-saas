import React, { useState } from 'react';
import api from '../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Loader2, HeartPulse, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, token } = response.data;
      
      setAuth(user, token);
      
      // Redirect based on role
      if (user.role === 'ADMIN_PHARMA' || user.role === 'STAFF') {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Identifiants invalides");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100"
      >
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mb-6 shadow-inner">
            <HeartPulse size={40} />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Espace PharmaFlow</h1>
          <p className="text-slate-500 font-medium">Connectez-vous à votre interface sécurisée</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-sm font-bold"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Mail size={14} /> Email
            </label>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="nom@pharmacie.ma" 
                value={email}
                className="w-full p-4 pl-5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Lock size={14} /> Mot de passe
              </label>
              <a href="#" className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:underline">Oublié ?</a>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              className="w-full p-4 pl-5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50/50"
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-emerald-600 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-700 transition shadow-lg shadow-emerald-200 disabled:opacity-50 text-lg group"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                Accéder à mon espace
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-center text-slate-500 font-medium text-sm mb-6">
            Pas encore membre du réseau ? <br />
            <Link to="/register-pharma" className="text-emerald-600 font-bold hover:underline">Inscrire ma pharmacie</Link>
          </p>
          
          <div className="flex items-center justify-center gap-6 opacity-30">
             <div className="flex items-center gap-1 grayscale">
                <ShieldCheck size={16} />
                <span className="text-[10px] uppercase font-black tracking-widest">Secured</span>
             </div>
             <div className="w-px h-3 bg-slate-300" />
             <span className="text-[10px] uppercase font-black tracking-widest">TLS 1.3</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
