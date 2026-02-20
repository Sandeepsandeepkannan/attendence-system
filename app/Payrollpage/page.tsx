"use client";
import React from 'react';
import { 
  Wallet, TrendingUp, Download, Filter, 
  Search, DollarSign, CreditCard, ChevronDown, ArrowUpRight, ReceiptText
} from 'lucide-react';

export default function Payrollpage() {
  const payrollData = [
    { name: "Abra Nelle Barron", id: "0027", email: "wocyn@gmail.com", base: 4500, bonus: 500, tax: 450, status: "Paid" },
    { name: "Thomas Goodman", id: "0028", email: "gapana@gmail.com", base: 3800, bonus: 200, tax: 380, status: "Pending" },
    { name: "Sara Jenkins", id: "0029", email: "saraj@gmail.com", base: 5200, bonus: 800, tax: 520, status: "Paid" },
  ];

  return (
    /* SaaS-Elite Neutral Background */
    <div className="p-10 bg-[#F9FAFB] min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payroll</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium italic">Manage compensation and financial disbursements</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-semibold text-xs text-gray-600 hover:bg-gray-50 transition shadow-sm">
            <Download size={16} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-95">
            <DollarSign size={18} /> Run Payroll
          </button>
        </div>
      </div>

      {/* --- FINANCIAL SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <FinanceCard 
          label="Total Disbursement" 
          amount="$48,250.00" 
          detail="Feb 2026 Payout" 
          icon={<Wallet size={22}/>} 
          trend="+4.2%"
        />
        <FinanceCard 
          label="Pending Approvals" 
          amount="$12,400.00" 
          detail="3 Employees left" 
          icon={<CreditCard size={22}/>} 
        />
        <FinanceCard 
          label="Tax Deductions" 
          amount="$5,120.00" 
          detail="10% Avg. rate" 
          icon={<TrendingUp size={22}/>} 
        />
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative w-80">
          <input type="text" placeholder="Search transaction history..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm font-medium shadow-sm" />
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-[11px] uppercase tracking-widest text-gray-500 hover:border-indigo-300 transition-all shadow-sm">Month <ChevronDown size={14} /></button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-[11px] uppercase tracking-widest text-gray-500 hover:border-indigo-300 transition-all shadow-sm">Filter <Filter size={14} /></button>
        </div>
      </div>

      {/* --- PAYROLL TABLE --- */}
      <div className="bg-white border border-gray-200/60 rounded-[2.5rem] overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-gray-400 text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 text-left bg-gray-50/50">
              <th className="px-8 py-5 font-bold">Employee</th>
              <th className="px-6 py-5 font-bold">Base Salary</th>
              <th className="px-6 py-5 font-bold">Bonus</th>
              <th className="px-6 py-5 font-bold text-rose-400">Tax</th>
              <th className="px-6 py-5 font-bold text-slate-900">Net Payable</th>
              <th className="px-6 py-5 font-bold text-center">Status</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {payrollData.map((emp, i) => {
              const netPay = (emp.base + emp.bonus) - emp.tax;
              return (
                <tr key={i} className="hover:bg-indigo-50/30 transition-colors group">
                  <td className="px-8 py-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 text-xs font-black border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-[15px] text-slate-900 tracking-tight">{emp.name}</div>
                      <div className="text-[11px] text-gray-400 font-medium">#{emp.id} — {emp.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-600">${emp.base.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                      +${emp.bonus}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-rose-400">-${emp.tax}</td>
                  <td className="px-6 py-5">
                    <div className="text-[15px] font-black text-slate-900">
                      ${netPay.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                      emp.status === 'Paid' 
                      ? 'text-indigo-600 border-indigo-100 bg-indigo-50' 
                      : 'text-amber-600 border-amber-100 bg-amber-50'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2.5 text-gray-300 hover:text-indigo-600 transition hover:bg-white rounded-xl hover:shadow-sm">
                      <ReceiptText size={20} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- SUBCOMPONENT: FINANCE CARD ---
function FinanceCard({ label, amount, detail, icon, trend }: any) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex items-center justify-between hover:translate-y-[-4px] transition-all duration-300 group">
      <div>
        <div className="flex items-center gap-2 mb-2">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{label}</p>
           {trend && <span className="text-[9px] font-bold text-emerald-500 flex items-center bg-emerald-50 px-1.5 py-0.5 rounded-md"><ArrowUpRight size={10}/> {trend}</span>}
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{amount}</h2>
        <p className="text-[11px] text-indigo-400 font-bold mt-2 uppercase tracking-tight">{detail}</p>
      </div>
      <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm shadow-indigo-100/20">
        {icon}
      </div>
    </div>
  );
}