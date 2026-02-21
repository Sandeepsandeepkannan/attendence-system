"use client";
import React, { useState } from 'react';
import { 
  Search, Edit3, MoreVertical, CheckCircle, 
  Trash2, Paperclip, Send, XCircle, 
  Calendar, Clock, AlertCircle, Star, Archive
} from 'lucide-react';

export default function InboxPage() {
  const [activeMail, setActiveMail] = useState(0);
  const [messages, setMessages] = useState([
    { 
        id: 0, 
        sender: "Xyvie Lyons", 
        subject: "Leave Request", 
        type: "LEAVE_REQUEST",
        leaveType: "Emergency", // Keywords: Emergency, Planned, Medical
        startDate: "Oct 12, 2024",
        endDate: "Oct 15, 2024",
        preview: "I have a family medical emergency and need to take immediate leave. My tasks are handed over to the team.", 
        time: "09:40 AM", 
        read: false, 
        label: "HR",
        status: "pending" 
    },
    { id: 1, sender: "Abra Barron", subject: "Payroll Query", type: "GENERAL", preview: "I noticed a discrepancy in my bonus calculation for the Q1 performance...", time: "Yesterday", read: true, label: "Finance" },
    { id: 2, sender: "Thomas Goodman", subject: "Onboarding Documents", type: "GENERAL", preview: "Please find attached the signed contract and ID verification files...", time: "Feb 18", read: true, label: "General" },
  ]);

  const currentMsg = messages.find(m => m.id === activeMail);

  return (
    <div className="p-10 bg-[#F9FAFB] min-h-screen font-sans text-slate-900">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Inbox</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage employee communications and requests</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
          <Edit3 size={18} /> Compose Message
        </button>
      </div>

      <div className="flex border border-gray-200/60 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white min-h-[750px]">
        
        {/* --- LEFT SIDEBAR --- */}
        <div className="w-[380px] border-r border-gray-100 flex flex-col bg-gray-50/30">
          <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-md text-sm font-medium">
             <div className="relative">
               <input type="text" placeholder="Search conversations..." className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-sm" />
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
                  <span className="text-[10px] text-gray-400 font-bold uppercase">{msg.time}</span>
                </div>
                <h4 className="text-[13px] mb-1.5 font-black text-slate-900">{msg.subject}</h4>
                <p className="text-[12px] text-gray-400 line-clamp-2">{msg.preview}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE: MESSAGE VIEW --- */}
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Content Area */}
          <div className="p-12 flex-1 overflow-y-auto">
            
            {/* Conditional Rendering: Leave Request vs General Mail */}
            {currentMsg.type === "LEAVE_REQUEST" ? (
              <div className="max-w-3xl">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {currentMsg.sender.charAt(0)}
                    </div>
                    <div>
                        <h2 className="font-bold text-xl">{currentMsg.sender}</h2>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Requesting Absence</span>
                    </div>
                </div>

                {/* The Leave Request "Card" */}
                <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-8 mb-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                currentMsg.leaveType === 'Emergency' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                                {currentMsg.leaveType} Leave
                            </span>
                            <h1 className="text-3xl font-black mt-3 tracking-tighter">Leave Request</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase">Duration</p>
                            <p className="text-sm font-bold text-slate-900">{currentMsg.startDate} — {currentMsg.endDate}</p>
                        </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed font-medium mb-8">
                        "{currentMsg.preview}"
                    </p>

                    {/* Quick Stats/Metadata */}
                    <div className="flex gap-6 border-t border-slate-200 pt-6">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Clock size={16} /> <span className="text-xs font-bold uppercase">4 Days Requested</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <AlertCircle size={16} /> <span className="text-xs font-bold uppercase">Emergency Priority</span>
                        </div>
                    </div>
                </div>

                {/* Admin Action Buttons */}
                <div className="flex gap-4">
                    <button className="flex-1 flex items-center justify-center gap-3 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-sm hover:bg-emerald-700 transition shadow-lg shadow-emerald-100">
                        <CheckCircle size={18} /> Approve Request
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 border-2 border-rose-100 text-rose-600 py-4 rounded-2xl font-bold text-sm hover:bg-rose-50 transition">
                        <XCircle size={18} /> Decline Request
                    </button>
                </div>
              </div>
            ) : (
              // Standard Mail View
              <div>
                <h1 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">{currentMsg.subject}</h1>
                <p className="text-[15px] text-slate-600 leading-loose">{currentMsg.preview}</p>
              </div>
            )}
          </div>

          {/* Reply Box (Always visible at bottom for conversation) */}
          <div className="p-8 border-t border-gray-100 bg-gray-50/30">
            <div className="bg-white rounded-[2rem] p-6 border border-gray-200 shadow-sm">
              <textarea placeholder="Write a reply or explain your decision..." className="w-full bg-transparent outline-none text-[15px] min-h-[100px] resize-none font-medium" />
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button className="p-3 text-gray-400 hover:bg-gray-100 rounded-xl"><Paperclip size={20}/></button>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-indigo-700 transition">
                  Send Reply <Send size={16}/>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}