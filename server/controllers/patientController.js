const patientService = require('../services/patientService');
const db = require('../database/dbConnect');

const getAllPatients = async (req, res) => {
  const allPatients = await patientService.getAllPatients();
  res.send({ status: "OK", data: allPatients });
};

const createNewPatient = async (req, res) => {
  try {
    const { body } = req;
    const savedPatient = await patientService.createNewPatient(body);
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewPatient,
  getAllPatients
};
