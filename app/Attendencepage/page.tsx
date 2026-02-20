"use client";
import React, { useState } from 'react';
import { 
  Search, ChevronDown, Plus, MoreVertical, 
  Calendar, Download, Check, X, Filter, UserCheck, UserMinus, Activity
} from 'lucide-react';

export default function AttendanceSystem() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [employees, setEmployees] = useState([
    { name: "xyvie lyons", email: "xyvielyons@gmail.com", id: "14574172", status: "Present" },
    { name: "Abra Barron", email: "barron@gmail.com", id: "14574173", status: "Absent" },
    { name: "Thomas Goodman", email: "goodman@gmail.com", id: "14574174", status: "Present" },
  ]);

  const toggleStatus = (id: string) => {
    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        return { ...emp, status: emp.status === "Present" ? "Absent" : "Present" };
      }
      return emp;
    }));
  };

  return (
    /* SaaS-Elite Neutral Background */
    <div className="p-10 bg-[#F9FAFB] min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Daily Attendance</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Monitoring workforce presence for <span className="text-indigo-600 font-bold">{selectedDate}</span></p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
            <Check size={18} /> Save Records
          </button>
        </div>
      </div>

      {/* --- STATS SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <SummaryCard title="Total Present" value="24" detail="of 26 total" icon={<UserCheck size={22} />} type="success" />
        <SummaryCard title="Total Absent" value="02" detail="4% of workforce" icon={<UserMinus size={22} />} type="danger" />
        <SummaryCard title="Avg. Presence" value="94%" detail="Last 30 days" icon={<Activity size={22} />} type="primary" />
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
            <div className="relative w-80">
                <input type="text" placeholder="Search for specific employee...." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-medium" />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            </div>
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-gray-200 rounded-2xl shadow-sm">
                <Calendar size={16} className="text-indigo-600" />
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-slate-700 text-xs cursor-pointer"
                />
             </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-[11px] uppercase tracking-widest text-gray-500 hover:border-indigo-300 transition-all">Filter <Filter size={14} /></button>
        </div>
      </div>

      {/* --- ATTENDANCE TABLE --- */}
      <div className="bg-white border border-gray-200/60 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 text-left bg-gray-50/50">
              <th className="px-8 py-5 font-bold">Employee</th>
              <th className="px-8 py-5 font-bold">ID Number</th>
              <th className="px-8 py-5 font-bold text-center">Current Status</th>
              <th className="px-8 py-5 font-bold text-right">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {employees.map((emp, i) => (
              <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                <td className="px-8 py-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-[15px] text-slate-900">{emp.name}</div>
                    <div className="text-xs text-gray-400 font-medium">{emp.email}</div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-gray-400">#{emp.id}</td>
                <td className="px-8 py-5 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                    emp.status === 'Present' 
                    ? 'text-emerald-600 border-emerald-100 bg-emerald-50' 
                    : 'text-rose-500 border-rose-100 bg-rose-50'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button 
                    onClick={() => toggleStatus(emp.id)}
                    className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest bg-white border border-gray-200 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm active:scale-95"
                  >
                    Mark {emp.status === 'Present' ? 'Absent' : 'Present'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- PREMIUM SUMMARY CARD ---
function SummaryCard({ title, value, detail, icon, type }: any) {
  const themes: any = {
    success: "text-emerald-600 bg-emerald-50 border-emerald-100 shadow-emerald-100/20",
    danger: "text-rose-600 bg-rose-50 border-rose-100 shadow-rose-100/20",
    primary: "text-indigo-600 bg-indigo-50 border-indigo-100 shadow-indigo-100/20",
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between hover:translate-y-[-4px] transition-all duration-300 group">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{title}</p>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h2>
        <p className={`text-[10px] font-bold mt-2 uppercase tracking-tight ${type === 'danger' ? 'text-rose-400' : 'text-indigo-400'}`}>{detail}</p>
      </div>
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 ${themes[type]} group-hover:scale-110`}>
        {icon}
      </div>
    </div>
  );
}