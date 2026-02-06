import users from "../Data/users.json";
import axios from "axios";

const PATIENT_API = "http://localhost:5000/patients";


// ================= LOGIN =================
export const loginUser = async (email, password) => {
  // ADMIN / DOCTOR → local users.json
  const localUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (localUser) {
    const token = {
      user: localUser,
      expiry: Date.now() + 60 * 60 * 1000,
    };
    localStorage.setItem("auth", JSON.stringify(token));
    return localUser;
  }

  // PATIENT → API
  const res = await axios.get(
    `${PATIENT_API}?email=${email}&password=${password}`
  );

  if (res.data.length === 0) {
    throw new Error("Invalid email or password");
  }

  const patient = { ...res.data[0], role: "patient" };

  const token = {
    user: patient,
    expiry: Date.now() + 60 * 60 * 1000,
  };

  localStorage.setItem("auth", JSON.stringify(token));
  return patient;
};

// ================= REGISTER =================
export const registerUser = async ({ name, email, password }) => {
  const existing = await axios.get(`${PATIENT_API}?email=${email}`);
  if (existing.data.length > 0) {
    throw new Error("Email already exists");
  }

  const newPatient = {
    id: Date.now(),
    name,
    email,
    password,
  };

  const res = await axios.post(PATIENT_API, newPatient);

  const token = {
    user: { ...res.data, role: "patient" },
    expiry: Date.now() + 60 * 60 * 1000,
  };

  localStorage.setItem("auth", JSON.stringify(token));
  return res.data;
};
