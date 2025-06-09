import React from 'react';

const UserModal = ({ isOpen, onClose, onSave, user, setUser, mode, uniqueDepartments }) => {
  if (!isOpen) return null; // หาก Modal ไม่เปิด ให้คืนค่า null

  const isEditMode = mode === 'edit'; // ตรวจสอบว่าอยู่ในโหมดแก้ไขหรือเพิ่ม

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-96 relative">
        {/* ปุ่มปิด Modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>

        {/* หัวข้อ Modal */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isEditMode ? 'แก้ไขข้อมูลผู้ใช้' : 'เพิ่มสมาชิกใหม่'}
        </h2>

        {/* ฟิลด์กรอกข้อมูล */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="text"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">แผนก</label>
          <select
            className="border px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={user.departmentId}
            onChange={(e) => setUser({ ...user, departmentId: e.target.value })}
          >
            <option value="">เลือกแผนก</option>
            {uniqueDepartments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* ปุ่มใน Modal */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditMode ? 'บันทึกการแก้ไข' : 'บันทึก'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;