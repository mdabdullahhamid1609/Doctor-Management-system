// import { Routes, Route } from "react-router-dom";
// import LoginPage from "../pages/LoginPage.jsx";
// import NotFound from "../pages/NotFound.jsx";
// import Unauthorized from "../pages/Unauthorized.jsx";

// import AdminRoutes from "./AdminRoutes.jsx";
// import DoctorRoutes from "./DoctorRoutes.jsx";
// import PatientRoutes from "./PatientRoutes.jsx";

// const AppRouter = () => {
//   return (
//     <Routes>
//   <Route path="/login" element={<LoginPage />} />
//   <Route path="/unauthorized" element={<Unauthorized />} />

//   <Route path="/admin/*" element={<AdminRoutes />} />
//   <Route path="/doctor/*" element={<DoctorRoutes />} />
//   <Route path="/patient/*" element={<PatientRoutes />} />

//   <Route path="*" element={<NotFound />} />
// </Routes>

//   );
// };

// export default AppRouter;

import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import NotFound from "../pages/NotFound.jsx";

import AdminRoutes from "./AdminRoutes.jsx";
import DoctorRoutes from "./DoctorRoutes.jsx";
import PatientRoutes from "./PatientRoutes.jsx";
import Register from "../features/auth/Register.jsx";
const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<Register />} />
    
    <Route path="/unauthorized" element={<Unauthorized />} />

    <Route path="/admin/*" element={<AdminRoutes />} />
    <Route path="/doctor/*" element={<DoctorRoutes />} />
    <Route path="/patient/*" element={<PatientRoutes />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;

