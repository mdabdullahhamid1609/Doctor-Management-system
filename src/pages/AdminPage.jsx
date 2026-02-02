// // import DoctorList from "../features/doctors/DoctorList"

// // const AdminPage = () => {
// //   return (
// //     <>
// //       <h2>Admin Dashboard</h2>
// //       <DoctorList isAdmin />
// //     </>
// //   );
// // };

// // export default AdminPage;


// import { useEffect, useState } from "react";
// import DoctorForm from "../features/doctors/DoctorForm";
// import DoctorList from "../features/doctors/DoctorList";
// import {
//   fetchDoctors,
//   createDoctor,
//   removeDoctor,
// } from "../features/doctors/doctorServices";

// const AdminPage = () => {
//   const [doctors, setDoctors] = useState([]);

//   // 1️⃣ Load doctors on page load
//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   const loadDoctors = async () => {
//     const data = await fetchDoctors();
//     setDoctors(data);
//   };

//   const addDoctor = async (doctor) => {
//   try {
    
//     await createDoctor(doctor);
//     await loadDoctors(); // reload to show new doctor
//   } catch (err) {
//     console.error(err.message);
//   }
// };
//   // 3️⃣ Delete doctor
//   const handleDeleteDoctor = async (id) => {
//     await removeDoctor(id);
//     loadDoctors(); // 
//   };

//   return (
//     <div className="w-800px bg-gray-300 m-2 p-3 text-center">
//       <h2 className="text-3xl  bg-linear-to-r from-cyan-350 to-blue-600 font-bold text-white">Admin – Doctor Management</h2>

//       <DoctorForm onAdd={addDoctor} />
//       <DoctorList doctors={doctors} onDelete={handleDeleteDoctor} />
//     </div>
//   );
// };

// export default AdminPage;



//
import { useEffect, useState } from "react";
import DoctorForm from "../features/doctors/DoctorForm";
import DoctorList from "../features/doctors/DoctorList";
import { storageService } from "../services/storageService";
import users from "../Data/users.json";

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const data = await storageService.getDoctors();
    setDoctors(data);
  };

  const addDoctor = async (doctor) => {
    try {
      // Check if user exists
      let doctorUser = users.find(
        (u) => u.role === "doctor" && u.name === doctor.name
      );

      if (!doctorUser) {
        doctorUser = {
          id: `doc${Date.now()}`,
          name: doctor.name,
          role: "doctor",
          email: `${doctor.name.replace(/\s/g, "").toLowerCase()}@docapp.com`,
          password: "doc123",
        };
        users.push(doctorUser); // in memory only
      }

      const doctorWithUserId = { ...doctor, doctorUserId: doctorUser.id };
      await storageService.addDoctor(doctorWithUserId);
      await loadDoctors();
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteDoctor = async (id) => {
    await storageService.removeDoctor(id);
    loadDoctors();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Admin – Doctor Management</h2>
      <DoctorForm onAdd={addDoctor} />
      <DoctorList doctors={doctors} onDelete={deleteDoctor} />
    </div>
  );
};

export default AdminPage;
