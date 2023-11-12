const mongoose = require("mongoose");

const patient_schema = new mongoose.Schema({
  name: String,
  date: Date,
  address: String,
  weight: String,
  contactNumber: String,
  gender: String,
  age: String,
});

const admin_schema = new mongoose.Schema(
  {
    email: String,
    name: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const patientSchema = mongoose.model("patient", patient_schema);
const adminSchema = mongoose.model("admin", admin_schema);

module.exports = {
  patientSchema: patientSchema,
  adminSchema: adminSchema,
};
