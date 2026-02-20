"use client";
import React from 'react';
import { 
  Wallet, TrendingUp, Download, Filter, 
  Search, DollarSign, CreditCard, ChevronDown 
} from 'lucide-react';

export default function PayrollDashboard() {
  const payrollData = [
    { name: "Abra Nelle Barron", id: "0027", email: "Wocyn@Gmail.com", base: 4500, bonus: 500, tax: 450, status: "Paid" },
    { name: "Thomas Goodman", id: "0028", email: "Gapana@Gmail.com", base: 3800, bonus: 200, tax: 380, status: "Pending" },
    { name: "Sara Jenkins", id: "0029", email: "SaraJ@Gmail.com", base: 5200, bonus: 800, tax: 520, status: "Paid" },
  ];

  return (
    <div className="p-10 bg-white min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Payroll</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage compensation and salary disbursements</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-sm hover:bg-slate-200 transition">
            <Download size={18} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-black/10">
            <DollarSign size={18} /> Run Payroll
          </button>
        </div>
      </div>

      {/* --- FINANCIAL SUMMARY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <FinanceCard 
          label="Total Disbursement" 
          amount="$48,250.00" 
          detail="Feb 2026 Payout" 
          icon={<Wallet className="text-slate-900" size={20}/>} 
        />
        <FinanceCard 
          label="Pending Approvals" 
          amount="$12,400.00" 
          detail="3 Employees remaining" 
          icon={<CreditCard className="text-slate-900" size={20}/>} 
        />
        <FinanceCard 
          label="Tax Deductions" 
          amount="$5,120.00" 
          detail="10% Avg. rate" 
          icon={<TrendingUp className="text-slate-900" size={20}/>} 
        />
      </div>

      {/* --- SEARCH & FILTERS --- */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="relative w-80">
          <input type="text" placeholder="Search for specific employee...." className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:bg-white focus:ring-1 focus:ring-slate-300 transition-all" />
          <Search className="absolute right-3 top-3 text-slate-400" size={18} />
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-sm">Month <ChevronDown size={16} /></button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 rounded-xl font-medium text-sm">Status <Filter size={16} /></button>
        </div>
      </div>

      {/* --- PAYROLL TABLE --- */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-widest border-b border-slate-100 text-left bg-slate-50/50">
              <th className="px-6 py-5 font-bold">username</th>
              <th className="px-6 py-5 font-bold">base</th>
              <th className="px-6 py-5 font-bold">bonus</th>
              <th className="px-6 py-5 font-bold">tax</th>
              <th className="px-6 py-5 font-bold">net payable</th>
              <th className="px-6 py-5 font-bold text-center">status</th>
              <th className="px-6 py-5 font-bold text-right">slip</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((emp, i) => {
              const netPay = (emp.base + emp.bonus) - emp.tax;
              return (
                <tr key={i} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-bold">
                      {emp.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{emp.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {emp.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-600">${emp.base.toLocaleString()}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-green-600">+${emp.bonus}</td>
                  <td className="px-6 py-5 text-sm font-semibold text-red-400">-${emp.tax}</td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-black text-slate-900">
                      ${netPay.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      emp.status === 'Paid' ? 'text-green-600 border-green-200 bg-green-50' : 'text-amber-500 border-amber-200 bg-amber-50'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-black transition hover:bg-slate-100 rounded-lg">
                      <Download size={18} />
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

// --- SUBCOMPONENT: FINANCE CARD (Minimalist Style) ---
function FinanceCard({ label, amount, detail, icon }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-slate-300 transition-all group">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">{amount}</h2>
        <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">{detail}</p>
      </div>
      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-black group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
  );
}