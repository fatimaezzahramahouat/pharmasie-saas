import { motion } from 'motion/react';
import { Package, TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Ventes du jour', value: '4,560 DH', change: '+12.5%', icon: <DollarSign size={24} />, color: 'emerald' },
    { name: 'Commandes', value: '28', change: '+5.2%', icon: <Package size={24} />, color: 'blue' },
    { name: 'Nouveaux Patients', value: '12', change: '-2.1%', icon: <Users size={24} />, color: 'purple' },
    { name: 'Niveau de Stock', value: '94%', change: 'Stable', icon: <TrendingUp size={24} />, color: 'amber' },
  ];

  const recentActivities = [
    { id: 1, type: 'Sale', item: 'Amoxicilline 500mg', time: '10 min ago', price: '45.00 DH' },
    { id: 2, type: 'Stock', item: 'Lovenox 4000', time: '25 min ago', status: 'Rupture imminente' },
    { id: 3, type: 'Patient', item: 'Mohamed Amrani', time: '1 hour ago', action: 'Nouveau dossier' },
    { id: 4, type: 'Payment', item: 'Crédit Pharma-Gueliz', time: '3 hours ago', amount: '1,200 DH' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Tableau de Bord</h1>
        <p className="text-slate-500 font-medium">Bienvenue au centre de contrôle PharmaFlow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-black ${
                stat.change.startsWith('+') ? 'text-emerald-500' : 
                stat.change.startsWith('-') ? 'text-rose-500' : 'text-slate-400'
              }`}>
                {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : 
                 stat.change.startsWith('-') ? <ArrowDownRight size={14} /> : null}
                {stat.change}
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.name}</h3>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h2 className="text-xl font-bold flex items-center gap-3">
                    <Activity className="text-emerald-600" size={24} />
                    Activités Récentes
                 </h2>
                 <button className="text-xs font-bold text-emerald-600 uppercase tracking-widest hover:underline">Voir tout</button>
              </div>
              <div className="space-y-6">
                 {recentActivities.map((act) => (
                    <div key={act.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                             {act.type === 'Sale' ? <DollarSign size={18} /> : 
                              act.type === 'Stock' ? <Package size={18} /> : <Users size={18} />}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-800">{act.item}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{act.time}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-xs font-black text-slate-900">{act.price || act.status || act.amount || act.action}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-emerald-900 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
              <h3 className="text-xl font-bold mb-4">Stock d'urgence</h3>
              <p className="text-emerald-300 text-sm mb-8">Analysez les produits à commander immédiatement pour éviter les ruptures.</p>
              <button className="w-full bg-emerald-500 p-4 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:bg-white hover:text-emerald-900 transition-all">
                 Générer la commande
              </button>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold mb-6">Objectif Mensuel</h3>
              <div className="relative w-32 h-32 mx-auto mb-6">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                    <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="364" strokeDashoffset="100" className="text-emerald-500" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-black text-slate-900">72%</span>
                 </div>
              </div>
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">Atteint (CA)</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
