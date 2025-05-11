const Category = require('../models/CategoryModel');

// ดึงข้อมูลประเภททั้งหมด
async function getAllCategories(req, res) {
    try {
        const categories = await Category.findAll();
        res.status(200).json({
            success: true,
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message,
        });
    }
}

// เพิ่มประเภทใหม่
async function insertCategory(req, res) {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Name is required',
            });
        }

        const newCategory = await Category.create({ name, description });
        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: newCategory,
        });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating category',
            error: error.message,
        });
    }
}

module.exports = {
    getAllCategories,
    insertCategory,
};