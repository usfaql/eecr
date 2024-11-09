const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nationalID: { type: String, required: true, unique: true },
    gender: { type: String },
    phoneNumber: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Client", clientSchema);
