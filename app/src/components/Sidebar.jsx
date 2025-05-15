import { 
  Users, ShoppingBag, Box, FileText, MessageSquare, Settings, LogOut, Home, Menu 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ isOpen, activeTab, setActiveTab, toggleSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // ลบ token หรือข้อมูล session ออกจาก localStorage (ถ้ามี)
    localStorage.removeItem('token');
    // ไปหน้า login หรือหน้าแรก
    navigate('/');
  };

  return (
    <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
        <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700">
          <Menu size={24} />
        </button>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admindashboard">
              <div
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <Home size={20} />
                {isOpen && <span className="ml-3">Dashboard</span>}
              </div>
            </Link>
          </li>
          <li>
            <Link to="/users">
              <div
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
              >
                <Users size={20} />
                {isOpen && <span className="ml-3">Users</span>}
              </div>
            </Link>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('products')}
              className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'products' ? 'bg-gray-700' : ''}`}
            >
              <Box size={20} />
              {isOpen && <span className="ml-3">Products</span>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
            >
              <ShoppingBag size={20} />
              {isOpen && <span className="ml-3">Orders</span>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('reports')}
              className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'reports' ? 'bg-gray-700' : ''}`}
            >
              <FileText size={20} />
              {isOpen && <span className="ml-3">Reports</span>}
            </button>
          </li>
          <li>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'messages' ? 'bg-gray-700' : ''}`}
            >
              <MessageSquare size={20} />
              {isOpen && <span className="ml-3">Messages</span>}
            </button>
          </li>
        </ul>
        <div className="pt-4 mt-6 border-t border-gray-700">
          <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700">
            <Settings size={20} />
            {isOpen && <span className="ml-3">Settings</span>}
          </button>
          <button
            className="flex items-center w-full p-2 rounded-md hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut size={20} />
            {isOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
}