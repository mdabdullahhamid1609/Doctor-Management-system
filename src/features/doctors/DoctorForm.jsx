// import { useState } from "react";

// const DoctorForm = ({ onAdd }) => {
//   const [name, setName] = useState("");
//   const [specialization, setSpecialization] = useState("");

//  const submit = () => {
//   if (!name || !specialization) return;

//   const newDoctor = { name, specialization };
//   onAdd(newDoctor); // ✅ send without id
//   setName("");
//   setSpecialization("");
// };



//   return (
//     <div className="w-600px justify-center bg-gray-200">
//       <label className="text-red-500">Doctors Name: </label>
//       <input
//       className="w-400px m-4 border-2 bg-amber-100  "
//         placeholder="Doctor Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       /> 
//       <br /> <br />
//       <label className="text-red-500">Specilizations : </label>

//       <input
//       className="w-400px m-2 border-2 bg-amber-100  "
//         placeholder="Specialization"
//         value={specialization}
//         onChange={(e) => setSpecialization(e.target.value)}
//       /> <br />  <br />
//       <button
//       className="bg-amber-600 m-2 p-2 rounded-xl text-white :hover cursor-pointer" onClick={submit}>Add Doctor</button> <br /> <br />
//     </div>
//   );
// };

// export default DoctorForm;


// import { useState } from "react";

// const DoctorForm = ({ onAdd }) => {
//   const [name, setName] = useState("");
//   const [specialization, setSpecialization] = useState("");

//   const submit = () => {
//     if (!name || !specialization) {
//       alert("Please fill all fields");
//       return;
//     }

//     // ✅ Automatically assign doctorUserId later in AdminPage
//     const newDoctor = { name, specialization };

//     onAdd(newDoctor);

//     setName("");
//     setSpecialization("");
//   };

//   return (
//     <div className="w-600px justify-center bg-gray-200 p-4 m-2">
//       <label className="text-red-500">Doctors Name: </label>
//       <input
//         className="w-400px m-2 border-2 bg-amber-100"
//         placeholder="Doctor Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <br /><br />

//       <label className="text-red-500">Specialization: </label>
//       <input
//         className="w-400px m-2 border-2 bg-amber-100"
//         placeholder="Specialization"
//         value={specialization}
//         onChange={(e) => setSpecialization(e.target.value)}
//       />

//       <br /><br />

//       <button
//         className="bg-amber-600 m-2 p-2 rounded-xl text-white hover:cursor-pointer"
//         onClick={submit}
//       >
//         Add Doctor
//       </button>
//     </div>
//   );
// };

// export default DoctorForm;

//2
import { useState } from "react";

const DoctorForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const submit = () => {
    if (!name || !specialization) {
      alert("Please fill all fields");
      return;
    }

    // ✅ IMPORTANT FIX
    const newDoctor = {
      name,
      specialization,
      doctorUserId: 2, // 👈 MUST MATCH users.json doctor id
    };

    onAdd(newDoctor);

    setName("");
    setSpecialization("");
  };

  return (
    <div className="w-600px bg-gray-200 p-4 m-2">
      <label>Doctor Name:</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <label>Specialization:</label>
      <input
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />

      <br /><br />

      <button onClick={submit}>Add Doctor</button>
    </div>
  );
};

export default DoctorForm;
