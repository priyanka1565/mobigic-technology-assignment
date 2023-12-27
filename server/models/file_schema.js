
const mongoose = require('mongoose');

const RegisterSchema = new mongoose.Schema(
    {
        file_path: String,
        unique_id: Number,
    }, {
    versionKey: false,
    timestamps: true,
}
)
const RegisterModel = mongoose.model("file_storage", RegisterSchema);
module.exports = RegisterModel;