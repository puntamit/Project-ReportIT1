import Swal from 'sweetalert2';

import { Eye, Trash2 } from 'lucide-react';

export default function UserTable({ users, onEdit, onDelete }) {

  const handleDelete = () => {
    try  {
      Swal.fire({
        title: 'ลบบัญชีผู้ใช้งาน',
        text: 'ต้องการจะลบบัญชีผู้ใช้นี้หรือไหม',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
      })
    } catch(err) {

    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <h4 className="text-lg font-semibold">รายชื่อสมาชิก</h4>
        <button className="text-sm bg-white text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg shadow-md">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b">
                Password
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users && users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.password}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {user.department?.name || 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors duration-200"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors duration-200"
                      onClick={handleDelete}
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors duration-200"
                      onClick={() => onEdit(user)}
                      title="Edit"
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}