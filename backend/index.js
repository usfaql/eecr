const express = require("express");
const cors = require('cors');
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const orderRouter = require("./routes/RepairRequest");
const employeeRouter = require("./routes/Employees");
const paymentRouter = require("./routes/Money");
app.use("/veh", orderRouter);
app.use("/employee", employeeRouter);
app.use("/money", paymentRouter);

app.use("*", (req,res)=> res.status(404).json("No content at this path"))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})