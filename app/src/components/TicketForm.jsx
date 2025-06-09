import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { ClipboardEdit, User } from 'lucide-react';
import Swal from 'sweetalert2';
export default function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [userDepartment, setUserDepartment] = useState('');
  const [userContact, setUserContact] = useState('');

  const user_id = localStorage.getItem('user_Id')
  useEffect(() => {
    
    fetchCategory();
    fetchUserDepartment();
    
  }, []);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(config.api_path + 'category/getAll');
      setCategory(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchUserDepartment = async () => {
    try {
      const payload = localStorage.getItem('department_Id');
      if (!payload) {
        console.error('No department_Id found in localStorage');
        return;
      }
      const url = config.api_path + 'department/getById/' + payload;
      const response = await axios.get(url);
      setUserDepartment(response.data.data.name);
      setUserContact(response.data.data.phone);
    } catch (error) {
      console.error('Error fetching user department:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: title,
        description: description,
        category_id: selectedCategory,
        user_id: user_id
      }
      const url = config.api_path + 'ticket/create';
       await axios.post(url,payload).then(res => {
        if(res.data.success) {
          Swal.fire({
            title: 'ส่งข้อมูล',
            text: 'ส่งข้อมูลเรียบร้อย',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false  
          })
          setTitle('');
          setDescription('');
          setCategory([]);

        }
       })
    } catch(err) {
      
    }
    
  }

  const userName = localStorage.getItem('userName');

  return (
    <form
      className="bg-white rounded-xl shadow-lg max-w-lg mx-auto p-8 border border-gray-100"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center mb-6">
        <ClipboardEdit className="text-blue-500 mr-2" size={28} />
        <h2 className="text-2xl font-bold text-gray-700">ฟอร์มแจ้งซ่อม</h2>
      </div>
      {success && (
        <div className="alert alert-success mb-4 py-2 text-center rounded">
          แจ้งซ่อมสำเร็จ!
        </div>
      )}
      <div className="mb-5">
        <label className="block mb-1 text-gray-700 font-medium">หัวข้อการแจ้ง</label>
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="เช่น คอมพิวเตอร์เสีย"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-1 text-gray-700 font-medium">รายละเอียด</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="อธิบายปัญหาโดยละเอียด"
        />
      </div>
      <div className="mb-8">
        <label className="block mb-1 text-gray-700 font-medium">หมวดหมู่</label>
        <div className="relative">
          <select
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              เลือกหมวดหมู่
            </option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-8">
        <label className="block mb-1 text-gray-700 font-medium">ข้อมูลผู้แจ้ง</label>
        <div className="space-y-4">
          {/* ชื่อผู้แจ้ง */}
          <div className="relative">
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              readOnly
              type="text"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              value={userName}
              placeholder="ชื่อผู้แจ้ง"
            />
          </div>

          {/* แผนก และ เบอร์ติดต่อกลับ */}
          <div className="flex space-x-4">
            {/* แผนก */}
            <div className="relative flex-1">
              <input
                readOnly
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                value={userDepartment}
                placeholder="แผนก"
              />
            </div>

            {/* เบอร์ติดต่อกลับ */}
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 pl-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                value={userContact}
                onChange={(e) => setUserContact(e.target.value)}
                placeholder="เบอร์ติดต่อกลับ"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600 transition-all duration-300 ${
          loading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'กำลังส่ง...' : 'แจ้งซ่อม'}
      </button>
    </form>
  );
}