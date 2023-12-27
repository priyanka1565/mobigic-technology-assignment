const express = require("express");
const RegisterModel = require("../models/userModel");
const connectDataBase = require("../connection/database");

const router = express.Router();


// Registration user
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ email });

        if (user) {
            res.json('Already registered');
        } else {
            await RegisterModel.create({ name, email, password });
            res.json('Account created');
        }
    } catch (error) {
        res.json(error);
    }
})
module.exports = router;