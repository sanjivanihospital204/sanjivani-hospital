const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.get("/", adminController.getAllAdmins);

router.post("/login", adminController.adminLogin);

module.exports = router;