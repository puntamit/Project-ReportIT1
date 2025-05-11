const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ทดสอบการเชื่อมต่อกับฐานข้อมูล
app.get('/testConnect', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).json({ message: 'Database connection successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error connecting to the database', error: error.message });
    }
});

// เส้นทางสำหรับจัดการผู้ใช้
app.use('/user', require('./routes/userRoutes'));
app.use('/department', require('./routes/departmentRoutes'));
app.use('/category', require('./routes/categoryRoutes'));
app.use('/ticket', require('./routes/ticketRoutes'));
// เริ่มต้นเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});