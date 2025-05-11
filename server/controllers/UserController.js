const express = require('express');
const app = express();
const router = express.Router();

const UserModel = require('../models/UserModel');
const Department = require('../models/DepartmentModel');

// เข้าสู่ระบบ
async function login(req, res) {
    try {
        const user = await UserModel.findAll({
            where: {
                username: req.body.username,
                password: req.body.password,
            },
        });
        if (user.length > 0) {
            return res.send({ message: 'success', data: user });
        } else {
            res.status(401).send({ message: 'Not Found!' });
        }
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
}

// เพิ่มผู้ใช้ใหม่
async function insertUser(req, res) {
    try {
        const result = await UserModel.create(req.body);
        res.status(201).json({ message: 'Data inserted successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
}

// ดึงข้อมูลผู้ใช้ทั้งหมด
async function getAllUsers(req, res) {
    try {
        const result = await UserModel.findAll({
            order: [['id', 'ASC']],
            include: [{ model: Department, as: 'department' }],
        });
        res.status(200).json({ message: 'Data retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
}

// ดึงข้อมูลผู้ใช้ตาม ID
async function getUserById(req, res) {
    try {
        const result = await UserModel.findByPk(req.params.id, {
            include: [{ model: Department, as: 'department' }],
        });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Data retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
}

// อัปเดตข้อมูลผู้ใช้
async function updateUser(req, res) {
    try {
        const result = await UserModel.update(req.body, {
            where: { id: req.params.id },
        });
        if (result[0] === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Data updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating data', error: error.message });
    }
}

// ลบผู้ใช้
async function deleteUser(req, res) {
    try {
        const result = await UserModel.destroy({
            where: { id: req.params.id },
        });
        if (result === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Data deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting data', error: error.message });
    }
}

module.exports = {
    login,
    insertUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};