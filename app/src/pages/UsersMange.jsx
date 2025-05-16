import { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { Eye, Trash2, Edit } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserTable from '../components/UserTable';

export default function UsersMange() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  const fetchUsers = async () => {
    try {
      const res = await axios.get(config.api_path + 'user/getAll');
      console.log('API result:', res.data); // ดูข้อมูลที่ได้
      setUsers(res.data.data);
    } catch (err) {
      alert('Error fetching users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(config.api_path + `user/delete/${id}`);
      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSave = async () => {
    try {
      await axios.put(config.api_path + `user/update/${editUser.id}`, editUser);
      setEditUser(null);
      fetchUsers();
    } catch (err) {
      alert('Update failed');
    }
  };

  const filteredUsers = users.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.username.toLowerCase().includes(search.toLowerCase())) &&
    (!filterDept || String(u.departmentId) === filterDept)
  );

  const uniqueDepartments = [...new Set(users.map(u => u.departmentId))];

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
        <Header activeTab={activeTab} userRole="admin"  />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">จัดการผู้ใช้</h2>
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
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <UserTable
            users={filteredUsers}
            editUser={editUser}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSave={handleSave}
            onCancel={() => setEditUser(null)}
            setEditUser={setEditUser}
          />
        </div>
      </div>
    </div>
  );
}