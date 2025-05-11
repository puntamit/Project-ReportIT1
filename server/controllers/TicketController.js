const Ticket = require('../models/TicketModel');
const Category = require('../models/CategoryModel');
const User = require('../models/UserModel');

// ดึงข้อมูล Ticket ทั้งหมด
async function getAllTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            include: [
                { model: Category, as: 'category' },
                { model: User, as: 'employee' },
                { model: User, as: 'assignedTo' },
            ],
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
        const { title, description, status, category_id, employee_id, assigned_to } = req.body;

        if (!title || !category_id || !employee_id) {
            return res.status(400).json({
                success: false,
                message: 'Title, category_id, and employee_id are required',
            });
        }

        const newTicket = await Ticket.create({
            title,
            description,
            status: status || 'เปิด',
            category_id,
            employee_id,
            assigned_to,
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
        const { title, description, status, category_id, employee_id, assigned_to } = req.body;

        const [updated] = await Ticket.update(
            { title, description, status, category_id, employee_id, assigned_to },
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

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    updateTicketStatus,
};