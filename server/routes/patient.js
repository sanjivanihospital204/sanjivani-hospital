const express = require("express");
const patientController = require("../controllers/patientController");
const router = express.Router();

// router.get("/", patientController.getAllProperties);

router.post("/login", patientController.userLogin);

router.post("/", patientController.createNewPatient);

router.post("/updateUser", patientController.updateUserByEmail);

router.post("/verifyOtp", patientController.verifyOtp);

router.post("/verifyToken", patientController.verifyToken);



module.exports = router;