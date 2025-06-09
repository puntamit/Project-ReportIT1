import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';
import TicketChart from '../components/TicketChart'; // นำเข้า Chart Component
import axios from 'axios';
import config from '../config';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [ticketData, setTicketData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [timeRange, setTimeRange] = useState('daily');
  const [totalUsers, setTotalUsers] = useState(0); // เก็บจำนวนผู้ใช้ทั้งหมด
  const [users, setUsers] = useState([]); // เก็บข้อมูลผู้ใช้

  useEffect(() => {
    // ดึง totalUsers จาก localStorage
    const storedTotalUsers = localStorage.getItem('totalUsers');
    if (storedTotalUsers) {
      setTotalUsers(parseInt(storedTotalUsers, 10)); // แปลงเป็นตัวเลข
    }
  }, []);

  useEffect(() => {
    fetchTicketData();
  }, []);

  useEffect(() => {
    processChartData();
  }, [ticketData, timeRange]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${config.api_path}users/getAll`); // ดึงข้อมูลผู้ใช้ทั้งหมด
        setUsers(res.data.data); // เก็บข้อมูลผู้ใช้ใน state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const fetchTicketData = async () => {
    try {
      const res = await axios.get(config.api_path + 'ticket/getAll');
      setTicketData(res.data.data);
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    }
  };

  const processChartData = () => {
    const groupedData = {};
    ticketData.forEach((ticket) => {
      const date = new Date(ticket.createdAt);
      let key;
      if (timeRange === 'daily') {
        key = date.toLocaleDateString();
      } else if (timeRange === 'weekly') {
        const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
        key = week;
      } else if (timeRange === 'monthly') {
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
      }

      if (!groupedData[key]) {
        groupedData[key] = { name: key, new: 0, resolved: 0, pending: 0 };
      }
      if (ticket.status === 'new') {
        groupedData[key].new += 1;
      } else if (ticket.status === 'resolved') {
        groupedData[key].resolved += 1;
      } else if (ticket.status === 'pending') {
        groupedData[key].pending += 1;
      }
    });

    const chartArray = Object.values(groupedData);
    setChartData(chartArray);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
        userRole="admin"
      />
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Header activeTab={activeTab} userRole="admin" userName={localStorage.getItem('userName')} />
        {activeTab === 'dashboard' && (
          <div className="p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Total Users Card */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <h3 className="text-2xl font-bold">{totalUsers}</h3> {/* แสดง totalUsers */}
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users size={24} className="text-blue-600" />
                  </div>
                </div>
              </div>
              {/* Add more Stat Cards here */}
            </div>

            {/* Charts */}
           
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