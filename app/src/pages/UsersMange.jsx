import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import config from '../config';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal'; // นำเข้า UserModal
import { UserPlus } from 'lucide-react';

export default function UsersMange() {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]); // เก็บข้อมูลแผนกทั้งหมด
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [isModalOpen, setIsModalOpen] = useState(false); // สำหรับควบคุม Modal
  const [modalMode, setModalMode] = useState('add'); // โหมด Modal: 'add' หรือ 'edit'
  const [currentUser, setCurrentUser] = useState({ name: '', username: '', password: '', department_Id: '' }); // แก้ไข password ให้เป็นสตริงว่าง

  const userName = localStorage.getItem('userName');

  // ดึงข้อมูลผู้ใช้
  const fetchUsers = async () => {
    try {
      const res = await axios.get(config.api_path + 'user/getAll');
      setUsers(res.data.data);
    } catch (err) {
      alert('Error fetching users');
    }
  };

  // ดึงข้อมูลแผนก
  const fetchDepartments = async () => {
    try {
      const res = await axios.get(config.api_path + 'department/getAll');
      setDepartments(res.data.data); // เก็บข้อมูลแผนกใน state
    } catch (err) {
      alert('Error fetching departments');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchDepartments(); // เรียกใช้ฟังก์ชันดึงข้อมูลแผนก
  
  }, []);

  // คำนวณจำนวนสมาชิกทั้งหมด
  const totalUsers = useMemo(() => users.length, [users]);
  localStorage.setItem('totalUsers',totalUsers)
  const handleAddUser = () => {
    setModalMode('add'); // ตั้งโหมดเป็น 'add'
    setCurrentUser({ name: '', username: '', department_Id: '' }); // รีเซ็ตข้อมูล
    setIsModalOpen(true); // เปิด Modal
  };

  const handleEditUser = async (user) => {
    try {
      // ดึงข้อมูลแผนกของผู้ใช้จาก API
      const res = await axios.get(config.api_path + `department/getById/${user.department_Id}`);
      const department = res.data.data;

      // ตั้งค่า currentUser พร้อมข้อมูลแผนกปัจจุบัน
      setCurrentUser({
        ...user,
        departmentId: department.id, // ตั้งค่า departmentId
      });

      setModalMode('edit'); // ตั้งโหมดเป็น 'edit'
      setIsModalOpen(true); // เปิด Modal
    } catch (err) {
      alert('Error fetching department data');
    }
  };

  const handleSaveUser = async () => {
    try {
      if (modalMode === 'add') {
        await axios.post(config.api_path + 'user/insert', currentUser); // เพิ่มผู้ใช้ใหม่
      } else if (modalMode === 'edit') {
        await axios.put(config.api_path + `user/update/${currentUser.id}`, currentUser); // แก้ไขผู้ใช้
      }
      setIsModalOpen(false); // ปิด Modal
      fetchUsers(); // โหลดข้อมูลใหม่
    } catch (err) {
      alert('Error saving user');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // ปิด Modal
    setCurrentUser({ name: '', username: '', departmentId: '' }); // รีเซ็ตข้อมูล
  };

  const filteredUsers = users.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.username.toLowerCase().includes(search.toLowerCase())) &&
    (!filterDept || String(u.departmentId) === filterDept)
  );

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
        <Header activeTab={activeTab} userRole="admin" userName={userName} />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">จัดการผู้ใช้</h2>
          <p className="text-gray-600 mb-4">จำนวนสมาชิกทั้งหมด: {totalUsers}</p>
          <div className="flex gap-4 mb-4">
            <input
              className="border px-3 py-2 rounded"
              placeholder="ค้นหาชื่อหรือ username"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border px-3 py-2 rounded"
              value={filterDept}
              onChange={e => setFilterDept(e.target.value)}
            >
              <option value="">ทุกแผนก</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end mr-2 mb-2">
            <button
              onClick={handleAddUser}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
            >
              <UserPlus size={18} />
              เพิ่มผู้ใช้
            </button>
          </div>
          <UserTable
            users={filteredUsers}
            onEdit={handleEditUser}
            onDelete={id => console.log(`Delete user with ID: ${id}`)}
          />
        </div>
      </div>

      {/* ใช้ UserModal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
        user={currentUser}
        setUser={setCurrentUser}
        mode={modalMode}
        uniqueDepartments={departments} // ส่งข้อมูลแผนกทั้งหมด
      />
    </div>
  );
}