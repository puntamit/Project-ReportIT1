const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ปรับ path ให้ตรงกับไฟล์ config ของคุณ

const Department = sequelize.define('department', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    }
}

);

Department.sync({alter: true}) // sync table department to database

module.exports = Department;