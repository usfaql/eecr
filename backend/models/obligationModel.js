const mongoose = require("mongoose");

const obligationModel = new mongoose.Schema({
    type: { type: String, required: true }, // نوع الالتزام (إيجار، كهرباء، ماء، أدوات)
    amountPerPeriod: { type: Number, required: true }, // المبلغ لكل فترة (شهر أو أسبوع)
    frequency: { type: String, required: true }, // تكرار الدفع (شهرية، أسبوعية)
    dueDate: { type: Date, required: true }, // تاريخ الاستحقاق
    createdAt: { type: Date, default: Date.now }, // تاريخ الإنشاء
});

module.exports = mongoose.model("Obligations", obligationModel);