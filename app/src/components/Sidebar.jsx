import { 
  
  Users, ShoppingBag, Box, FileText, MessageSquare, Settings, LogOut, Home, Menu , Table, Ticket
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function AdminSidebar({ isOpen, activeTab, setActiveTab, toggleSidebar, handleLogout }) {
  return (
    <>
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
              onClick={() => setActiveTab('users')}
            >
              <Users size={20} />
              {isOpen && <span className="ml-3">Users</span>}
            </div>
          </Link>
        </li>
        

        <Link to={'/tiketMange'}>
        
        <li>
          <button   
            onClick={() => setActiveTab('messages')}
            className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'messages' ? 'bg-gray-700' : ''}`}
          >
            <Ticket size={20} />
            {isOpen && <span className="ml-3">Ticket</span>}
          </button>
        </li>
        </Link>
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
    </>
  );
}

function UserSidebar({ isOpen, activeTab, setActiveTab, toggleSidebar, handleLogout }) {
  return (
    <>
      <ul className="space-y-2">
        <li>
          <Link to="/homeuser">
            <div
              className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}
              onClick={() => setActiveTab('home')}
            >
              <Home size={20} />
              {isOpen && <span className="ml-3">Home</span>}
            </div>
          </Link>
        </li>
        <Link to="/reportUser">
        <li>
          <button 
            onClick={() => setActiveTab('ตารางแจ้งซ่อม')}
            className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
          >
            <Table size={20} />
            {isOpen && <span className="ml-3">My Report</span>}
          </button>
        </li>
        </Link>
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
    </>
  );
}

export default function Sidebar({ isOpen, activeTab, setActiveTab, toggleSidebar, userRole = 'admin' }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('department_Id')
    localStorage.removeItem('user_Id')
    localStorage.removeItem('totalUsers')
    navigate('/');
  };

  return (
    <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-xl font-bold">{userRole === 'admin' ? 'Admin Panel' : 'User Panel'}</h1>}
        <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700">
          <Menu size={24} />
        </button>
      </div>
      <nav className="p-4">
        {userRole === 'admin' ? (
          <AdminSidebar
            isOpen={isOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
        ) : (
          <UserSidebar
            isOpen={isOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            toggleSidebar={toggleSidebar}
            handleLogout={handleLogout}
          />
        )}
      </nav>
    </div>
  );
}