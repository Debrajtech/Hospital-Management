  // Helper to normalize doctor name for backend
  function normalizeDoctorName(name) {
    return name.trim().replace(/\s+/g, "_").toLowerCase();
  }
document.addEventListener("DOMContentLoaded", function () {
  const regSection = document.getElementById("registration-section");
  const docSection = document.getElementById("doctors-section");
  const appSection = document.getElementById("appointment-section");
  const regForm = document.getElementById("registration-form");
  const docList = document.getElementById("doctors-list");
  const appForm = document.getElementById("appointment-form");
  const selectedDoctorSpan = document.getElementById("selected-doctor");
  const messageDiv = document.getElementById("message");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let selectedDoctor = null;
  let registeredPatient = null;

  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(regForm);
    const data = Object.fromEntries(formData.entries());
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Registration failed");
        registeredPatient = data.name;
        regSection.style.display = "none";
        loadDoctors();
        docSection.style.display = "block";
        messageDiv.textContent = "Registration successful! Please select a doctor.";
      })
      .catch(() => {
        messageDiv.textContent = "Registration failed. Try again.";
      });
  });

  function loadDoctors() {
    fetch("/doctors")
      .then((res) => res.json())
      .then((doctors) => {
        docList.innerHTML = "";
        doctors.forEach((doc, idx) => {
          const photo = doc.photo || `https://randomuser.me/api/portraits/med/men/${idx+10}.jpg`;
          const card = document.createElement("div");
          card.className = "doctor-card";

          const img = document.createElement("img");
          img.className = "doctor-photo";
          img.src = photo;
          img.alt = doc.name;

          const info = document.createElement("div");
          info.className = "doctor-info";
          const name = document.createElement("div");
          name.className = "doctor-name";
          name.textContent = doc.name;
          const degree = document.createElement("div");
          degree.className = "doctor-degree";
          degree.textContent = doc.degree || "MBBS";
          const spec = document.createElement("div");
          spec.className = "doctor-specialization";
          spec.textContent = doc.specialization;
          info.appendChild(name);
          info.appendChild(degree);
          info.appendChild(spec);

          const btn = document.createElement("button");
          btn.className = "book-btn";
          btn.textContent = "Book";
          btn.onclick = () => selectDoctor(doc.name);

          card.appendChild(img);
          card.appendChild(info);
          card.appendChild(btn);
          docList.appendChild(card);
        });
      });
  }

  function selectDoctor(name) {
    selectedDoctor = name;
    selectedDoctorSpan.textContent = name;
    docSection.style.display = "none";
    appSection.style.display = "block";
    appForm.patientName.value = registeredPatient || "";
    messageDiv.textContent = "";
  }

  const viewAppointmentsBtn = document.getElementById("view-appointments-btn");
  const viewAppointmentsSection = document.getElementById("view-appointments-section");
  const appointmentsList = document.getElementById("appointments-list");
  const viewDoctorSpan = document.getElementById("view-doctor");
  const backBtn = document.getElementById("back-btn");

  appForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!selectedDoctor) return;
    const formData = new FormData(appForm);
    const data = Object.fromEntries(formData.entries());
    data.doctor = normalizeDoctorName(selectedDoctor);
    fetch("/appointment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Booking failed");
        appSection.style.display = "block";
        // Show modal popup instead of messageDiv
        modal.style.display = "flex";
        // Hide messageDiv if visible
        messageDiv.textContent = "";
      })
      .catch(() => {
        messageDiv.textContent = "Booking failed. Try again.";
      });
  });

  // Modal OK button logic
  closeModalBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Appointment details logic removed
});
