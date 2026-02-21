"use client";
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Eye, Trash2, FileText, X, Upload } from 'lucide-react';

const AnnouncementDashboard = () => {
  // State for managing the list of announcements
  const [announcements, setAnnouncements] = useState([
    {
      title: "Ganesh Chaturthi",
      description: "Wishing you a joyous Ganesh Chaturthi filled with love, prosperity, and happiness!",
      startDate: "10 May, 2024",
      endDate: "12 Aug, 2024",
    }
  ]);

  // State for Modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for Form Inputs
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const newEntry = {
      ...formData,
      // Simple date formatting for display
      startDate: new Date(formData.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      endDate: new Date(formData.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setAnnouncements([newEntry, ...announcements]);
    setIsModalOpen(false);
    setFormData({ title: '', description: '', startDate: '', endDate: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800 relative">
      
      {/* --- TOP SECTION --- */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Banner Card */}
        <div className="flex-grow bg-white rounded-xl border border-gray-200 p-8 flex justify-between items-start shadow-sm">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6 text-black">Ganesh Chaturthi</h1>
            <p className="text-2xl text-gray-400 leading-relaxed mb-10">
              Wishing you a joyous Ganesh Chaturthi filled with love, prosperity, and happiness!
            </p>
            <div className="flex gap-1 mb-8">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              <span className="w-2 h-2 rounded-full bg-gray-200"></span>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all"
            >
              Add Announcement
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-2 bg-white hidden sm:block">
            <div className="w-48 h-48 bg-yellow-50 flex items-center justify-center">
               <img src="/api/placeholder/180/180" alt="Ganesh" className="mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Calendar Sidebar */}
        <div className="w-full lg:w-80 bg-white rounded-xl border border-gray-200 p-4 shadow-sm cursor-pointer hover:border-blue-300 transition-colors">
          <div className="text-sm font-bold mb-4">July 2024</div>
          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span className="text-gray-900">Sat</span><span className="text-red-500">Sun</span>
          </div>
          <div className="grid grid-cols-7 text-center text-sm gap-y-2">
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const isSelected = day === 25;
              const isInRange = day >= 9 && day <= 14;
              return (
                <div key={i} className={`py-1 flex items-center justify-center ${isSelected ? 'bg-blue-600 text-white rounded-full font-bold w-8 h-8 mx-auto' : ''} ${isInRange ? 'bg-blue-50 w-full' : ''}`}>
                  {day}
                </div>
              );
            })}
          </div>
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between text-[11px] text-gray-500 font-medium">
             <span>From- 9 July, 2024</span>
             <span className="text-gray-300">—</span>
             <span>From- 14 July, 2024</span>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold">Announcement List</h2>
          <div className="relative">
            <input type="date" className="border border-gray-200 rounded-md p-2 text-sm outline-none" defaultValue="2024-07-01" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Announcement Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Start Date</th>
                <th className="px-6 py-4">End Date</th>
                <th className="px-6 py-4 text-center">Attachment</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-sm font-semibold">{item.title}</td>
                  <td className="px-6 py-5 text-sm text-gray-400 max-w-xs truncate">{item.description}</td>
                  <td className="px-6 py-5 text-sm text-gray-500">{item.startDate}</td>
                  <td className="px-6 py-5 text-sm text-gray-500">{item.endDate}</td>
                  <td className="px-6 py-5 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 border border-dashed border-red-200 bg-red-50 rounded">
                      <FileText className="w-4 h-4 text-red-500" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-4 text-gray-300">
                      <Eye size={18} className="cursor-pointer hover:text-blue-500" />
                      <Trash2 size={18} className="cursor-pointer hover:text-red-500" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD ANNOUNCEMENT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold">Add New Announcement</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddAnnouncement} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input 
                  required
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black"
                  placeholder="Event name..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black"
                  placeholder="Details..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Start Date</label>
                  <input 
                    type="date" required
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">End Date</label>
                  <input 
                    type="date" required
                    className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:border-black"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button 
                  type="submit"
                  className="flex-grow bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800"
                >
                  Save Announcement
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-gray-200 rounded-lg font-bold hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementDashboard;