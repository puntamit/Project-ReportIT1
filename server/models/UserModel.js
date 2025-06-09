const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ปรับ path ให้ตรงกับไฟล์ config ของคุณ
const Department = require('./DepartmentModel'); // นำเข้าโมเดล Department

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // เพิ่มค่าอัตโนมัติ
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true // ตรวจสอบว่าไม่ใช่ค่าว่าง
        }
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true // ตรวจสอบว่าไม่ใช่ค่าว่าง
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true // ตรวจสอบว่าไม่ใช่ค่าว่าง
        }
    },
    role: 
    {
        type: DataTypes.ENUM('admin','it', 'user'), // กำหนดค่าที่เป็นไปได้
        allowNull: false,
        defaultValue: 'user' // ค่าเริ่มต้น
    },
    department_Id: {
        type: DataTypes.INTEGER,
        allowNull: true, // สามารถเป็น null ได้หากผู้ใช้ไม่มีแผนก
        references: {
            model: Department, // เชื่อมโยงกับโมเดล Department
            key: 'id'
        }
    }
}, {
    timestamps: true, // เพิ่ม createdAt และ updatedAt อัตโนมัติ
    tableName: 'users' // ชื่อ table ในฐานข้อมูล
});

// สร้างความสัมพันธ์ระหว่าง User และ Department
User.belongsTo(Department, { foreignKey: 'department_Id', as: 'department' });

// sync table user to database
module.exports = User;