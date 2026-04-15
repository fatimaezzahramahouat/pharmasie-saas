import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-pharma" element={<Register />} />

        {/* Protected Pharmacist Routes */}
        <Route element={<ProtectedRoute allowedRoles={['ADMIN_PHARMA', 'STAFF']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<div className="p-8"><h1>Inventaire (À venir)</h1></div>} />
            <Route path="/patients" element={<div className="p-8"><h1>Gestion Patients (À venir)</h1></div>} />
            <Route path="/credit" element={<div className="p-8"><h1>Crédits & Paiements (À venir)</h1></div>} />
            <Route path="/settings" element={<div className="p-8"><h1>Paramètres (À venir)</h1></div>} />
          </Route>
        </Route>

        {/* Protected Client Routes */}
        <Route element={<ProtectedRoute allowedRoles={['CLIENT']} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
