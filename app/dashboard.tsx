"use client";
import React from 'react';

import Link from 'next/link';

import { useRouter } from 'next/navigation';

import { 
  LayoutDashboard, Users, CalendarCheck, FileText, Wallet, 
  Settings, HelpCircle, Plus, MoreHorizontal, TrendingUp 
} from 'lucide-react';

export default function HRDashboard() {

     const router = useRouter();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-100 p-6 flex flex-col">
        <div className="text-xl font-bold text-blue-600 mb-10 px-4">Menu</div>
        
        <nav className="space-y-2 flex-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />

           <Link href="/Employeedashboard" className="block outline-none">
                    <NavItem icon={<CalendarCheck size={20}/>}  label="Employee"  />
           </Link>
            <Link href="/Attendencepage" className="block outline-none">
                    <NavItem icon={<CalendarCheck size={20}/>}  label="Attendence"  />
           </Link>

          <NavItem icon={<FileText size={20}/>} label="Leave" />
          <NavItem icon={<Wallet size={20}/>} label="Payroll" hasSubmenu />
        </nav>

        <div className="mt-auto pt-10 border-t border-slate-100 space-y-2 text-slate-400">
          <p className="px-4 text-xs font-semibold uppercase tracking-wider mb-4">Help & Support</p>
          <NavItem icon={<Settings size={20}/>} label="Setting" />
          <NavItem icon={<HelpCircle size={20}/>} label="Help Center" />
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* Top Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Employee" value="26" change="+15%" desc="4 Employee Hiring" primary />
          <StatCard label="Total Presents" value="4" change="-64%" desc="Daily Attendance" />
          <StatCard label="Total Absents" value="11" change="-54%" desc="New Recruitment" />
          <StatCard label="Total Leave" value="11" change="-54%" desc="Need New Employee" />
        </div>

        {/* Middle Section: Charts & Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Attendance Statistic Chart Placeholder */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg">Daily attendance statistic</h3>
              <span className="text-xs text-slate-400 font-medium">IT Student</span>
            </div>
            <div className="h-48 flex items-end justify-between px-4">
              {/* Simple CSS-based bar visualization */}
              {[60, 80, 70, 90, 100, 85, 75].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-4 bg-blue-100 rounded-full h-32 relative overflow-hidden">
                    <div style={{height: `${h}%`}} className="absolute bottom-0 w-full bg-blue-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Sun Mon Tue Wed Thu Fri Sat".split(" ")[i]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Leave Application List */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Leave Application</h3>
              <button className="text-xs font-bold text-blue-500">See All</button>
            </div>
            <div className="space-y-4">
              <LeaveItem name="Maisha Lucy" reason="Sick" status="Approved" color="text-green-500" />
              <LeaveItem name="Zamora Peck" reason="Sick" status="Rejected" color="text-red-500" />
              <LeaveItem name="Amy Aphrodite" reason="Sick" status="Approved" color="text-green-500" />
            </div>
          </div>
        </div>

        {/* Bottom Section: Employee List */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-slate-700">Employee List</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">
              <Plus size={16}/> Add New Employee
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-400 text-sm font-medium border-b border-slate-50">
                <th className="pb-4">Name</th>
                <th className="pb-4">Id</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Date Of Birth</th>
                <th className="pb-4">Join Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <EmployeeRow name="Abra Nelle Barron" id="0027" email="Wocyn@Gmail.com" dob="1971-09-15" join="2020-05-21" status="Active" />
              <EmployeeRow name="Thomas Goodman" id="0028" email="Gapana@Gmail.com" dob="1989-07-25" join="2021-12-01" status="Active" />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// --- SUBCOMPONENTS ---

function NavItem({ icon, label, active = false, hasSubmenu = false }: any) {
  return (
    <div className={`flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all ${
      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-blue-50'
    }`}>
      {icon}
      <span className="font-semibold flex-1 text-sm">{label}</span>
      {hasSubmenu && <ChevronDown size={14} className="opacity-50" />}
    </div>
  );
}

function StatCard({ label, value, change, desc, primary = false }: any) {
  return (
    <div className={`p-5 rounded-3xl border border-slate-100 relative overflow-hidden ${primary ? 'bg-blue-600 text-white' : 'bg-white text-slate-800 shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className={`text-xs font-bold uppercase tracking-wider ${primary ? 'text-blue-100' : 'text-slate-400'}`}>{label}</h4>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${primary ? 'bg-blue-500' : 'bg-blue-50 text-blue-600'}`}>
          <Users size={16} />
        </div>
      </div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="flex items-center gap-2">
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${primary ? 'bg-blue-400 text-white' : 'bg-green-100 text-green-600'}`}>{change}</span>
        <span className={`text-[10px] font-medium ${primary ? 'text-blue-200' : 'text-slate-400'}`}>{desc}</span>
      </div>
    </div>
  );
}

function LeaveItem({ name, reason, status, color }: any) {
  return (
    <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition">
      <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
      <div className="flex-1">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[10px] text-slate-400 font-medium">Reason: {reason}</div>
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-slate-50 ${color}`}>{status}</span>
    </div>
  );
}

function EmployeeRow({ name, id, email, dob, join, status }: any) {
  return (
    <tr className="text-sm hover:bg-slate-50/50 transition">
      <td className="py-4 font-semibold text-slate-700">{name}</td>
      <td className="py-4 text-slate-500">{id}</td>
      <td className="py-4 text-slate-500">{email}</td>
      <td className="py-4 text-slate-500">{dob}</td>
      <td className="py-4 text-slate-500">{join}</td>
      <td className="py-4 font-bold text-green-500">{status}</td>
      <td className="py-4 text-right"><MoreHorizontal className="text-slate-300 inline cursor-pointer" /></td>
    </tr>
  );
}

const ChevronDown = ({ size, className }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);