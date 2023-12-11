const mongoose = require("mongoose");

const billChargesSchema = new mongoose.Schema({
  chargeList: String,
  days: Number,
});

const patient_schema = new mongoose.Schema({
  index: Number,
  name: String,
  date: Date,
  address: String,
  weight: Number,
  contactNumber: Number,
  gender: String,
  age: Number,
  referDoctor: String,
  consultantDoctor: String,
  billCharges: [billChargesSchema],
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
