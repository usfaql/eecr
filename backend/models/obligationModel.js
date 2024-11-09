const mongoose = require("mongoose");

const obligationModel = new mongoose.Schema({
    type: { type: String, required: true }, 
    amountPerPeriod: { type: Number, required: true }, 
    frequency: { type: String, required: true }, // مثل: "شهري"، "ربع سنوي"
    periodMonths: { type: Number, required: true }, // عدد الأشهر في الفترة الواحدة
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    payments: [{ amount: Number, paymentDate: Date }] // قائمة الدفع
});

module.exports = mongoose.model("Obligations", obligationModel);