
// //
// import { useEffect, useState } from "react";
// import DoctorForm from "../features/doctors/DoctorForm";
// import DoctorList from "../features/doctors/DoctorList";
// import { storageService } from "../services/storageService";
// import users from "../Data/users.json";

// const AdminPage = () => {
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     loadDoctors();
//   }, []);

//   const loadDoctors = async () => {
//     const data = await storageService.getDoctors();
//     setDoctors(data);
//   };

//   const addDoctor = async (doctor) => {
//     try {
//       // Check if user exists
//       let doctorUser = users.find(
//         (u) => u.role === "doctor" && u.name === doctor.name
//       );

//       if (!doctorUser) {
//         doctorUser = {
//           id: `doc${Date.now()}`,
//           name: doctor.name,
//           role: "doctor",
//           email: `${doctor.name.replace(/\s/g, "").toLowerCase()}@docapp.com`,
//           password: "doc123",
//         };
//         users.push(doctorUser); // in memory only
//       }

//       const doctorWithUserId = { ...doctor, doctorUserId: doctorUser.id };
//       await storageService.addDoctor(doctorWithUserId);
//       await loadDoctors();
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const deleteDoctor = async (id) => {
//     await storageService.removeDoctor(id);
//     loadDoctors();
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-4">Admin – Doctor Management</h2>
//       <DoctorForm onAdd={addDoctor} />
//       <DoctorList doctors={doctors} onDelete={deleteDoctor} />
//     </div>
//   );
// };

// export default AdminPage;

import { useEffect, useState, useMemo } from "react";
import DoctorForm from "../features/doctors/DoctorForm";
import DoctorList from "../features/doctors/DoctorList";
import { storageService } from "../services/storageService";
import users from "../Data/users.json";
import SearchBar from "../components/search/SearchBar";
import useDebounce from "../hooks/useDebounce";

const AdminPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    const data = await storageService.getDoctors();
    setDoctors(data);
  };

  const addDoctor = async (doctor) => {
    try {
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
        users.push(doctorUser);
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

  // ------------------ Search + Sort ------------------
  const debouncedSearch = useDebounce(search, 300);

  const filteredDoctors = useMemo(() => {
    let list = doctors.filter((doc) =>
      doc.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    list.sort((a, b) => {
      const aVal = a[sortKey]?.toLowerCase() || "";
      const bVal = b[sortKey]?.toLowerCase() || "";
      if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
      return aVal < bVal ? 1 : -1;
    });

    return list;
  }, [doctors, debouncedSearch, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center md:text-left">
        Admin Dashboard – Doctor Management
      </h2>

      {/* Doctor Form */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Add New Doctor</h3>
        <DoctorForm onAdd={addDoctor} />
      </div>

      {/* Search + Sorting */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-3 md:space-y-0">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search doctor by name..."
          className="w-full md:w-1/3"
        />
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 rounded bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition"
            onClick={() => handleSort("name")}
          >
            Name {sortKey === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
          <button
            className="px-3 py-1 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
            onClick={() => handleSort("specialization")}
          >
            Specialization{" "}
            {sortKey === "specialization" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
          </button>
        </div>
      </div>

      {/* Doctor List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.length === 0 && (
          <p className="text-gray-500 col-span-full">No doctors found.</p>
        )}

        {filteredDoctors.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            <div>
              <p className="text-xl font-bold text-gray-800">{d.name}</p>
              <p className="text-gray-600">{d.specialization}</p>
              {d.email && <p className="text-gray-400 text-sm">{d.email}</p>}
            </div>
            <button
              className="mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              onClick={() => deleteDoctor(d.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
