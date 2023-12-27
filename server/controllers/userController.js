const express = require("express");
const RegisterModel = require("../models/userModel");
const connectDataBase = require("../connection/database");

const router = express.Router();


// Registration user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ username });

        if (user) {
            res.json('Already registered');
        } else {
            await RegisterModel.create({ username, password });
            res.json('Account created');
        }
    } catch (error) {
        res.json(error);
    }
})
module.exports = router;