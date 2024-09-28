const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eecr").then((result) => {
    console.log("DB Ready To Use");
}).catch((err) => {
    console.log(err);
});