const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Data = require("../models/DataSchema");

// @route GET api/data
// @desc Get mqtt
// @access Private

router.get("/", verifyToken, async (req, res) => {
  
  try {
    
    const FullData = await Data.TestData.find(); ///{createdAt:new Date.getDay()}
    const sendFullData = FullData.reverse()
    res.json({ success: true, sendFullData});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
