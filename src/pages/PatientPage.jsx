// const PatientPage = () => <h1>Patients Dashboards</h1>;
// export default PatientPage;
// // // src/services/storageService.js

import { useEffect, useState } from "react";
import { storageService } from "../services/storageService";
import { useAuth } from "../store/AuthContext";

const PatientPage = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await storageService.getDoctors();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const bookAppointment = async (doctor) => {
    if (!date || !time) return alert("Please select both date and time!");

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return alert("Cannot book in the past!");

    const allAppointments = await storageService.getAllAppointments();
    const conflict = allAppointments.find(
      (a) =>
        a.doctorId === doctor.id &&
        a.patientId === user.id &&
        a.date === date &&
        a.time === time
    );
    if (conflict) return alert("Already booked this doctor at this time!");

    await storageService.addAppointment({
      doctorId: doctor.id,
      doctorUserId: doctor.doctorUserId,
      doctorName: doctor.name,
      patientId: user.id,
      patientName: user.name,
      date,
      time,
      status: "pending",
    });

    alert("Appointment booked successfully!");
    setDate("");
    setTime("");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Patient Dashboard – Book Doctors</h2>

      <div className="flex space-x-4 mb-4">
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border px-2 py-1 rounded" />
        <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border px-2 py-1 rounded" />
      </div>

      <div className="space-y-4">
        {doctors.map((d) => (
          <div key={d.id} className="border p-4 rounded flex justify-between items-center bg-white">
            <div>
              <p className="font-semibold">{d.name}</p>
              <p>{d.specialization}</p>
            </div>
            <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => bookAppointment(d)}>
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientPage;
