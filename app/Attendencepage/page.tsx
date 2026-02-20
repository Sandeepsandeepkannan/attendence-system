"use client";
import React, { useState } from 'react';
import { 
  Search, ChevronDown, Plus, MoreVertical, 
  Calendar, Download, Check, X, Filter
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
    <div className="p-10 bg-white min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Attendance</h1>
          <p className="text-slate-500 mt-1">Track and manage employee presence for {selectedDate}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-sm hover:bg-slate-200 transition">
            <Download size={18} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-black/10">
            Save Records
          </button>
        </div>
      </div>

      {/* --- STATS SUMMARY (Minimalist Style) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard title="Total Present" value="24" detail="of 26 total" icon={<Check size={20} className="text-green-600"/>} />
        <SummaryCard title="Total Absent" value="02" detail="4% of workforce" icon={<X size={20} className="text-red-500"/>} />
        <SummaryCard title="Avg. Presence" value="94%" detail="Last 30 days" icon={<Calendar size={20} className="text-slate-600"/>} />
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
            <div className="relative w-80">
                <input type="text" placeholder="Search for specific employee...." className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all" />
                <Search className="absolute right-3 top-3 text-slate-400" size={18} />
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">
                <Calendar size={16} className="text-slate-500" />
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-slate-700 text-xs cursor-pointer"
                />
             </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-sm">Columns <ChevronDown size={16} /></button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-sm">Filter <Filter size={16} /></button>
        </div>
      </div>

      {/* --- ATTENDANCE TABLE --- */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100 text-left bg-slate-50/50">
              <th className="px-6 py-4 font-bold">username</th>
              <th className="px-6 py-4 font-bold">employee id</th>
              <th className="px-6 py-4 font-bold text-center">status</th>
              <th className="px-6 py-4 font-bold text-right">toggle attendance</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
                    {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{emp.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{emp.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-600">#{emp.id}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border transition-all ${
                    emp.status === 'Present' 
                    ? 'text-green-600 border-green-200 bg-green-50' 
                    : 'text-red-500 border-red-200 bg-red-50'
                  }`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => toggleStatus(emp.id)}
                    className="px-4 py-2 text-xs font-bold bg-white border border-slate-200 rounded-lg hover:border-black transition-all hover:bg-black hover:text-white"
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

// --- MINIMALIST SUMMARY CARD ---
function SummaryCard({ title, value, detail, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</p>
        <h2 className="text-2xl font-black text-slate-900">{value}</h2>
        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{detail}</p>
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
        {icon}
      </div>
    </div>
  );
}