import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../config';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const ReportUser = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const userName = localStorage.getItem('userName'); // ชื่อผู้ใช้ที่ล็อกอิน
  const userId = localStorage.getItem('user_Id'); // ID ผู้ใช้ที่ล็อกอิน (สมมติว่ามีการเก็บ userId ไว้ใน localStorage)
  const [ticketByUser, setTicketByUser] = useState([]); // เก็บข้อมูล Ticket ของผู้ใช้
  const [loading, setLoading] = useState(true); // สถานะการโหลด
  const [error, setError] = useState(null); // สถานะข้อผิดพลาด

  // ดึงข้อมูล Ticket ของผู้ใช้ที่ล็อกอิน
  useEffect(() => {
    
    const fetchTicketsByUser = async () => {
      try {
        const url = `${config.api_path}ticket/user/${userId}`; // สร้าง URL สำหรับ API
        console.log('API URL:', url); // ตรวจสอบ URL
        const res = await axios.get(url); // เรียก API ด้วย URL
        setTicketByUser(res.data.data); // เก็บข้อมูล Ticket ใน state
        console.log('Tickets:', res.data.data); // ตรวจสอบข้อมูลที่ได้จาก API
      } catch (err) {
        setError('Error fetching tickets');
        console.error('Error:', err);
      } finally {
        setLoading(false); // ปิดสถานะการโหลด
      }
    };
    
    if (userId) {
      fetchTicketsByUser(); // เรียกฟังก์ชันเมื่อมี userId
    }
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading tickets...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          isOpen={isOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          toggleSidebar={() => setIsOpen(!isOpen)}
          userRole="user"
        />
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          <Header activeTab={activeTab} userName={userName} userRole="user" />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">My Tickets</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">Ticket ID</th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">Title</th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketByUser.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 text-sm text-gray-700">{ticket.id}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{ticket.title}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">{ticket.status}</td>
                      <td className="px-4 py-2 text-sm text-gray-700">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportUser;