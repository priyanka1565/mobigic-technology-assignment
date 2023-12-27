const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        const uniqueCode = Math.random().toString(36).substring(2, 8);
        const extname = path.extname(file.originalname);
        cb(null, `${uniqueCode}${extname}`);
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ success: true, message: 'File uploaded successfully' });
});