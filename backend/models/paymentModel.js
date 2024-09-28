const mongoose = require("mongoose");

const paymentModel = new mongoose.Schema({
    type: { type: String, required: true }, // نوع المدفوعات (إيجار، كهرباء، ماء، أدوات)
    amount: { type: Number, required: true }, // المبلغ المدفوع
    paymentDate: { type: Date, default: Date.now }, // تاريخ الدفع
    dueDate: { type: Date, required: true }, // تاريخ الاستحقاق
});

module.exports = mongoose.model("Payments", paymentModel);