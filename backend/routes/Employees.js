const express = require("express");

const {addEmployee, getAllEmployee, getEmployeeByNationalID, updateEmployeeData} = require("../controllers/Employees");

const orderRouter = express.Router();

orderRouter.post("/add", addEmployee);
orderRouter.get("/", getAllEmployee);
orderRouter.get("/:nationalID", getEmployeeByNationalID);
orderRouter.put("/:id", updateEmployeeData);

module.exports = orderRouter;