
import { useState } from "react";

const DoctorForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  const submit = () => {
    if (!name || !specialization) {
      alert("Please fill all fields");
      return;
    }

    const newDoctor = {
      name,
      specialization,
      doctorUserId: 2, 
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
