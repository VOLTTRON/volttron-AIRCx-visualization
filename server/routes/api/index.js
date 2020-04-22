const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/users", require("./users"));
router.use("/organizations", require("./organizations"));
router.use("/data", require("./data"));

module.exports = router;
