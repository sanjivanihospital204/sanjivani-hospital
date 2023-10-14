const express = require("express");
const patientController = require("../controllers/patientController");
const router = express.Router();

router.get("/all", patientController.getAllPatients);

router.post("/create", patientController.createNewPatient);

module.exports = router;