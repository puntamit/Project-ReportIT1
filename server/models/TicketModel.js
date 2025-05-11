const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./CategoryModel');
const User = require('./UserModel');

const Ticket = sequelize.define('Ticket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('เปิด', 'กำลังดำเนินการ', 'ปิด'),
        allowNull: false,
        defaultValue: 'เปิด',
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Category,
            key: 'id',
        },
        allowNull: false,
    },
    employee_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: false,
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: true,
    },
    status_changed_by: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
        allowNull: true,
        comment: 'User ID of the person who last changed the status',
    },
}, {
    tableName: 'tickets', // ชื่อ table ในฐานข้อมูล
    timestamps: true, // เพิ่ม createdAt และ updatedAt อัตโนมัติ
});

module.exports = Ticket;