const express = require("express");
const RegisterModel = require("../models/userModel");
const connectDataBase = require("../connection/database");
const router = express.Router();
const path = require("path")
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const file_storage = require("../models/file_schema")
// require("dotenv").config()

// Configure Cloudinary
cloudinary.config({
    cloud_name: "dfjdtufsq",
    api_key: "184261749619723",
    api_secret: "l8c-mimvz5yYBcOOoKtUKUU0WMY",
});

// Registration user
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ username });

        if (user) {
            res.json({ data: [], status: true, message: "User Already exist" });
        } else {
            await RegisterModel.create({ username, password });
            res.json({ data: [], status: true, message: "User created" });
        }
    } catch (error) {
        res.json(error);
    }
})

//Login User
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ username });

        if (user) {
            res.json({ data: [], status: true, message: "User Login Sucessfully" });
        } else {
            res.json({ data: [], status: true, message: "unable to login" });
        }
    } catch (error) {
        res.json(error);
    }
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dest = 'uploads/tmp'
        fs.access(dest, function (error) {
            if (error) {
                return fs.mkdir(dest, (error) => cb(error, dest));
            } else {
                return cb(null, dest);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileSize = parseInt(req.headers["content-length"])
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            return cb(null, true);
        } else {
            return fileSize > 5242880 ? cb(new Error('File size more than 5 MB')) : cb(new Error('Only .png, .jpg and .jpeg file type allowed!'));
        }
    }
});

router.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
        const file_path = req?.file.destination + "/" + req?.file?.filename;
        if (file_path) {
            const result = await cloudinary.uploader.upload(file_path);
            const randomNumber = Math.floor(Math.random() * 1000);
            if (result) {
                let obj = {
                    file_path: result?.secure_url,
                    unique_id: randomNumber,
                }
                const store_data = await file_storage.create(obj);
            }
            fs.unlinkSync(file_path);
        }
        return res.json({ data: [], message: "file uploaded successfully" })
    }
    catch (err) {
        return res.json({ data: [], message: err })
    }
});

router.post('/file-list', async (req, res) => {
    try {
        const list = await file_storage.find().lean().exec();
        if (list) {
            return res.json({ status: 200, message: "file list get successfully", data: list })
        }
    } catch (error) {
        res.json(error);
    }
})


module.exports = router;