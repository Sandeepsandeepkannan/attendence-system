import React from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';

const LeaveCalendar = () => {
  const dates = [
    { day: '10', label: 'Wed' },
    { day: '11', label: 'Thu' },
    { day: '12', label: 'Fri' },
    { day: '13', label: 'Sat' },
    { day: '14', label: 'Sun' },
    { day: '15', label: 'Mon' },
    { day: '16', label: 'Tue' },
  ];

  const teamMembers = [
    { name: "Robert Fox", dept: "Human Resources", avatar: "RF", leave: { type: 'Paid Leave', day: 1, note: "Note: During this time, I need to attend to an urgent family matter." } },
    { name: "Ralph Edwards", dept: "Maintenance", avatar: "RE", leave: { type: 'Sick Leave', day: 3, note: "Note:" } },
    { name: "Jane Cooper", dept: "HSEQ", avatar: "JC", leave: { type: 'Casual Leaves', day: 5, note: "Note:" } },
    { name: "Leslie Alexander", dept: "IT", avatar: "LA", leave: { type: 'Sick Leave', day: 2, note: "Note:" } },
    { name: "Esther Howard", dept: "Manning", avatar: "EH", leave: { type: 'Paid Leave', day: 0, note: "Note:" } },
    { name: "Guy Hawkins", dept: "Engineering", avatar: "GH", leave: { type: 'Casual Leaves', day: 3, note: "Note:" } },
    { name: "Bessie Cooper", dept: "Maintenance", avatar: "BC", leave: { type: 'Sick Leave', day: 0, note: "Note:" } },
    { name: "Kathryn Murphy", dept: "Operations", avatar: "KM", leave: { type: 'Sick Leave', day: 4, note: "Note:" } },
    { name: "Emergency User", dept: "Dev", avatar: "EU", leave: { type: 'Emergency Leave', day: 6, note: "Note: Urgent family matter." } },
  ];

  const getLeaveStyles = (type) => {
    switch (type) {
      case 'Paid Leave': return 'bg-[#E7F5E9] border-[#C8E6C9] text-[#2E7D32] icon-palm';
      case 'Sick Leave': return 'bg-[#FEECEB] border-[#FFCDD2] text-[#D32F2F] icon-thermometer';
      case 'Casual Leaves': return 'bg-[#F3E8FF] border-[#E1BEE7] text-[#7B1FA2] icon-umbrella';
      case 'Emergency Leave': return 'bg-[#E3F2FD] border-[#BBDEFB] text-[#1976D2] icon-alert';
      default: return '';
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      {/* Filters Header */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-grow max-w-sm">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white" placeholder="Search employee" />
        </div>
        <button className="px-4 py-2 border bg-white rounded-lg flex items-center gap-2 text-sm">Team <ChevronDown size={16}/></button>
        <button className="px-4 py-2 border bg-white rounded-lg flex items-center gap-2 text-sm">Leave Type <ChevronDown size={16}/></button>
        <button className="px-4 py-2 border bg-white rounded-lg flex items-center gap-2 text-sm">10 Jan 2024 - 16 Jan 2024 <ChevronDown size={16}/></button>
        <button className="ml-auto px-4 py-2 border bg-[#F1F5F9] rounded-lg flex items-center gap-2 text-sm font-medium"><Filter size={16}/> Filters</button>
      </div>

      {/* Calendar Grid Container */}
      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-[280px_repeat(7,1fr)] border-b bg-white">
          <div className="p-6 font-bold text-gray-800">Team member</div>
          {dates.map((d, i) => (
            <div key={i} className="p-4 text-center border-l flex flex-col justify-center">
              <span className="text-xl font-bold">{d.day}</span>
              <span className="text-xs text-gray-400 font-medium">{d.label}</span>
            </div>
          ))}
        </div>

        {/* Table Body */}
        {teamMembers.map((member, idx) => (
          <div key={idx} className="grid grid-cols-[280px_repeat(7,1fr)] border-b last:border-0 min-h-[100px]">
            {/* User Info Column */}
            <div className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                {member.avatar}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{member.name}</span>
                <span className="text-xs text-gray-400">{member.dept}</span>
              </div>
            </div>

            {/* Calendar Cells */}
            {[...Array(7)].map((_, dayIndex) => (
              <div key={dayIndex} className="border-l relative p-1 bg-white">
                {member.leave && member.leave.day === dayIndex && (
                  <div className={`absolute inset-1 rounded-lg border-l-4 p-2 text-[11px] leading-tight shadow-sm ${getLeaveStyles(member.leave.type)}`}>
                    <div className="flex items-center gap-1 font-bold mb-1">
                      <span>{member.leave.type}</span>
                    </div>
                    <p className="opacity-80 line-clamp-2">{member.leave.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveCalendar;