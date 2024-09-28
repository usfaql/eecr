const express = require("express");

const {addEmployee, getAllEmployee, getEmployeeByNationalID} = require("../controllers/Employees");

const orderRouter = express.Router();

orderRouter.post("/add", addEmployee);
orderRouter.get("/", getAllEmployee);
orderRouter.get("/:nationalID", getEmployeeByNationalID);

module.exports = orderRouter;