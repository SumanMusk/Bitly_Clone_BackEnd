require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/route.js");
const PORT = process.env.PORT;
const URL = process.env.URL;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Helo World!");
});

app.use("/", router);

mongoose.connect(URL)
.then(() => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
        console.log("Server Running!!");
    });
})
.catch((err) => {
    console.log(err);
})