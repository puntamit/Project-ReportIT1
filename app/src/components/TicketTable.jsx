import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

const TicketTable = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุมการเปิด/ปิด Modal
  const [selectedTicket, setSelectedTicket] = useState(null); // เก็บข้อมูล Ticket ที่เลือก
  const [users, setUsers] = useState([]); // เก็บข้อมูลผู้ใช้
  const [userId, setUserId] = useState(null); // เก็บ userId ของผู้ใช้ที่ล็อกอิน
  const [ticketByUser, setTicketByUser] = useState([]); // เก็บข้อมูล Ticket ของผู้ใช้ที่ล็อกอิน

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get(`${config.api_path}ticket/getAll`);
        setTickets(res.data.data);
        setFilteredTickets(res.data.data);
      } catch {
        setError('Error fetching tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${config.api_path}user/getAll`);

        console.log('Users:', res.data.data); // ตรวจสอบข้อมูลผู้ใช้
        setUsers(res.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(
        (ticket) =>
          (ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.id.toString().includes(searchTerm)) &&
          (statusFilter === '' || ticket.status === statusFilter)
      )
    );
  }, [searchTerm, statusFilter, tickets]);

  useEffect(() => {
    const fetchTicketsByUser = async () => {
      try {
        const url = `${config.api_path}tickets/userTicket/${userId}`; // เปลี่ยน URL ให้ตรงกับ Route ใหม่
        const res = await axios.get(url);
        setTicketByUser(res.data.data); // เก็บข้อมูล Ticket ใน state
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    if (userId) {
      fetchTicketsByUser();
    }
  }, [userId]);

  const updateTicketStatus = async (id, status) => {
    try {
      await axios.put(`${config.api_path}ticket/updateStatus/${id}`, { status });
      setTickets((prev) =>
        prev.map((ticket) => (ticket.id === id ? { ...ticket, status } : ticket))
      );
    } catch {
      alert('Error updating ticket status');
    }
  };

  const getStatusClass = (status) => {
    const classes = {
      เปิด: 'bg-yellow-100 text-yellow-600',
      กำลังดำเนินการ: 'bg-blue-100 text-blue-600',
      ปิดงาน: 'bg-green-100 text-green-600',
      ยกเลิก: 'bg-red-100 text-red-600',
    };
    return classes[status] || '';
  };

  const handleViewTicket = (ticket) => {
    console.log('Ticket passed to handleViewTicket:', ticket);
    setSelectedTicket(ticket); // ตั้งค่า selectedTicket
    setIsModalOpen(true); // เปิด Modal
  };

  const closeModal = () => {
    setSelectedTicket(null); // ล้างข้อมูล Ticket ที่เลือก
    setIsModalOpen(false); // ปิด Modal
  };

  const getUserNameById = (userId) => {
    if (!users || users.length === 0) {
      console.error('Users data is empty or not loaded');
      return 'N/A';
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
      console.error(`User not found for ID: ${userId}`);
      return 'N/A';
    }
    console.log('Found User:', user);
    return user.name;
  };

  const getUserDepartmentById = (userId) => {
    if (!users || users.length === 0) {
      console.error('Users data is empty or not loaded');
      return 'N/A';
    }
    const user = users.find((u) => u.id === userId);
    if (!user) {
      console.error(`User not found for ID: ${userId}`);
      return 'N/A';
    }
    console.log('Found User Department:', user.department);
    return user.department || 'No department';
  };

  if (loading) return <p className="text-center text-gray-500">Loading tickets...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  console.log('Filtered Tickets:', filteredTickets);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h4 className="text-lg font-semibold">Ticket List</h4>
      </div>
      <div className="p-4 flex gap-4">
        <input
          type="text"
          placeholder="ค้นหา"
          className="border px-4 py-2 rounded w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border px-4 py-2 rounded w-1/3"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">ทุกสถานะ</option>
          <option value="เปิด">เปิด</option>
          <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
          <option value="ปิดงาน">ปิดงาน</option>
          <option value="ยกเลิก">ยกเลิก</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {['Ticket ID', 'View', 'Title', 'Status', 'Created At', 'Action'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      console.log('Ticket in View Button:', ticket);
                      handleViewTicket(ticket);
                    }}
                  >
                    View
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ticket.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <select
                    className="border px-2 py-1 rounded"
                    value={ticket.status}
                    onChange={(e) => updateTicketStatus(ticket.id, e.target.value)}
                  >
                    {['เปิด', 'กำลังดำเนินการ', 'ปิดงาน', 'ยกเลิก'].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal สำหรับแสดงข้อมูล Ticket */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
            <p>
              <strong>Ticket ID:</strong> {selectedTicket.id}
            </p>
            <p>
              <strong>หัวข้อการแจ้ง:</strong> {selectedTicket.title}
            </p>
            <p>
              <strong>สถานะ:</strong> {selectedTicket.status}
            </p>
            <p>
              <strong>เวลาที่แจ้ง:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>ผู้แจ้ง:</strong> {selectedTicket.user?.name || 'N/A'}
            </p>
            <p>
              <strong>แผนก:</strong> {selectedTicket.department?.name || 'N/A'}
            </p>
            <p>
              <strong>รายละเอียด:</strong> {selectedTicket.description || 'No description provided'}
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketTable;