const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    items: [
        {
            name: { type: String, required: true },
            cost: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    date: { type: String },
    isPaid: { type: Boolean, default: false } 
});

module.exports = mongoose.model("Invoice", invoiceSchema);