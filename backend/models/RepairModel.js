const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }, // مرجع إلى موديل المركبة
    date: { type: Date, default: Date.now },
    details: { type: String },
    status: { type: String }
});

module.exports = mongoose.model("RepairRequest", repairRequestSchema);