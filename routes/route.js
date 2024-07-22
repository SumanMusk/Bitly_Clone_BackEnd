const express = require("express");
const router = express.Router();
const { getUser, handleURL, redUrl, detailsFunc } = require("../controllers/controller.js");

router.get("/user", getUser);
router.post("/newurl", handleURL);
router.get("/:id", redUrl);
router.get("/details/:id", detailsFunc);

module.exports = router;