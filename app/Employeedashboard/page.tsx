"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Plus, MoreVertical, Eye, X, UserPlus, Filter } from 'lucide-react';

export default function Employeedashboard() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([
    { name: "Xyvie Lyons", email: "xyvielyons@gmail.com", phone: "+245728440683", id: "14574172", uid: "4B 4C AC 88", status: "Active" },
    { name: "Thomas Goodman", email: "goodman@gmail.com", phone: "+245728440690", id: "14574174", uid: "5A 2D BC 99", status: "Active" },
  ]);

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', idNumber: '' });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      id: formData.idNumber,
      uid: "PENDING", 
      status: "Active"
    };
    setEmployees([...employees, newEntry]);
    setShowModal(false);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', idNumber: '' });
  };

  return (
    <div className="p-10 bg-[#F9FAFB] min-h-screen font-sans text-slate-900 relative">
      
      {/* --- HEADER --- */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Employees</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage and monitor your global workforce</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-95"
        >
          <UserPlus size={18} /> Add Employee
        </button>
      </div>

      {/* --- FILTERS --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="relative w-96">
          <input type="text" placeholder="Search by name, email, or ID..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-medium shadow-sm" />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:border-indigo-300 transition-all shadow-sm">
            Columns <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-[11px] uppercase tracking-widest hover:border-indigo-300 transition-all shadow-sm">
            Status <Filter size={14} />
          </button>
        </div>
      </div>

      {/* --- TABLE --- */}
      <div className="bg-white border border-gray-200/60 rounded-[2rem] overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 text-left bg-gray-50/50">
              <th className="px-8 py-5 font-bold">User Details</th>
              <th className="px-8 py-5 font-bold">Phone Number</th>
              <th className="px-8 py-5 font-bold text-center">Employee ID</th>
              <th className="px-8 py-5 font-bold text-center">UID Tag</th>
              <th className="px-8 py-5 font-bold text-center">Status</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
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
                    <div className="font-bold text-[15px] text-slate-900 tracking-tight">{emp.name}</div>
                    <div className="text-xs text-gray-400 font-medium">{emp.email}</div>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-semibold text-gray-600">{emp.phone}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-gray-400 text-center uppercase tracking-widest">ID-{emp.id}</td>
                <td className="px-8 py-5 text-[11px] font-bold text-gray-400 text-center uppercase tracking-widest">{emp.uid}</td>
                <td className="px-8 py-5 text-center">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 bg-emerald-50 text-emerald-600">
                    {emp.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right text-gray-300">
                  <button className="p-2 hover:bg-white hover:text-indigo-600 rounded-lg transition-all hover:shadow-sm">
                    <MoreVertical size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- ADD NEW EMPLOYEE MODAL (Premium SaaS Style) --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-white animate-in zoom-in duration-300">
            
            <div className="bg-indigo-600 p-8 text-white relative">
              <button onClick={() => setShowModal(false)} className="absolute right-6 top-6 text-indigo-200 hover:text-white transition-colors">
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold tracking-tight">Create Employee Profile</h2>
              <p className="text-indigo-100 text-xs mt-1 font-medium opacity-80">Phase 1: Basic Information</p>
            </div>

            <form onSubmit={handleAddEmployee} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">First Name</label>
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="John" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-600 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">Last Name</label>
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Doe" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-600 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">Email Address</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="j.doe@company.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-600 transition-all text-sm font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">Phone Number</label>
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+1 (555) 000-0000" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-600 transition-all text-sm font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 ml-1">ID Card Number</label>
                  <input required value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} placeholder="102938475" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600/10 focus:bg-white focus:border-indigo-600 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-6 py-3.5 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">Discard</button>
                <button type="submit" className="flex-1 px-6 py-3.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">Complete Registration</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}