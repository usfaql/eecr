const mongoose = require("mongoose");

const repairRequestSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }, // مرجع إلى موديل المركبة
    date: { type: String, required: true }, // التاريخ الافتراضي هو التاريخ الحالي
    time: { type: String, required: true }, // حقل الوقت
    details: { type: [String], required: true }, // مصفوفة تحتوي على التفاصيل
    status: { type: String },
});

module.exports = mongoose.model("RepairRequest", repairRequestSchema);