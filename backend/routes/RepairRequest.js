const express = require("express");

const {createNewOrder, 
    getDataVehicleByVIN,
    getAllVehicle,
    getAllClients,
    getClientByNationalID,
    getClientByID,
    createInvoice,
    getInvoiceByVehicleIdObject,
    deleteItemInOneInvoice,
    updatePaymentStatus,
    addItemToInvoice,
    createNewOrderAlreadyCar
} = require("../controllers/RepairRequest");

const orderRouter = express.Router();

orderRouter.post("/create-order", createNewOrder);
orderRouter.post("/add-order", createNewOrderAlreadyCar);
orderRouter.get("/vehicle/:vin", getDataVehicleByVIN);
orderRouter.get("/vehicles", getAllVehicle);
orderRouter.post("/vehicle/invoice", createInvoice);
orderRouter.get("/vehicle/invoice/:vehicleId", getInvoiceByVehicleIdObject);
orderRouter.delete("/vehicle/invoice/:invoiceId/:itemId", deleteItemInOneInvoice);
orderRouter.post("/vehicle/invoice/:invoiceId", updatePaymentStatus);
orderRouter.post('/invoices/:invoiceId/items', addItemToInvoice);
orderRouter.get('/clients', getAllClients);
orderRouter.get('/clients/:nationalID', getClientByNationalID);
orderRouter.get('/client/:id', getClientByID);

module.exports = orderRouter;