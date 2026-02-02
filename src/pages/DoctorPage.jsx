// const DoctorPage = () => <h1>DoctorDashboards</h1>;
// export default DoctorPage;

// // src/pages/DoctorPage.jsx

import { useEffect, useState } from "react";
import { storageService } from "../services/storageService";
import { useAuth } from "../store/AuthContext";

const DoctorPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!user) return;
      const allAppointments = await storageService.getAllAppointments();
      setAppointments(allAppointments); // ✅ show ALL
    };

    loadAppointments();
  }, [user]);

  const approve = async (id) => {
    await storageService.updateAppointmentStatus(id, "approved");
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
    );
  };

  const reject = async (id) => {
    await storageService.updateAppointmentStatus(id, "rejected");
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">
        Doctor Dashboard – {user?.name}
      </h2>

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        appointments.map((a) => (
          <div key={a.id} className="border p-3 mb-2 rounded shadow">
            <p><b>Doctor:</b> {a.doctorName}</p>
            <p><b>Patient:</b> {a.patientName}</p>
            <p><b>Date:</b> {a.date}</p>
            <p><b>Time:</b> {a.time}</p>
            <p><b>Status:</b> {a.status}</p>

            {a.status === "pending" && (
              <div className="space-x-2 mt-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => approve(a.id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => reject(a.id)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DoctorPage;
