"use client";
import React, { useState } from 'react';
import { 
  Search, Check, X, Calendar, 
  ArrowUpRight, ArrowDownRight, 
  Filter, Download 
} from 'lucide-react';

export default function Attendancepage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [employees, setEmployees] = useState([
    { name: "Abra Nelle Barron", id: "0027", email: "Wocyn@Gmail.com", status: "Present" },
    { name: "Thomas Goodman", id: "0028", email: "Gapana@Gmail.com", status: "Absent" },
    { name: "Sara Jenkins", id: "0029", email: "SaraJ@Gmail.com", status: "Present" },
    { name: "Felix Vance", id: "0030", email: "FelixV@Gmail.com", status: "Present" },
  ]);

  const toggleStatus = (id: string) => {
    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        const nextStatus = emp.status === "Present" ? "Absent" : "Present";
        return { ...emp, status: nextStatus };
      }
      return emp;
    }));
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 p-2">
      {/* --- PREMIUM HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Attendance</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and track daily workforce presence</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition shadow-sm">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Save Changes
          </button>
        </div>
      </div>

      {/* --- STATS SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard 
          title="Overall Presence" 
          value="94.2%" 
          detail="+2.4% from last month" 
          isPositive={true} 
          gradient="from-blue-500 to-indigo-600"
        />
        <SummaryCard 
          title="Today Presents" 
          value="24" 
          detail="On-time: 22" 
          isPositive={true} 
          gradient="from-emerald-500 to-teal-600"
        />
        <SummaryCard 
          title="Today Absents" 
          value="02" 
          detail="Requires follow-up" 
          isPositive={false} 
          gradient="from-rose-500 to-orange-600"
        />
      </div>

      {/* --- TABLE CONTAINER --- */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <Calendar size={16} className="text-indigo-500" />
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent border-none outline-none font-bold text-slate-700 text-sm cursor-pointer"
                />
             </div>
             <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-500 transition shadow-sm">
                <Filter size={18} />
             </button>
          </div>
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none w-80 focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm" 
            />
            <Search className="absolute left-4 top-3.5 text-slate-400" size={18} />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black border-b border-slate-50">
                <th className="px-8 py-6">Employee Details</th>
                <th className="px-8 py-6">ID Number</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {employees.map((emp) => (
                <tr key={emp.id} className="group hover:bg-indigo-50/30 transition-all relative">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs ring-4 ring-indigo-50">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{emp.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-bold tracking-tight">
                    {emp.id}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => toggleStatus(emp.id)}
                        className={`
                          relative flex items-center gap-2 px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-500
                          ${emp.status === "Present" 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100 hover:bg-emerald-100" 
                            : "bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-100"
                          }
                        `}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${emp.status === "Present" ? "bg-emerald-500" : "bg-rose-500"}`} />
                        {emp.status}
                      </button>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-slate-300 hover:text-indigo-600 transition p-2 hover:bg-white hover:shadow-sm rounded-lg">
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- PREMIUM SUMMARY CARD ---
function SummaryCard({ title, value, detail, isPositive, gradient }: any) {
  return (
    <div className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-[0.03] -mr-10 -mt-10 rounded-full group-hover:opacity-[0.07] transition-all duration-500`} />
      
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{title}</p>
      <div className="flex items-baseline gap-3">
        <h2 className="text-4xl font-black text-slate-900">{value}</h2>
        <div className={`flex items-center gap-1 text-[11px] font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {isPositive ? '+12%' : '-2%'}
        </div>
      </div>
      <p className="text-xs text-slate-400 font-medium mt-2">{detail}</p>
    </div>
  );
}