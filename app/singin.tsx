"use client";
import React, { useState } from 'react';
import { 
  ShieldCheck, UserCircle, Briefcase, 
  Lock, Mail, Eye, EyeOff, ArrowRight, Check,
  Globe, Fingerprint
} from 'lucide-react';

export default function SignInPage() {
  const [role, setRole] = useState('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate authentication logic
    setTimeout(() => {
        setLoading(false);
        // window.location.href = "/dashboard"; // Redirect after success
    }, 1500);
  };

  return (
    /* h-screen and w-screen ensure it covers the entire viewport, hiding any underlying layout */
    <div className="fixed inset-0 z-[9999] flex min-h-screen bg-white font-sans text-slate-900 overflow-hidden">
      
      {/* --- LEFT SIDE: THE AUTHENTICATION HUB --- */}
      <div className="w-full lg:w-[600px] p-8 md:p-16 flex flex-col justify-between relative bg-white z-10">
        
        {/* Top Branding */}
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 bg-indigo-600 rounded-[1rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <ShieldCheck size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-slate-900">HR.OS</span>
        </div>

        {/* Center Form Container */}
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-left">
            <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 mb-3">System Access</h1>
            <p className="text-slate-500 font-medium text-[15px]">Identify your workspace role to proceed.</p>
          </div>

          {/* --- INTERACTIVE ROLE TILES --- */}
          <div className="flex gap-3 mb-8">
            <RoleButton 
              active={role === 'admin'} 
              onClick={() => setRole('admin')} 
              label="Admin" 
              icon={<Fingerprint size={18} />} 
            />
            <RoleButton 
              active={role === 'manager'} 
              onClick={() => setRole('manager')} 
              label="Manager" 
              icon={<Briefcase size={18} />} 
            />
            <RoleButton 
              active={role === 'employee'} 
              onClick={() => setRole('employee')} 
              label="Staff" 
              icon={<UserCircle size={18} />} 
            />
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">Corporate Email</label>
              <div className="relative group">
                <input 
                  required 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/5 focus:bg-white focus:border-indigo-600 transition-all text-sm font-semibold" 
                />
                <Mail className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Security Key</label>
              </div>
              <div className="relative group">
                <input 
                  required 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-600/5 focus:bg-white focus:border-indigo-600 transition-all text-sm font-semibold" 
                />
                <Lock className="absolute left-4 top-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between px-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600/20" />
                    <span className="text-xs font-bold text-gray-500 group-hover:text-slate-700 transition-colors">Keep me signed in</span>
                </label>
                <a href="#" className="text-xs font-bold text-indigo-600 hover:underline tracking-tight">Recover Password</a>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4.5 rounded-[1.25rem] text-[13px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-2xl shadow-indigo-200 transition-all active:scale-[0.97] disabled:opacity-70"
            >
          
                <>Enter {role} Dashboard <ArrowRight size={18} /></>
            
            </button>
          </form>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between text-gray-400">
            <span className="text-[10px] font-bold uppercase tracking-widest">© 2026 HR.OS Global</span>
            <div className="flex gap-4">
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors">Privacy</a>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors">Terms</a>
            </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: FEATURE SHOWCASE --- */}
      <div className="hidden lg:flex flex-1 bg-[#F8FAFC] p-20 items-center justify-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-100 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-xl">
          <div className="bg-white/70 backdrop-blur-xl p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.04)] border border-white/50">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-gray-100">
                <Globe className="text-indigo-600" size={32} />
             </div>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-6 leading-tight">
                Empowering the future of <br/> <span className="text-indigo-600">Workforce Management.</span>
             </h3>
             <p className="text-slate-500 text-lg leading-relaxed font-medium mb-10">
               Access your personalized workspace with high-fidelity analytics, seamless payroll, and automated employee lifecycle management.
             </p>

             <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">256-bit</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Encryption</p>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-gray-50 shadow-sm">
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">SSO</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Integrated</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- REUSABLE ROLE BUTTON ---
function RoleButton({ active, onClick, label, icon }: any) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center py-4 rounded-2xl border transition-all duration-500 group ${
        active 
        ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 -translate-y-1' 
        : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-100 hover:bg-indigo-50/30'
      }`}
    >
      <div className={`mb-2 transition-transform duration-300 ${active ? 'scale-110 text-white' : 'group-hover:scale-110'}`}>
        {active ? <Check size={20} strokeWidth={3} /> : icon}
      </div>
      <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}