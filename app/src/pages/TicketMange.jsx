import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TicketTable from '../components/TicketTable'; // นำเข้า TicketTable
import config from '../config'; // นำเข้าคอนฟิก

export const TicketMange = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // จัดการสถานะ Sidebar
  const [activeTab, setActiveTab] = useState('tickets'); // กำหนดแท็บปัจจุบัน
  const [users, setUsers] = useState([]); // สถานะสำหรับผู้ใช้

  const userName = localStorage.getItem('userName');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // ฟังก์ชันเปิด/ปิด Sidebar
  };

  // ดึงข้อมูลผู้ใช้เมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${config.api_path}users/getAll`);
        console.log('Users:', res.data.data); // ตรวจสอบข้อมูลผู้ใช้
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const getUserNameById = (userId) => {
    if (!users || users.length === 0) {
      console.error('Users data is empty or not loaded');
      return 'N/A';
    }
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'N/A';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        toggleSidebar={toggleSidebar}
        userRole="admin"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <Header activeTab={activeTab} userRole="admin" userName={userName} />

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">จัดการ Ticket</h2>
          {/* แสดง Ticket Table */}
          <TicketTable apiEndpoint="" />
        </div>
      </div>
    </div>
  );
};
