const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketController');

// เส้นทางสำหรับจัดการ Ticket
router.get('/getAll', ticketController.getAllTickets); // ดึงข้อมูล Ticket ทั้งหมด
router.get('/getById/:id', ticketController.getTicketById); // ดึงข้อมูล Ticket ตาม ID
router.post('/create', ticketController.createTicket); // เพิ่ม Ticket ใหม่
router.put('/update/:id', ticketController.updateTicket); // อัปเดต Ticket
router.delete('/delete/:id', ticketController.deleteTicket); // ลบ Ticket
router.put('/updateStatus/:id', ticketController.updateTicketStatus); // อัปเดตสถานะ Ticket
router.get('/user/:user_id', ticketController.getTicketsByUserId);


module.exports = router;