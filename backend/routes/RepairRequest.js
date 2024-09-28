const express = require("express");

const {createNewOrder, getDataVehicleByVIN} = require("../controllers/RepairRequest");

const orderRouter = express.Router();

orderRouter.post("/create-order", createNewOrder);
orderRouter.get("/vehicle/:vin", getDataVehicleByVIN);
module.exports = orderRouter;