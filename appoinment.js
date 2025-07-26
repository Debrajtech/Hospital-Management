const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  patientName: String,
  doctorName: String,
  date: Date,
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
