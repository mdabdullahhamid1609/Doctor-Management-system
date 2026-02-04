// // const DoctorPage = () => <h1>DoctorDashboards</h1>;
// // export default DoctorPage;

// // // src/pages/DoctorPage.jsx
// import { sendAppointmentEmail } from "../services/emailService";


// import { useEffect, useState } from "react";
// import { storageService } from "../services/storageService";
// import { useAuth } from "../store/AuthContext";

// const DoctorPage = () => {
//   const { user } = useAuth();
//   const [appointments, setAppointments] = useState([]);

//   useEffect(() => {
//     const loadAppointments = async () => {
//       if (!user) return;
//       const allAppointments = await storageService.getAllAppointments();
//       setAppointments(allAppointments); // ✅ show ALL
//     };

//     loadAppointments();
//   }, [user]);

// //   const approve = async (id) => {
// //     await storageService.updateAppointmentStatus(id, "approved");
// //     setAppointments((prev) =>
// //       prev.map((a) => (a.id === id ? { ...a, status: "approved" } : a))
// //     );
// //   };

// //   const reject = async (id) => {
// //     await storageService.updateAppointmentStatus(id, "rejected");
// //     setAppointments((prev) =>
// //       prev.map((a) => (a.id === id ? { ...a, status: "rejected" } : a))
// //     );
// //   };
//   const approve = async (appointment) => {
//   await storageService.updateAppointmentStatus(appointment.id, "approved");

//   await sendAppointmentEmail({
//     patientEmail: appointment.patientEmail,
//     patientName: appointment.patientName,
//     doctorName: appointment.doctorName,
//     date: appointment.date,
//     time: appointment.time,
//     status: "approved",
//   });

//   setAppointments((prev) =>
//     prev.map((a) =>
//       a.id === appointment.id ? { ...a, status: "approved" } : a
//     )
//   );
// };
// const reject = async (appointment) => {
//   await storageService.updateAppointmentStatus(appointment.id, "rejected");

//   await sendAppointmentEmail({
//     patientEmail: appointment.patientEmail,
//     patientName: appointment.patientName,
//     doctorName: appointment.doctorName,
//     date: appointment.date,
//     time: appointment.time,
//     status: "rejected",
//   });

//   setAppointments((prev) =>
//     prev.map((a) =>
//       a.id === appointment.id ? { ...a, status: "rejected" } : a
//     )
//   );
// };



//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">
//         Doctor Dashboard – {user?.name}
//       </h2>

//       {appointments.length === 0 ? (
//         <p>No appointments yet</p>
//       ) : (
//         appointments.map((a) => (
//           <div key={a.id} className="border p-3 mb-2 rounded shadow">
//             <p><b>Doctor:</b> {a.doctorName}</p>
//             <p><b>Patient:</b> {a.patientName}</p>
//             <p><b>Date:</b> {a.date}</p>
//             <p><b>Time:</b> {a.time}</p>
//             <p><b>Status:</b> {a.status}</p>

//             {a.status === "pending" && (
//               <div className="space-x-2 mt-2">
//                 <button
//                   className="bg-green-500 text-white px-3 py-1 rounded"
//                   onClick={() => approve(a)}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                   onClick={() => reject(a)}
//                 >
//                   Reject
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default DoctorPage;

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { sendAppointmentEmail } from "../services/emailService";
import { storageService } from "../services/storageService";
import { useAuth } from "../store/AuthContext";

const DoctorPage = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const loadAppointments = async () => {
      if (!user) return;
      const allAppointments = await storageService.getAllAppointments();
      setAppointments(allAppointments);
    };

    loadAppointments();
  }, [user]);

  const approve = async (appointment) => {
    if (appointment.status !== "pending") return;

    await storageService.updateAppointmentStatus(
      appointment.id,
      "approved"
    );

    await sendAppointmentEmail({
      patientEmail: appointment.patientEmail,
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      date: appointment.date,
      time: appointment.time,
      status: "approved",
    });

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointment.id
          ? { ...a, status: "approved" }
          : a
      )
    );

    toast.success("Appointment approved & email sent 📧");
  };

  const reject = async (appointment) => {
    if (appointment.status !== "pending") return;

    await storageService.updateAppointmentStatus(
      appointment.id,
      "rejected"
    );

    await sendAppointmentEmail({
      patientEmail: appointment.patientEmail,
      patientName: appointment.patientName,
      doctorName: appointment.doctorName,
      date: appointment.date,
      time: appointment.time,
      status: "rejected",
    });

    setAppointments((prev) =>
      prev.map((a) =>
        a.id === appointment.id
          ? { ...a, status: "rejected" }
          : a
      )
    );

    toast.success("Appointment rejected & email sent 📧");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Doctor Dashboard – {user?.name}
      </h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet</p>
      ) : (
        appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-xl shadow-md p-5 mb-4 border"
          >
            <div className="grid grid-cols-2 gap-4">
              <p><b>Doctor:</b> {a.doctorName}</p>
              <p><b>Patient:</b> {a.patientName}</p>
              <p><b>Date:</b> {a.date}</p>
              <p><b>Time:</b> {a.time}</p>
            </div>

            <div className="mt-3">
              <b>Status:</b>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  a.status === "approved"
                    ? "bg-green-600"
                    : a.status === "rejected"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {a.status.toUpperCase()}
              </span>
            </div>

            {a.status === "pending" && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => approve(a)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => reject(a)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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
