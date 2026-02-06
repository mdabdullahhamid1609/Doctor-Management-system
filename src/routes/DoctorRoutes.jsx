
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute.jsx";
import DoctorLayout from "../layout/DoctorLayout.jsx";
import DoctorPage from "../pages/DoctorPage.jsx";

const DoctorRoutes = () => (
  <Routes>
    <Route
      element={
        <ProtectedRoute roles={["doctor"]}>
          <DoctorLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DoctorPage />} />
    </Route>
  </Routes>
);

export default DoctorRoutes;

