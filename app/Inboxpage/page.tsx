"use client";
import React, { useState } from 'react';
import { 
  Search, Edit3, MoreVertical, CheckCircle, 
  Trash2, Paperclip, Send, ChevronDown, 
  Filter, Inbox as InboxIcon, Star, Archive, Clock
} from 'lucide-react';

export default function InboxPage() {
  const [activeMail, setActiveMail] = useState(0);
  const [messages] = useState([
    { id: 0, sender: "Xyvie Lyons", subject: "Leave Request - Medical", preview: "I am writing to formally request a medical leave for a scheduled procedure...", time: "09:40 AM", read: false, label: "HR" },
    { id: 1, sender: "Abra Barron", subject: "Payroll Query", preview: "I noticed a discrepancy in my bonus calculation for the Q1 performance...", time: "Yesterday", read: true, label: "Finance" },
    { id: 2, sender: "Thomas Goodman", subject: "Onboarding Documents", preview: "Please find attached the signed contract and ID verification files...", time: "Feb 18", read: true, label: "General" },
  ]);

  return (
    /* SaaS-Elite Neutral Background */
    <div className="p-10 bg-[#F9FAFB] min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inbox</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage employee communications and requests</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100 active:scale-95">
            <Edit3 size={18} /> Compose Message
          </button>
        </div>
      </div>

      <div className="flex border border-gray-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white min-h-[750px]">
        
        {/* --- LEFT SIDEBAR: MESSAGE LIST --- */}
        <div className="w-[380px] border-r border-gray-100 flex flex-col bg-gray-50/30">
          <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md">
            <div className="relative">
              <input type="text" placeholder="Search conversations..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all shadow-sm" />
              <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => setActiveMail(msg.id)}
                className={`p-6 cursor-pointer border-b border-gray-50 transition-all relative group ${activeMail === msg.id ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}
              >
                {activeMail === msg.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />}
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`text-[13px] font-bold ${activeMail === msg.id ? 'text-indigo-600' : 'text-slate-900'}`}>{msg.sender}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{msg.time}</span>
                </div>
                <h4 className={`text-[13px] mb-1.5 tracking-tight line-clamp-1 ${!msg.read ? 'font-black text-slate-900' : 'text-slate-500 font-medium'}`}>{msg.subject}</h4>
                <p className="text-[12px] text-gray-400 font-medium line-clamp-2 leading-relaxed">{msg.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: MESSAGE VIEW --- */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Toolbar */}
          <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-1.5">
                <ToolbarButton icon={<CheckCircle size={18}/>} label="Resolve" color="hover:text-emerald-600 hover:bg-emerald-50" />
                <ToolbarButton icon={<Archive size={18}/>} label="Archive" />
                <ToolbarButton icon={<Clock size={18}/>} label="Snooze" />
                <div className="h-6 w-px bg-gray-100 mx-2" />
                <ToolbarButton icon={<Trash2 size={18}/>} label="Delete" color="hover:text-rose-500 hover:bg-rose-50" />
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-indigo-50 rounded-full text-[10px] font-bold uppercase tracking-widest text-indigo-600 border border-indigo-100">{messages[activeMail].label}</span>
              <button className="p-2.5 text-gray-300 hover:text-indigo-600 transition hover:bg-indigo-50 rounded-xl"><MoreVertical size={20}/></button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-12 flex-1 overflow-y-auto">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-xl shadow-indigo-100 uppercase tracking-tighter">
                {messages[activeMail].sender.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 className="font-bold text-2xl text-slate-900 tracking-tight">{messages[activeMail].sender}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">From: {messages[activeMail].sender.toLowerCase().replace(' ', '.')}@company.com</p>
                   <div className="w-1 h-1 rounded-full bg-gray-300" />
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{messages[activeMail].time}</p>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">{messages[activeMail].subject}</h1>
            
            <div className="text-[15px] text-slate-600 leading-loose space-y-6 font-medium max-w-3xl">
              <p>Hello Team,</p>
              <p>{messages[activeMail].preview} This request is essential for maintaining workflow continuity. I have prepared all necessary documentation to ensure a smooth transition during my absence.</p>
              <p>Please let me know if there are any additional forms I need to sign or if we need to schedule a brief meeting to discuss the handover process before the end of the week.</p>
              <div className="pt-8 mt-12 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Kind regards,</p>
                  <strong className="text-slate-900 font-bold text-lg">{messages[activeMail].sender}</strong>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 px-4 py-2 rounded-lg transition-all">
                  <Star size={14} /> Star Conversation
                </button>
              </div>
            </div>
          </div>

          {/* Modern Action-Oriented Reply Box */}
          <div className="p-8 border-t border-gray-100 bg-gray-50/30">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-200 transition-all">
              <textarea placeholder="Type your response here..." className="w-full bg-transparent outline-none text-[15px] min-h-[140px] resize-none font-medium text-slate-700 placeholder:text-gray-300" />
              <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2">
                  <button className="p-3 text-gray-400 hover:text-indigo-600 transition hover:bg-indigo-50 rounded-2xl"><Paperclip size={20}/></button>
                  <button className="p-3 text-gray-400 hover:text-indigo-600 transition hover:bg-indigo-50 rounded-2xl"><Star size={20}/></button>
                </div>
                <button className="bg-indigo-600 text-white px-10 py-4 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 active:scale-95">
                  Send Message <Send size={16}/>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT: TOOLBAR BUTTON ---
function ToolbarButton({ icon, label, color = "hover:text-indigo-600 hover:bg-indigo-50" }: any) {
  return (
    <button className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-gray-400 transition-all group ${color}`}>
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">
        {label}
      </span>
    </button>
  );
}