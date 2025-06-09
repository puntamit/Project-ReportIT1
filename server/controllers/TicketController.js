const Ticket = require('../models/TicketModel');
const Category = require('../models/CategoryModel');
const User = require('../models/UserModel');
const Department = require('../models/DepartmentModel'); // นำเข้าโมเดล Department

// ดึงข้อมูล Ticket ทั้งหมด
async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            order: [['id', 'DESC']]
        });
        res.status(200).json({
            success: true,
            data: tickets,
        });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tickets',
            error: error.message,
        });
    }
}

// ดึงข้อมูล Ticket ตาม ID
async function getTicketById(req, res) {
    try {
        const { id } = req.params;
        const ticket = await Ticket.findByPk(id, {
            include: [
                { model: Category, as: 'category' },
                { model: User, as: 'employee' },
                { model: User, as: 'assignedTo' },
            ],
        });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found',
            });
        }

        res.status(200).json({
            success: true,
            data: ticket,
        });
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching ticket',
            error: error.message,
        });
    }
}

// เพิ่ม Ticket ใหม่
async function createTicket(req, res) {
    try {
        const { title, description, status, category_id, user_id, assigned_to } = req.body;

        if (!title || !category_id || !user_id) {
            return res.status(400).json({
                success: false,
                message: 'Title, category_id, and user_id are required',
            });
        }

        const newTicket = await Ticket.create({
            title,
            description,
            status: status || 'เปิด',
            category_id,
            user_id,
            assigned_to
        });

        res.status(201).json({
            success: true,
            message: 'Ticket created successfully',
            data: newTicket,
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating ticket',
            error: error.message,
        });
    }
}

// อัปเดต Ticket
async function updateTicket(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status, category_id, user_id, assigned_to } = req.body;

        const [updated] = await Ticket.update(
            { title, description, status, category_id, user_id, assigned_to },
            { where: { id } }
        );

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket updated successfully',
        });
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating ticket',
            error: error.message,
        });
    }
}

// ลบ Ticket
async function deleteTicket(req, res) {
    try {
        const { id } = req.params;

        const deleted = await Ticket.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Ticket deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting ticket',
            error: error.message,
        });
    }
}

// อัปเดตสถานะ Ticket
async function updateTicketStatus(req, res) {
    try {
        const { id } = req.params;
        const { status, user_id } = req.body;

        const ticket = await Ticket.findByPk(id);
        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket not found',
            });
        }

        await Ticket.update(
            { status, status_changed_by: user_id },
            { where: { id } }
        );

        res.status(200).json({
            success: true,
            message: 'Ticket status updated successfully',
        });
    } catch (error) {
        console.error('Error updating ticket status:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating ticket status',
            error: error.message,
        });
    }
}

// ดึงข้อมูล Ticket ตาม user_id
async function getTicketsByUserId(req, res) {
    try {
        const { user_id } = req.params; // ดึง user_id จาก URL

        const tickets = await Ticket.findAll({
            where: { user_id }, // ค้นหา Ticket ที่ตรงกับ user_id

            order: [['createdAt', 'DESC']], // เรียงลำดับตามวันที่สร้าง (ใหม่ -> เก่า)
            
        });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tickets found for this user',
            });
        }

        res.status(200).json({
            success: true,
            data: tickets,
        });
    } catch (error) {
        console.error('Error fetching tickets by user_id:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tickets by user_id',
            error: error.message,
        });
    }
}

// ดึงข้อมูล Ticket พร้อมชื่อผู้แจ้งและชื่อแผนก
async function getTicketsWithUserAndDepartment(req, res) {
    try {
        const { user_id } = req.params; // ดึง user_id จาก URL

        const tickets = await Ticket.findAll({
            where: { user_id }, // ค้นหา Ticket ที่ตรงกับ user_id
            attributes: ['id', 'title', 'description', 'status', 'createdAt'], // ดึงฟิลด์ที่ต้องการ
            include: [
                {
                    model: User, // ดึงข้อมูลจากตาราง User
                    as: 'user',
                    attributes: ['id', 'name'], // ดึงเฉพาะฟิลด์ id และ name
                },
                {
                    model: Department, // ดึงข้อมูลจากตาราง Department
                    as: 'department',
                    attributes: ['id', 'name'], // ดึงเฉพาะฟิลด์ id และ name
                },
            ],
            order: [['createdAt', 'DESC']], // เรียงลำดับตามวันที่สร้าง (ใหม่ -> เก่า)
        });

        if (!tickets || tickets.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No tickets found for this user',
            });
        }

        res.status(200).json({
            success: true,
            data: tickets, // ส่งคืนข้อมูล Ticket พร้อมชื่อผู้แจ้งและชื่อแผนก
        });
    } catch (error) {
        console.error('Error fetching tickets with user and department:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching tickets with user and department',
            error: error.message,
        });
    }
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    updateTicketStatus,
    getTicketsByUserId,
    getTicketsWithUserAndDepartment, // เพิ่มฟังก์ชันนี้ลงใน exports
};