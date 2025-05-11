import { use, useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  Users, ShoppingBag, DollarSign, Activity, 
  Bell, Search, Menu, Settings, LogOut, Home, 
  FileText, Box, MessageSquare, Trash2, Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
// Sample data for charts and tables





const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const pieData = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Food', value: 200 },
  { name: 'Books', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];






export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userData, setUserData] = useState();

useEffect(() => {
  fetchUserData();
  console.log(userData);
}, []);

  const fetchUserData = async () => {
    try {
      await axios.get(config.api_path + 'user/getAll').then(res => {
        setUserData(res.data.data);
      })
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const colorMap = {
      'Completed': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
    };



const countUser = ({userData}) => {
  return userData.length;
}

    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorMap[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-700">
            <Menu size={24} />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'dashboard' ? 'bg-gray-700' : ''}`}
              >
                <Home size={20} />
                {isSidebarOpen && <span className="ml-3">Dashboard</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('users')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'users' ? 'bg-gray-700' : ''}`}
              >
                <Users size={20} />
                {isSidebarOpen && <span className="ml-3">Users</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('products')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'products' ? 'bg-gray-700' : ''}`}
              >
                <Box size={20} />
                {isSidebarOpen && <span className="ml-3">Products</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'orders' ? 'bg-gray-700' : ''}`}
              >
                <ShoppingBag size={20} />
                {isSidebarOpen && <span className="ml-3">Orders</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'reports' ? 'bg-gray-700' : ''}`}
              >
                <FileText size={20} />
                {isSidebarOpen && <span className="ml-3">Reports</span>}
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`flex items-center w-full p-2 rounded-md hover:bg-gray-700 ${activeTab === 'messages' ? 'bg-gray-700' : ''}`}
              >
                <MessageSquare size={20} />
                {isSidebarOpen && <span className="ml-3">Messages</span>}
              </button>
            </li>
          </ul>
          <div className="pt-4 mt-6 border-t border-gray-700">
            <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700">
              <Settings size={20} />
              {isSidebarOpen && <span className="ml-3">Settings</span>}
            </button>
            <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-700">
              <LogOut size={20} />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  AD
                </div>
                <span className="hidden md:inline-block font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'dashboard' && (
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold">2,543</h3>
                    <p className="text-sm text-green-500">+12% from last month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <h3 className="text-2xl font-bold">1,259</h3>
                    <p className="text-sm text-green-500">+5% from last month</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <ShoppingBag size={24} className="text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <h3 className="text-2xl font-bold">$45,290</h3>
                    <p className="text-sm text-red-500">-3% from last month</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <DollarSign size={24} className="text-purple-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                    <h3 className="text-2xl font-bold">3.75%</h3>
                    <p className="text-sm text-green-500">+0.5% from last month</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Activity size={24} className="text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                <h4 className="text-lg font-semibold mb-4">Monthly Sales</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={salesData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sales" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h4 className="text-lg font-semibold mb-4">Sales by Category</h4>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-6 border-b">
                <h4 className="text-lg font-semibold">รายชื่อสมาชิก</h4>
                <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">username</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {userData && userData.map((order) => 

                      <tr  className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap" >{order.password}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.departmentId}</td>
      
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <Eye size={18} />
                            </button>
                            <button className="p-1 text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== 'dashboard' && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page</h3>
              <p className="text-gray-500">This section is under development</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}