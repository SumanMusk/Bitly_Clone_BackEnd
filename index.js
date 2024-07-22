require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/route.js");
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Helo World!");
});

app.use("/", router);

mongoose.connect("mongodb+srv://suman:suman12345@firstcluster.iab7oe7.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster")
.then(() => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
        console.log("Server Running!!");
    });
})
.catch((err) => {
    console.log(err);
})