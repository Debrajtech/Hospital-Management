
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// CSV file paths
const PATIENTS_CSV = path.join(__dirname, "patients.csv");
const DOCTORS_CSV = path.join(__dirname, "doctors.csv");

// Helper to append to CSV
function appendToCSV(file, data, headers) {
  const exists = fs.existsSync(file);
  const line = headers.map(h => data[h] || "").join(",") + "\n";
  if (!exists) {
    fs.writeFileSync(file, headers.join(",") + "\n" + line);
  } else {
    fs.appendFileSync(file, line);
  }
}

// API routes

// Register patient (write to CSV)
app.post("/register", (req, res) => {
  const patient = req.body;
  const headers = ["name", "age", "gender", "contact"];
  appendToCSV(PATIENTS_CSV, patient, headers);
  res.status(201).send("Patient registered");
});


// Get list of doctors (read from CSV)
app.get("/doctors", (req, res) => {
  if (!fs.existsSync(DOCTORS_CSV)) return res.json([]);
  const data = fs.readFileSync(DOCTORS_CSV, "utf8").trim().split("\n");
  const headers = data[0].split(",");
  const doctors = data.slice(1).map(line => {
    const values = line.split(",");
    const obj = {};
    headers.forEach((h, i) => obj[h] = values[i]);
    return obj;
  });
  res.json(doctors);
});

// Book appointment (write to doctor-specific CSV)
app.post("/appointment", (req, res) => {
  const { doctor, patientName, date, time, reason } = req.body;
  if (!doctor) return res.status(400).send("Doctor required");
  const normalizedDoctor = doctor.trim().replace(/\s+/g, "_").toLowerCase();
  const file = path.join(__dirname, `appointments_${normalizedDoctor}.csv`);
  const headers = ["patientName", "date", "time", "reason"];
  appendToCSV(file, { patientName, date, time, reason }, headers);
  res.status(201).send("Appointment booked");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
