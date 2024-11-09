const express = require("express");

const {addObligation, getAllObligations, getObligationById, updateObligationById, deleteObligationById, addPaymentToObligation, addPayment} = require("../controllers/Money");

const paymentRouter = express.Router();

paymentRouter.post('/obligations', addObligation);

// Route to get all obligations
paymentRouter.get('/obligations', getAllObligations);

// Route to get a specific obligation by ID
paymentRouter.get('/obligations/:id', getObligationById);

// Route to update an obligation by ID
paymentRouter.put('/obligations/:id', updateObligationById);

// Route to delete an obligation by ID
paymentRouter.delete('/obligations/:id', deleteObligationById);

paymentRouter.post('/obligations/:id/payments', addPaymentToObligation);

paymentRouter.post('/payments', addPayment);

module.exports = paymentRouter;