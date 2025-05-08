const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('report_com', 'postgres', 'root',{
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false, // ปิดการแสดง log ของ SQL queries
})

module.exports = sequelize;
