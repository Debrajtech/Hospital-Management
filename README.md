# Hospital Management System (CSV-based, Node.js)

A simple hospital management system using Node.js, Express, and CSV files for data storage. Patients can register, select a doctor, and book appointments. After booking, a modal popup confirms the appointment.

## Features
- Patient registration
- Doctor selection (card UI)
- Book appointment (date, time, reason)
- CSV file storage (no database required)
- Modern, animated frontend (HTML/CSS/JS)
- Modal popup for appointment confirmation

## Folder Structure
```
Hospital Management/
├── appoinment.js           # (legacy, not used in CSV version)
├── appointments_dr._smith.csv  # Example doctor appointment file
├── doctors.csv             # List of doctors
├── index.html              # Main frontend
├── patients.csv            # Registered patients
├── script.js               # Frontend logic
├── server.js               # Node.js/Express backend
├── style.css               # Styles
```

## Getting Started

### Prerequisites
- Node.js (v14+ recommended)

### Installation
1. Clone or download this folder.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```
   npm install express cors body-parser
   ```

### Running the App
1. Start the backend server:
   ```
   node server.js
   ```
2. Open `index.html` in your browser (or use Live Server in VS Code).

### Usage
- Register a patient.
- Select a doctor.
- Book an appointment.
- A modal popup will confirm the booking.

### Notes
- Appointments are saved in CSV files named like `appointments_dr._smith.csv`.
- To add doctors, edit `doctors.csv`.
- No appointment details view is shown after booking (per latest version).

## License
MIT
