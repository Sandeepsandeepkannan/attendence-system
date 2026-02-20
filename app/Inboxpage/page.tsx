"use client";
import React, { useState } from 'react';
import { 
  Search, Edit3, MoreVertical, CheckCircle, 
  Trash2, Paperclip, Send, ChevronDown, 
  Filter, Inbox as InboxIcon, Star
} from 'lucide-react';

export default function InboxPage() {
  const [activeMail, setActiveMail] = useState(0);
  const [messages] = useState([
    { id: 0, sender: "Xyvie Lyons", subject: "Leave Request - Medical", preview: "I am writing to formally request a medical leave for...", time: "09:40 AM", read: false, label: "HR" },
    { id: 1, sender: "Abra Barron", subject: "Payroll Query", preview: "I noticed a discrepancy in my bonus calculation for...", time: "Yesterday", read: true, label: "Finance" },
    { id: 2, sender: "Thomas Goodman", subject: "Onboarding Documents", preview: "Please find attached the signed contract and ID...", time: "Feb 18", read: true, label: "General" },
  ]);

  return (
    <div className="p-10 bg-white min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inbox</h1>
          <p className="text-slate-500 mt-1 font-medium">Manage employee communications and requests</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#1a1a1a] text-white rounded-xl font-medium hover:opacity-90 transition shadow-lg shadow-black/10">
            <Edit3 size={18} /> New Message
          </button>
        </div>
      </div>

      <div className="flex border border-slate-100 rounded-3xl overflow-hidden shadow-sm bg-white min-h-[700px]">
        
        {/* --- LEFT SIDEBAR: MESSAGE LIST --- */}
        <div className="w-1/3 border-r border-slate-100 flex flex-col">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30">
            <div className="relative">
              <input type="text" placeholder="search messages...." className="w-full pl-4 pr-10 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-1 focus:ring-slate-300" />
              <Search className="absolute right-3 top-3 text-slate-400" size={16} />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                onClick={() => setActiveMail(msg.id)}
                className={`p-6 cursor-pointer border-b border-slate-50 transition-all hover:bg-slate-50 ${activeMail === msg.id ? 'bg-slate-50 border-r-4 border-r-black' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-sm">{msg.sender}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{msg.time}</span>
                </div>
                <h4 className={`text-xs mb-1 ${!msg.read ? 'font-black text-slate-900' : 'text-slate-500 font-medium'}`}>{msg.subject}</h4>
                <p className="text-xs text-slate-400 line-clamp-1">{msg.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: MESSAGE VIEW --- */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
               <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition"><CheckCircle size={20}/></button>
               <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition"><Trash2 size={20}/></button>
               <div className="h-6 w-px bg-slate-100 mx-2" />
               <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{messages[activeMail].label}</span>
            </div>
            <button className="text-slate-300 hover:text-black transition"><MoreVertical size={20}/></button>
          </div>

          {/* Content */}
          <div className="p-8 flex-1 overflow-y-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold ring-4 ring-slate-50">
                {messages[activeMail].sender.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <h2 className="font-bold text-lg">{messages[activeMail].sender}</h2>
                <p className="text-xs text-slate-400">To: hr-department@company.com</p>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-6">{messages[activeMail].subject}</h1>
            <div className="text-sm text-slate-600 leading-relaxed space-y-4">
              <p>Hi HR Team,</p>
              <p>{messages[activeMail].preview} adding more details to the content to show how the typography looks in a full message block.</p>
              <p>Looking forward to your approval.</p>
              <p>Regards,<br/><strong>{messages[activeMail].sender}</strong></p>
            </div>
          </div>

          {/* Reply Box */}
          <div className="p-6 border-t border-slate-100">
            <div className="relative bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <textarea placeholder="Write your reply..." className="w-full bg-transparent outline-none text-sm min-h-[100px] resize-none" />
              <div className="flex justify-between items-center mt-4">
                <button className="p-2 text-slate-400 hover:text-black transition"><Paperclip size={20}/></button>
                <button className="bg-black text-white px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:opacity-90 transition">
                  Send Reply <Send size={14}/>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}