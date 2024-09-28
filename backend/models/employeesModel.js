const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema({
    firstName: { type: String, required: true },
    midName: { type: String },
    lastName: { type: String, required: true },
    imageEmployee: { type: String },
    nationalID: { type: String, unique: true, required: true }, // تصحيح هنا
    imageNationalID: { type: String },
    dateOfBirth: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    position: { type: String, required: true },
    SalaryPerWeek: { type: Number, required: true },
    SalaryPerMonth: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Empolyees", employeeModel);