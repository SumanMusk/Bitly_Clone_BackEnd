require("dotenv").config();

const urlDb = require("../dbconnect.js");
const shortId = require("shortid");
const PORT = process.env.PORT;

const getUser = (req, res) => {
    res.send("all users");
}

const handleURL = async (req, res) => {
    const { url } = req.body;
    try {
        const data = await urlDb.findOne({url: url});
        res.json({url: `http://localhost/${PORT}/${data.shortID}`});
    } catch(error) {
        const newId = shortId();
        urlDb.create({
            url: url,
            shortID: newId,
            history: []
        });
        res.json({url: `http://localhost/${PORT}/${newId}`});
    }
}

const redUrl = async (req, res) => {
    const id = req.params.id;
    const data = await urlDb.findOne({shortID: id});
    if(!data) 
        res.send("Not a Vaild URL");
    const updateId = await urlDb.findOneAndUpdate({shortID: id}, 
        {
            $push: {
                history: { timestamp: Date.now() }
            }
        }
    );
    res.redirect(updateId.url);
}

async function detailsFunc(req, res) {
    const id = req.params.id;
    try {
        const data = await urlDb.findOne({shortID: id});
        res.status(200).send(`${id} has been visited of: ${data.history.length}`);
    } catch(err) {
        res.status(400).send(`"${id}" is not a vaild ID`);
    }
}

module.exports = {
    getUser,
    handleURL,
    redUrl,
    detailsFunc,
}