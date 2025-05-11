const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// เส้นทางสำหรับจัดการผู้ใช้
router.post('/login', userController.login); // เข้าสู่ระบบ
router.post('/insert', userController.insertUser); // เพิ่มผู้ใช้ใหม่
router.get('/getAll', userController.getAllUsers); // ดึงข้อมูลผู้ใช้ทั้งหมด
router.get('/getById/:id', userController.getUserById); // ดึงข้อมูลผู้ใช้ตาม ID
router.put('/update/:id', userController.updateUser); // อัปเดตข้อมูลผู้ใช้
router.delete('/delete/:id', userController.deleteUser); // ลบผู้ใช้

module.exports = router;