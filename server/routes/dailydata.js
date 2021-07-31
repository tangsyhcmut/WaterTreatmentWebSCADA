const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const Data = require("../models/DataSchema");

// @route GET api/data
// @desc Get mqtt
// @access Private
let now = new Date();
function formatted_date() {
  var result = "";
  var d = new Date();
  var e = d.getHours();
  result += d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear()
  return result;
}
var compare = formatted_date(now);
router.get("/", verifyToken, async (req, res) => {
  try {
    const DailyData = await Data.AlarmData.find({ warnTime: { $regex: compare } }); ///{createdAt:new Date.getDay()}
    const sendDailyData= DailyData.reverse()

    res.json({ success: true, sendDailyData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
module.exports = router;
