
import axios from "axios";

const API = "http://localhost:5000/doctors";

export const fetchDoctors = async () => {
  const res = await axios.get(API);
  return res.data;
};


export const createDoctor = async ({ name, specialization, user }) => {
  const newDoctor = {
    id: crypto.randomUUID(),
    name,
    specialization,

    doctorUserId: user.doctorUserId,
    email: user.email
  };

  const res = await axios.post(API, newDoctor);
  return res.data;
};
export const updateDoctor = async (id, doctor) => {
  const res = await axios.put(`${API}/${id}`, doctor);
  return res.data;
};

export const removeDoctor = async (id) => {
  await axios.delete(`${API}/${id}`);
};
