"use client";
import React, { useState } from 'react';
import { Search, ChevronDown, Plus, MoreVertical, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function AttendanceSystem() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([
    { name: "xyvie lyons", email: "xyvielyons@gmail.com", phone: "+245728440683", id: "14574172", uid: "4B 4C AC 88", status: "Active" },
  ]);

  // Form State
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', idNumber: '' });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      id: formData.idNumber,
      uid: "PENDING", // Default for new entries
      status: "Active"
    };
    setEmployees([...employees, newEntry]);
    setShowModal(false);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', idNumber: '' });
  };

  return (
    <div className="p-10 bg-white min-h-screen font-sans text-slate-900 relative">
      
      {/* --- MAIN DASHBOARD UI --- */}
      <div className={`${showModal ? 'blur-sm pointer-events-none' : ''} transition-all`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Employees</h1>
          <p className="text-slate-500 mt-1">A list of all the registered employees</p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative w-80">
            <input type="text" placeholder="search for specific employee...." className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none" />
            <Search className="absolute right-3 top-3 text-slate-400" size={18} />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium">Columns <ChevronDown size={16} /></button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium">Status <ChevronDown size={16} /></button>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl font-medium hover:opacity-90 transition"
            >
              Add employee <Plus size={18} />
            </button>
          </div>
        </div>

        {/* Table implementation same as before but using the 'employees' state variable */}
        <table className="w-full border-collapse">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-100 text-left">
                <th className="px-4 py-4 font-medium">username</th>
                <th className="px-4 py-4 font-medium">phone</th>
                <th className="px-4 py-4 font-medium">id</th>
                <th className="px-4 py-4 font-medium">uid</th>
                <th className="px-4 py-4 font-medium text-center">status</th>
                <th className="px-4 py-4 font-medium text-right">actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-xs">XL</div>
                    <div>
                      <div className="font-bold text-sm">{emp.name}</div>
                      <div className="text-xs text-slate-400">{emp.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm">{emp.phone}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{emp.id}</td>
                  <td className="px-4 py-4 text-sm text-slate-600">{emp.uid}</td>
                  <td className="px-4 py-4 text-center">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold border ${emp.status === 'Active' ? 'text-green-600 border-green-200' : 'text-red-400 border-red-200'}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-slate-400"><MoreVertical size={20} className="ml-auto pointer cursor-pointer"/></td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      {/* --- ADD NEW EMPLOYEE MODAL --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
          <div className="bg-white w-[450px] rounded-3xl p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            
            {/* Multi-step indicator */}
            <div className="flex gap-2 mb-6">
              <div className="h-1.5 w-full bg-slate-700 rounded-full"></div>
              <div className="h-1.5 w-full bg-slate-100 border border-slate-300 rounded-full"></div>
              <div className="h-1.5 w-full bg-slate-100 border border-slate-300 rounded-full"></div>
            </div>

            <h2 className="text-2xl font-bold mb-1">Add new employee</h2>
            <p className="text-slate-500 text-sm mb-6">Fill the form with the correct details</p>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-sm font-semibold mb-2 block">first name</label>
                  <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="john" className="w-full p-3 bg-slate-50 rounded-lg outline-none border border-transparent focus:bg-white focus:border-slate-200" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-semibold mb-2 block">last name</label>
                  <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="doe" className="w-full p-3 bg-slate-50 rounded-lg outline-none border border-transparent focus:bg-white focus:border-slate-200" />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="johndoe@example.com" className="w-full p-3 bg-slate-50 rounded-lg outline-none" />
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Phone number</label>
                <div className="relative">
                  <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+254**********59" className="w-full p-3 bg-slate-50 rounded-lg outline-none" />
                  <Eye className="absolute right-4 top-3.5 text-slate-400" size={18} />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Id number</label>
                <div className="relative">
                  <input required value={formData.idNumber} onChange={e => setFormData({...formData, idNumber: e.target.value})} placeholder="153748995998" className="w-full p-3 bg-slate-50 rounded-lg outline-none" />
                  <ChevronDown className="absolute right-4 top-3.5 text-slate-400" size={18} />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" className="bg-[#1a1a1a] text-white px-10 py-3 rounded-2xl font-bold hover:bg-black transition">
                  Next
                </button>
              </div>
            </form>

            <button onClick={() => setShowModal(false)} className="mt-4 w-full text-slate-400 text-xs hover:underline">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}