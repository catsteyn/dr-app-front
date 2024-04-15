import React, { useEffect, useState } from "react";
import axios from "axios";
import useCurrentUser from "../hooks/useCurrentUser";

// Component for client page
const ClientPage = () => {
  // State for appointments and current user
  const [appointments, setAppointments] = useState([]);
  const currentUser = useCurrentUser();

  // Fetch appointments data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/appointments"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error:", error); // Log error message for failure
      }
    };

    fetchData();
  }, []);

  // Function to open appointment creation popup
  const openPopup = () => {
    document.getElementById("popup").style.display = "block";
  };

  // Function to close appointment creation popup
  const closePopup = () => {
    document.getElementById("popup").style.display = "none";
  };

  // Function to add a new appointment
  const addAppointment = async () => {
    const fullName = document.getElementById("fullName").value;

    // Check if user is logged in
    if (!currentUser) {
      alert("User is not logged in.");
      return;
    }

    try {
      const reason = document.getElementById("reason").value;
      const timeslot = document.getElementById("timeslot").value;

      // Parse timeslot and format date time
      const [day, date, month, time] = timeslot.split("_");
      const formattedDateTime = `${day}, ${date} ${month} ${time.slice(
        0,
        2
      )}:${time.slice(2)}`;

      // Create new appointment object
      const newAppointment = {
        dateTime: formattedDateTime,
        reason: reason,
        doctor: "Dr. Jones",
        patient: fullName,
      };

      // Send new appointment data to backend
      await axios.post(
        "http://localhost:5000/api/appointments",
        newAppointment
      );

      // Update appointments state with new appointment
      setAppointments([...appointments, newAppointment]);
      closePopup();
    } catch (error) {
      console.error("Error adding appointment:", error); // Log error message for failure
    }
  };

  // Render client page with appointment creation popup and upcoming appointments
  return (
    <div className="client-container">
      <h1>Welcome</h1>
      <button onClick={openPopup}>Create new appointment</button>

      <div id="popup" className="popup">
        <div className="popup-content">
          <span className="close" onClick={closePopup}>
            &times;
          </span>
          <h2>New Appointment</h2>
          <label htmlFor="reason">
            What is the reason for your appointment?
          </label>
          <select id="reason">
            <option value="General">General check-up</option>
            <option value="Specific">Specific problem</option>
            <option value="Follow-up">Follow-up</option>
          </select>
          <br />
          <br />
          <label htmlFor="timeslot">Dr. Jones' next available timeslots:</label>
          <select id="timeslot">
            <option value="Tue_13_Jun_1339">Tue, 13 Jun 13:30</option>
            <option value="Tue_14_Jun_1339">Wed, 14 Jun 08:45</option>
            <option value="Tue_15_Jun_1339">Thu, 15 Jun 11:00</option>
          </select>
          <br />
          <br />
          <label htmlFor="fullName">Patient's full name:</label>
          <input type="text" id="fullName" />
          <br />
          <br />
          <button id="app-button" onClick={() => addAppointment(currentUser)}>
            Create Appointment
          </button>
        </div>
      </div>
      <h3>Upcoming Appointments</h3>
      <table id="appointment-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Appointment Type/Description</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.dateTime}</td>
              <td>{appointment.reason}</td>
              <td>Dr. Jones</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientPage;
