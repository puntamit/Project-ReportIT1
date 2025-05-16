import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { ClipboardEdit, User } from 'lucide-react';

export default function TicketForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await axios.post(config.api_path + 'ticket/create', {
        title,
        description,
        employee_id: employeeId,
      });
      setTitle('');
      setDescription('');
      setEmployeeId('');
      setSuccess(true);
      if (onSuccess) onSuccess();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการแจ้งซ่อม');
    }
    setLoading(false);
  };

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
          onChange={e => setTitle(e.target.value)}
          required
          placeholder="เช่น คอมพิวเตอร์เสีย"
        />
      </div>
      <div className="mb-5">
        <label className="block mb-1 text-gray-700 font-medium">รายละเอียด</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={4}
          placeholder="อธิบายปัญหาโดยละเอียด"
        />
      </div>
      <div className="mb-8">
        <label className="block mb-1 text-gray-700 font-medium">รหัสผู้แจ้ง</label>
        <div className="relative">
          <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-gray-50 text-black px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
            value={employeeId}
            onChange={e => setEmployeeId(e.target.value)}
            required
            placeholder="กรอกรหัสพนักงาน"
          />
        </div>
      </div>
      <button
        type="submit"
        className={`btn btn-primary w-full text-white ${loading ? "loading" : ""}`}
        disabled={loading}
      >
        {loading ? 'กำลังส่ง...' : 'แจ้งซ่อม'}
      </button>
    </form>
  );
}