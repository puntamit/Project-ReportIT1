const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/CategoryController');

// เส้นทางสำหรับจัดการประเภท
router.get('/getAll', categoryController.getAllCategories); // ดึงข้อมูลประเภททั้งหมด
router.post('/insert', categoryController.insertCategory); // เพิ่มประเภทใหม่

module.exports = router;