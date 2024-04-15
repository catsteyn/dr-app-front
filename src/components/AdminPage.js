import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminPage = () => {
  // State variables for appointments list and edit mode
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Fetch appointments data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://still-ridge-22676-02c6e375dc3c.herokuapp.com/api/appointments"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // Function to toggle edit mode and update appointment data
  const toggleEditMode = async (index) => {
    try {
      const updatedAppointments = [...appointments];
      const appointment = updatedAppointments[index];
      const row = document.getElementById(`row-${index}`);
      const inputs = row.querySelectorAll("input");
      const spans = row.querySelectorAll("span");

      if (!editMode) {
        // Switch to edit mode
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].type === "text") {
            inputs[i].classList.remove("hidden");
            spans[i].style.display = "none";
          }
        }
        setEditMode(true);
      } else {
        // Save changes and exit edit mode
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].type === "text") {
            inputs[i].classList.add("hidden");
            spans[i].style.display = "inline";
            spans[i].textContent = inputs[i].value;
          }
        }
        // Update appointment fields and save changes
        appointment.dateTime = inputs[0].value;
        appointment.reason = inputs[1].value;
        appointment.patient = inputs[2].value;

        await axios.patch(
          `https://still-ridge-22676-02c6e375dc3c.herokuapp.com/api/appointments/${appointment._id}`,
          appointment
        );

        setEditMode(false);
      }
      // Update appointments state with the modified list
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to delete an appointment
  const deleteAppointment = async (id) => {
    try {
      await axios.delete(
        `https://still-ridge-22676-02c6e375dc3c.herokuapp.com/api/appointments/${id}`
      );
      // Remove the deleted appointment from the appointments list
      setAppointments(
        appointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="admin-container">
      {/* Admin page title */}
      <h1>Welcome Doctor</h1>
      <h2>Your appointments today</h2>
      {/* Table to display appointments */}
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Appointment Reason</th>
            <th>Patient Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through appointments to render each row */}
          {appointments.map((appointment, index) => (
            <tr key={index} id={`row-${index}`}>
              <td>
                {/* Display appointment datetime */}
                <span>{appointment.dateTime}</span>
                {/* Input field for editing datetime */}
                <input
                  type="text"
                  defaultValue={appointment.dateTime}
                  className="hidden"
                />
              </td>
              <td>
                {/* Display appointment reason */}
                <span>{appointment.reason}</span>
                {/* Input field for editing reason */}
                <input
                  type="text"
                  defaultValue={appointment.reason}
                  className="hidden"
                />
              </td>
              <td>
                {/* Display patient name */}
                <span>{appointment.patient}</span>
                {/* Input field for editing patient name */}
                <input
                  type="text"
                  defaultValue={appointment.patient}
                  className="hidden"
                />
              </td>
              <td>
                {/* Button to toggle edit mode and save changes */}
                <button onClick={() => toggleEditMode(index)}>
                  {editMode ? "Save" : "Edit"}
                </button>
                {/* Button to delete the appointment */}
                <button onClick={() => deleteAppointment(appointment._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
