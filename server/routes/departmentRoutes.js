const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/DepartmentController');

// เส้นทางสำหรับจัดการแผนก
router.get('/getAll', departmentController.getAllDepartments); // ดึงข้อมูลแผนกทั้งหมด
router.get('/getById/:id', departmentController.getDepartmentById); // ดึงข้อมูลแผนกตาม ID
router.post('/insert', departmentController.insertDepartment); // เพิ่มแผนกใหม่
router.put('/update/:id', departmentController.updateDepartment); // อัปเดตข้อมูลแผนก
router.delete('/delete/:id', departmentController.deleteDepartment); // ลบแผนก

module.exports = router;