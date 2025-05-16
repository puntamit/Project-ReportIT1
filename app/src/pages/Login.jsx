import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import Swal from 'sweetalert2';
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa';


const Login = () => {
const [userName, setUserName] = useState('')
const [password, setPassword] = useState('')

const navigate = useNavigate()

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const payload = {
            username: userName,
            password: password,
        };
        await axios.post(config.api_path + 'user/login', payload).then(res => {
            if (res.data.message === 'success') {
                Swal.fire({
                    title: 'Login',
                    text: 'เข้าสู่ระบบเรียบร้อยแล้ว',
                    icon: 'success',
                    timer: 2000,
                });
                // เพิ่มบรรทัดนี้!
                 localStorage.setItem('userName', res.data.data[0].name);
            
                if (res.data.data[0].role === 'admin') {
                    navigate('/admindashboard');
                } else if (res.data.data[0].role === 'user') {  
                    navigate('/homeuser');
                }
            }
        }).catch(err => {
            const errorMessage = err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'An unexpected error occurred';
            throw new Error(errorMessage);
        });
    } catch (e) {
        Swal.fire({
            title: 'Error!',
            text: e.message || 'An unexpected error occurred',
            icon: 'error',
        });
    }
}
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-1">Sign in to your account</p>
          </div>
          
          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
                >
                  <FaSignInAlt className="mr-2" />
                  Sign in
                </button>
              </div>
            </form>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Contact administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
