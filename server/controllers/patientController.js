const patientService = require('../services/patientService');
const db = require('../database/dbConnect');


const createNewPatient = async (req, res) => {
  try {
    const { body } = req;
    const savedPatient = await patientService.createNewPatient(body);
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;
    if (!email) {
      res.status(401).json({ validUser: false, message: 'Invalid email' });
    }
    if (!password) {
      res.status(401).json({ validUser: false, message: 'Invalid password' });
    }
    const user = await patientService.userLogin(body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserByEmail = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await patientService.updateUserByEmail(body);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await patientService.verifyOtp(body);
    if (updatedUser) {
      res.send({ status: 'OK', verify: true, token: updatedUser?.token, user: updatedUser?.user });
    } else {
      res.send({ status: 'OK', verify: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { body } = req;
    const updatedUser = await patientService.verifyToken(body);
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewPatient,
  userLogin,
  updateUserByEmail,
  verifyOtp,
  verifyToken,
};
