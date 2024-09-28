const express = require("express");

const {addObligation, addPayment} = require("../controllers/Money");

const paymentRouter = express.Router();

paymentRouter.post('/obligations', addObligation);
paymentRouter.post('/payments', addPayment);

module.exports = paymentRouter;