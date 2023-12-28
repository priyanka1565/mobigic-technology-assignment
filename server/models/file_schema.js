
const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema(
    {
        file_path: String,
        unique_id: Number,
        six_digit_code: String,
    }, {
    versionKey: false,
    timestamps: true,
}
)
const RegisterModel = mongoose.model("file_storage", RegisterSchema);
module.exports = RegisterModel;