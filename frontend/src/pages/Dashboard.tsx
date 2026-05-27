import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Calendar, User, LogOut, PlusCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';
import client from '../api/client';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(savedUser));
    fetchAppointments();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const response = await client.get('/appointments/my-appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle2 className="text-green-500 w-5 h-5" />;
      case 'pending': return <Clock className="text-amber-500 w-5 h-5" />;
      case 'cancelled': return <XCircle className="text-red-500 w-5 h-5" />;
      default: return <Clock className="text-slate-400 w-5 h-5" />;
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 flex flex-col hidden md:flex">
        <div className="p-8 flex items-center gap-2">
          <Stethoscope className="text-blue-600 w-8 h-8" />
          <span className="text-2xl font-bold text-slate-800 tracking-tight">MediPlan</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold transition-all">
            <Calendar className="w-5 h-5" /> Appointments
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl font-semibold transition-all">
            <User className="w-5 h-5" /> Profile
          </button>
        </nav>

        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-bold transition-all"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Hello, {user.firstName} 👋</h1>
            <p className="text-slate-500 font-medium">Manage your appointments and medical records.</p>
          </div>
          {user.role === 'patient' && (
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95">
              <PlusCircle className="w-5 h-5" /> Book Appointment
            </button>
          )}
        </header>

        {/* Stats / Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <p className="text-slate-500 font-bold text-sm uppercase mb-2">Total Appointments</p>
             <h2 className="text-4xl font-black text-slate-900">{appointments.length}</h2>
          </div>
          <div className="bg-blue-600 p-6 rounded-3xl shadow-lg border border-blue-500 text-white">
             <p className="text-blue-100 font-bold text-sm uppercase mb-2">Next Appointment</p>
             <h2 className="text-2xl font-bold">May 30, 2026</h2>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
             <p className="text-slate-500 font-bold text-sm uppercase mb-2">Role</p>
             <h2 className="text-4xl font-black text-slate-900 capitalize">{user.role}</h2>
          </div>
        </div>

        {/* Appointments List */}
        <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">Upcoming Appointments</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {appointments.length > 0 ? (
              appointments.map((apt: any) => (
                <div key={apt.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {user.role === 'patient' ? `Dr. ${apt.doctor.lastName}` : `Patient: ${apt.patient.firstName} ${apt.patient.lastName}`}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium">{new Date(apt.appointmentDate).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600 capitalize">
                      {getStatusIcon(apt.status)} {apt.status}
                    </div>
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View Details</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-20 text-center">
                <Calendar className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No appointments found.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
