const express = require("express");
const cors = require('cors');
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

setInterval(() => {
    const memoryUsage = process.memoryUsage();
    console.log(`Memory Usage: 
        RSS: ${memoryUsage.rss / 1024 / 1024} MB
        Heap Total: ${memoryUsage.heapTotal / 1024 / 1024} MB
        Heap Used: ${memoryUsage.heapUsed / 1024 / 1024} MB
        External: ${memoryUsage.external / 1024 / 1024} MB`);
}, 10000); // كل 10 ثوانٍ



const orderRouter = require("./routes/RepairRequest");
const employeeRouter = require("./routes/Employees");
const paymentRouter = require("./routes/Money");
app.use("/", orderRouter);
app.use("/employee", employeeRouter);
app.use("/money", paymentRouter);

app.use("*", (req,res)=> res.status(404).json("No content at this path"))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})