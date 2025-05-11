const express = require('express');
const router = express.Router();
const Department = require('../models/DepartmentModel');

// เพิ่มแผนกใหม่
async function insertDepartment(req, res) {
    try {
        const { name, phone } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name and phone are required',
            });
        }

        const newDepartment = await Department.create({ name, phone });

        res.status(201).json({
            success: true,
            message: 'Department created successfully',
            data: newDepartment,
        });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating department',
            error: error.message,
        });
    }
}

// ดึงข้อมูลแผนกทั้งหมด
async function getAllDepartments(req, res) {
    try {
        const departments = await Department.findAll();
        res.status(200).json({
            success: true,
            data: departments,
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching departments',
            error: error.message,
        });
    }
}

// ดึงข้อมูลแผนกตาม ID
async function getDepartmentById(req, res) {
    try {
        const { id } = req.params;
        const department = await Department.findByPk(id);

        if (!department) {
            return res.status(404).json({
                success: false,
                message: 'Department not found',
            });
        }

        res.status(200).json({
            success: true,
            data: department,
        });
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching department',
            error: error.message,
        });
    }
}

// อัปเดตข้อมูลแผนก
async function updateDepartment(req, res) {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;

        const [updated] = await Department.update({ name, phone }, { where: { id } });

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Department not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Department updated successfully',
        });
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating department',
            error: error.message,
        });
    }
}

// ลบแผนก
async function deleteDepartment(req, res) {
    try {
        const { id } = req.params;

        const deleted = await Department.destroy({ where: { id } });

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Department not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Department deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting department',
            error: error.message,
        });
    }
}

// ส่งออกฟังก์ชันทั้งหมด
module.exports = {
    insertDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};