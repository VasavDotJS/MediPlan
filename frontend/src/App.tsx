import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { Stethoscope, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Stethoscope className="text-blue-600 w-8 h-8" />
          <span className="text-2xl font-bold tracking-tight text-slate-800">MediPlan</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Doctors</a>
          <a href="#" className="hover:text-blue-600 transition-colors">About</a>
        </div>
        <div className="flex gap-4">
          <NavigateToLogin />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-8 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            Secure Healthcare <span className="text-blue-600">Simplified</span> for You.
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Experience the next generation of healthcare management. Book appointments, manage records, and connect with top doctors—all in one secure platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/register" className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
              Get Started Now <ArrowRight className="w-5 h-5" />
            </a>
            <button className="flex items-center justify-center gap-2 bg-white text-slate-800 border-2 border-slate-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
              Learn More
            </button>
          </div>
        </div>
        <div className="relative w-full max-w-lg aspect-square bg-blue-100 rounded-3xl overflow-hidden shadow-2xl">
           <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-500/20 flex items-center justify-center">
              <Stethoscope className="w-48 h-48 text-blue-600/40" />
           </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-8 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Choose MediPlan?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We combine advanced security with a user-centric design to provide the best healthcare experience.</p>
        </div>
        <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">High-Tier Security</h3>
            <p className="text-slate-600 leading-relaxed">Your data is encrypted and stored using industry-leading security protocols and AWS infrastructure.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Fast & Reliable</h3>
            <p className="text-slate-600 leading-relaxed">Book appointments in seconds. Our cloud-native architecture ensures 99.9% uptime and low latency.</p>
          </div>
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Top Specialists</h3>
            <p className="text-slate-600 leading-relaxed">Access a wide network of certified doctors and specialists across various medical fields.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Stethoscope className="text-blue-500 w-6 h-6" />
            <span className="text-xl font-bold text-white">MediPlan</span>
          </div>
          <p>© 2026 MediPlan Secure Healthcare. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavigateToLogin = () => (
  <a href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-md">
    Sign In
  </a>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
