const express = require('express');
const connectDataBase = require('./connection/database');
const RegisterModel = require('./models/userModel');
const userController = require('./controllers/userController')
const cors = require('cors');
const app = express();
app.use(express.json());


const Port = process.env.PORT || 5000;
app.use(cors());
//Registration user
app.use('/user', userController);

app.listen(Port, async () => {
    try {
        await connectDataBase.connectDataBase();
        console.log('Database connected successfully!');
    } catch (error) {
        console.log('Error:', error);
    }
});
