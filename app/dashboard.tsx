"use client";
import React from 'react';
import { Plus, Users, TrendingUp, Calendar, ArrowUpRight, Search, MoreHorizontal } from 'lucide-react';

export default function HRDashboard() {
  return (
    /* Base Background from your reference images */
    <div className="p-8 space-y-8 bg-[#F9FAFB] min-h-screen font-sans text-[#111827]">
      
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">HR Overview</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Manage your team and attendance records</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all w-64"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
           </div>
           <button className="bg-[#4F46E5] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#4338CA] transition-all shadow-sm active:scale-95">
             <Plus size={18} /> Add Employee
           </button>
        </div>
      </div>

      {/* Top Stat Cards - Using the white card style from reference */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Drafts" value="$28,334" icon="📝" />
        <StatCard label="Completed" value="$528,000" icon="✅" trend="+12.5%" />
        <StatCard label="Awaiting" value="$28,000" icon="⏳" />
        <StatCard label="Overdue" value="$8,120" icon="⚠️" isAlert />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area - White background with subtle borders */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg">Attendance Statistics</h3>
            <select className="bg-gray-50 border border-gray-200 text-xs font-bold rounded-lg px-3 py-2 outline-none">
                <option>All Period</option>
                <option>This Month</option>
            </select>
          </div>

          <div className="h-60 flex items-end justify-between px-2">
            {[45, 70, 55, 90, 100, 75, 65].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-4 group w-full">
                <div className="w-10 bg-gray-50 rounded-lg h-48 relative overflow-hidden">
                  <div 
                    style={{height: `${h}%`}} 
                    className={`absolute bottom-0 w-full rounded-b-lg transition-all duration-500 ease-in-out ${
                      i === 4 ? 'bg-indigo-600' : 'bg-indigo-100 group-hover:bg-indigo-200'
                    }`}
                  />
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Message/Leave list style from reference */}
        <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-lg">Leave Requests</h3>
            <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
          </div>
          <div className="p-2 space-y-1">
            <LeaveItem name="John Anderson" reason="Sick Leave" status="Completed" time="2 min ago" />
            <LeaveItem name="Emily Roberts" reason="Personal" status="Awaiting" time="1 hour ago" />
            <LeaveItem name="David Chen" reason="Vacation" status="Awaiting" time="3 hours ago" />
          </div>
          <div className="p-4 mt-auto">
            <button className="w-full py-3 bg-gray-50 text-gray-500 text-xs font-bold rounded-xl hover:bg-gray-100 transition-all">
                VIEW ALL MESSAGES
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function StatCard({ label, value, icon, trend, isAlert = false }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shadow-inner">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">{value}</h2>
            {trend && <span className="text-[10px] text-green-500 font-bold">{trend}</span>}
        </div>
      </div>
    </div>
  );
}

function LeaveItem({ name, reason, status, time }: any) {
  const statusColors: any = {
    Completed: "bg-green-100 text-green-600",
    Awaiting: "bg-orange-100 text-orange-600",
    Overdue: "bg-red-100 text-red-600"
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer group">
      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600 border border-indigo-100">
        {name.split(' ').map((n:any) => n[0]).join('')}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-gray-800">{name}</h4>
            <span className="text-[10px] text-gray-400 font-medium">{time}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{reason}</p>
        <div className="mt-2">
            <span className={`text-[9px] font-bold px-2 py-1 rounded-md ${statusColors[status] || "bg-gray-100"}`}>
                {status}
            </span>
        </div>
      </div>
    </div>
  );
}