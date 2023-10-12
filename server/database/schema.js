const mongoose = require('mongoose');

const patient_schema = new mongoose.Schema({
  name: String,
  date: Date,
  address: String,
  weight: String,
  contactNumber: String,
});

const patientSchema = mongoose.model('patient', patient_schema);

module.exports = {
  patientSchema: patientSchema,
};
