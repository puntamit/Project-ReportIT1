import { Bell, Search } from 'lucide-react';
import { use } from 'react';

export default function Header({ activeTab, userName }) {


const userName1 = userName


  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <div className="flex items-center space-x-4">
         
          <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            
            <span className="hidden md:inline-block font-medium">คุณ: {userName1}</span>
          </div>
        </div>
      </div>
    </header>
  );
}