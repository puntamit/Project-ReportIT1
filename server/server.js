const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const sequelize = require('./config/database');

app.get('/testConnect', (req, res) => {
    try {
        sequelize.authenticate()
        res.status(200).json({ message: 'Database connection successful' });
    } catch (error) {
    res.status(500).json({ message: 'Error connecting to the database', error: error.message });
    }

})

app.use('/user',require('./controllers/UserController'));

// Department routes
app.use('/department', require('./controllers/DepartmentController'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});