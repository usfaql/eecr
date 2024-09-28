const express = require("express");
const cors = require('cors');
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get("/", (req,res)=>{
    res.send(`Hello From EECR`);
});

app.use("*", (req,res)=> res.status(404).json("No content at this path"))

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})