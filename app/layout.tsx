"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import "./globals.css"; 
import { 
  LayoutDashboard, Users, CalendarCheck, 
  Wallet, Inbox, Settings, HelpCircle,
  ChevronRight
} from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      {/* SaaS-Elite Neutral Background */}
      <body className="bg-[#F9FAFB] font-sans text-[#111827] antialiased">
        <div className="flex min-h-screen">
          
          {/* --- PREMIUM SIDEBAR --- */}
          <aside className="w-72 bg-white border-r border-gray-200/60 p-6 flex flex-col fixed h-screen z-50">
            
            {/* Logo Area: Sophisticated Indigo Styling */}
            <div className="flex items-center gap-3 mb-10 px-3 py-2">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-200">
                O
              </div>
              <span className="text-xl font-bold tracking-tighter text-[#111827]">HR.<span className="text-indigo-600">OS</span></span>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1.5 flex-1">
              <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                Overview
              </p>
              
              <SidebarLink href="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" active={pathname === '/'} />
              <SidebarLink href="/Employeedashboard" icon={<Users size={20}/>} label="Employees" active={pathname === '/Employeedashboard'} />
              <SidebarLink href="/Attendencepage" icon={<CalendarCheck size={20}/>} label="Attendance" active={pathname === '/Attendencepage'} />
              <SidebarLink href="/announcementpage" icon={<Wallet size={20}/>} label="Announcement" active={pathname === '/Announcement'} />
              <SidebarLink href="/Inboxpage" icon={<Inbox size={20}/>} label="Inbox" active={pathname === '/Inboxpage'} />
              <SidebarLink href="/calendar" icon={<Inbox size={20}/>} label="calendar" active={pathname === '/calendar'} />
            </nav>

            {/* User / Support Section */}
            <div className="mt-auto space-y-1">
              <div className="p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100 group cursor-pointer hover:border-indigo-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-black text-white">AD</div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-xs font-bold truncate">Admin User</p>
                    <p className="text-[10px] text-gray-400 font-medium truncate">admin@hros.com</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                </div>
              </div>

              <SidebarLink href="/settings" icon={<Settings size={20}/>} label="Settings" active={pathname === '/settings'} />
              <SidebarLink href="/help" icon={<HelpCircle size={20}/>} label="Help Center" active={pathname === '/help'} />
            </div>
          </aside>

          {/* --- PAGE CONTENT AREA --- */}
          {/* Main area matches the light grey background style */}
          <main className="flex-1 ml-72 min-h-screen bg-[#F9FAFB]">
            {children}
          </main>
          
        </div>
      </body>
    </html>
  );
}

// --- SIDEBAR LINK COMPONENT ---
function SidebarLink({ href, icon, label, active }: { href: string, icon: any, label: string, active: boolean }) {
  return (
    <Link href={href} className="block outline-none">
      <div className={`
        flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
        ${active 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-indigo-600'}
      `}>
        <div className="flex items-center gap-3.5">
          <span className={`${active ? 'text-white' : 'text-gray-400 group-hover:text-indigo-600'} transition-colors`}>
            {icon}
          </span>
          <span className={`text-[13px] font-semibold tracking-tight ${active ? 'text-white' : 'text-gray-600'}`}>
            {label}
          </span>
        </div>
        {active && <div className="w-1.5 h-1.5 rounded-full bg-white/40" />}
      </div>
    </Link>
  );
}