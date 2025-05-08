const express = require('express');
const router = express.Router();
const Department = require('../models/DepartmentModel');

// Add new department
router.post('/add', async (req, res) => {
    try {
        const { name, phone } = req.body;
        
        if (!name || !phone) {
            return res.status(400).json({ 
                success: false,
                message: 'Name and phone are required' 
            });
        }

        const newDepartment = await Department.create({ 
            name, 
            phone 
        });
        
        res.status(201).json({ 
            success: true,
            message: 'Department created successfully', 
            data: newDepartment 
        });
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error creating department', 
            error: error.message 
        });
    }
});

// Get all departments
router.get('/getAll', async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.status(200).json({
            success: true,
            data: departments
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching departments',
            error: error.message
        });
    }
});

module.exports = router;