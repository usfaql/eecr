const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nationalID: { type: String, required: true, unique: true },
    gender: { type: String },
    phoneNumber: { type: String }
});

module.exports = mongoose.model("Client", clientSchema);
