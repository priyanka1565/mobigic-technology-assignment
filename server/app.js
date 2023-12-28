const express = require('express');
const connectDataBase = require('./connection/database');
const RegisterModel = require('./models/userModel');
const userController = require('./controllers/userController')
const cors = require('cors');
//require("dotenv").config();
const app = express();
app.use(express.json());
const Port = process.env.PORT || 5000;
app.use(cors());
//Registration user
app.use('/user', userController);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.listen(Port, async () => {
    try {
        await connectDataBase.connectDataBase();
        console.log('Database connected successfully!');
    } catch (error) {
        console.log('Error:', error);
    }
});