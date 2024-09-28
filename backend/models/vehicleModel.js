const mongoose = require("mongoose");


const vehicleSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }, // مرجع إلى موديل العميل
    carType: { type: String },
    carModel: { type: String },
    engineNumber: { type: String },
    plateNumber: { type: String },
    fuelType: { type: String },
    color: { type: String },
    year: { type: Number },
    VIN: { type: String, unique: true },
    repairRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RepairRequest' }] // مرجع إلى طلبات الإصلاح
});
module.exports = mongoose.model("Vehicle", vehicleSchema);
