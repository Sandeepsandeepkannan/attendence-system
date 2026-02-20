"use client";
import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Save } from 'lucide-react';

// Mock Data - In reality, fetch this from your DB
const initialEmployees = [
  { id: 1, name: "Arjun Mehta", dept: "Engineering", status: "Present" },
  { id: 2, name: "Sara Khan", dept: "Design", status: "Absent" },
  { id: 3, name: "Priya Rai", dept: "HR", status: "Present" },
  { id: 4, name: "Rahul Verma", dept: "Marketing", status: "Late" },
];

export default function AttendanceDashboard() {
  const [attendance, setAttendance] = useState(initialEmployees);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const updateStatus = (id: number, newStatus: string) => {
    setAttendance(prev => 
      prev.map(emp => emp.id === id ? { ...emp, status: newStatus } : emp)
    );
  };

  const handleSave = () => {
    console.log("Saving to Database for date:", date, attendance);
    alert("Attendance Data Saved Successfully!");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Office Attendance</h1>
            <p className="text-sm text-gray-500">Manual Entry Dashboard for HR</p>
          </div>
          <div className="flex gap-4 items-center">
            <input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-semibold">Employee Name</th>
              <th className="px-6 py-4 font-semibold">Department</th>
              <th className="px-6 py-4 font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {attendance.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{emp.name}</td>
                <td className="px-6 py-4 text-gray-600">{emp.dept}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <StatusButton 
                      label="Present" 
                      active={emp.status === "Present"} 
                      color="bg-green-100 text-green-700 border-green-200"
                      icon={<CheckCircle size={16}/>}
                      onClick={() => updateStatus(emp.id, "Present")}
                    />
                    <StatusButton 
                      label="Absent" 
                      active={emp.status === "Absent"} 
                      color="bg-red-100 text-red-700 border-red-200"
                      icon={<XCircle size={16}/>}
                      onClick={() => updateStatus(emp.id, "Absent")}
                    />
                    <StatusButton 
                      label="Late" 
                      active={emp.status === "Late"} 
                      color="bg-yellow-100 text-yellow-700 border-yellow-200"
                      icon={<Clock size={16}/>}
                      onClick={() => updateStatus(emp.id, "Late")}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Sub-component for buttons
function StatusButton({ label, active, color, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium transition ${
        active ? color : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"
      }`}
    >
      {icon} {label}
    </button>
  );
}