const express = require('express');
const app = express();
const router = express.Router();

const UserModel = require('../models/UserModel');
const Department = require('../models/DepartmentModel'); 
const { route } = require('./DepartmentController');


route.post('/user/login', async (req, res) => {
    try {
        const user = await UserModel.findAll({
          where: { 
            username: req.body.username, 
            password: req.body.password
        },
        });
        if(user.length > 0) {
           return res.send({ message: 'success', data: user })
        } else {
          res.statusCode = 401;
         res.send({message: 'Not Found!'})
    
        }
      } catch (e) {
        res.statusCode = 500;
        return res.send({message: e.message})
      }
    });

app.post('/user/insert', async (req, res) => {
    try {
        const result = await UserModel.create(req.body);
        res.status(201).json({ message: 'Data inserted successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error: error.message });
    }
});

route.get('/user/getAll', async (req, res) => {
    try {
        const result = await UserModel.findAll({
            order: [['id', 'ASC']], // เรียงลำดับตาม id
            include: [{ model: Department, as: 'department' }], // รวมข้อมูลจากตาราง Department
        });
        res.status(200).json({ message: 'Data retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
});

app.get('/user/getById/:id', async (req, res) => {
    try {
        const result = await UserModel.findByPk(req.params.id, {
            include: [{ model: Department, as: 'department' }], // รวมข้อมูลจากตาราง Department
        });
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Data retrieved successfully', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving data', error: error.message });
    }
});

app.put('/user/update/:id', async (req, res) => {
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
});

app.delete('/user/delete/:id', async (req, res) => {
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
});
module.exports = app