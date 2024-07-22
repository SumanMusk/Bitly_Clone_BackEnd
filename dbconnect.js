const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    shortID: {
        type: String,
        unique: true
    },
    history: {
        type: [{ timestamp: { type: Number } }]
    }
});

const urlDb = mongoose.model("URL", urlSchema);

module.exports = urlDb;