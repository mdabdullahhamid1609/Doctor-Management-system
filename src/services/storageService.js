
//
import axios from "axios";

const API_DOCTORS = "http://localhost:5000/doctors";
const API_APPOINTMENTS = "http://localhost:5000/appointments";

export const storageService = {
  /* ---------------- DOCTORS ---------------- */
  getDoctors: async () => {
    const res = await axios.get(API_DOCTORS);
    return res.data;
  },

  addDoctor: async (doctor) => {
    const res = await axios.post(API_DOCTORS, doctor);
    return res.data;
  },

  removeDoctor: async (id) => {
    await axios.delete(`${API_DOCTORS}/${id}`);
  },

  /* ---------------- APPOINTMENTS ---------------- */
  getAllAppointments: async () => {
    const res = await axios.get(API_APPOINTMENTS);
    return res.data;
  },

  getAppointmentsByDoctorUserId: async (doctorUserId) => {
    const res = await axios.get(API_APPOINTMENTS);
    return res.data.filter((a) => a.doctorUserId === doctorUserId);
  },

  addAppointment: async (appointment) => {
    const res = await axios.post(API_APPOINTMENTS, appointment);
    return res.data;
  },

  updateAppointmentStatus: async (id, status) => {
    const res = await axios.patch(`${API_APPOINTMENTS}/${id}`, { status });
    return res.data;
  },
};
