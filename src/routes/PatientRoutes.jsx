// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../features/auth/ProtectedRoute.jsx";
// import PatientLayout from "../layout/PatientLayout.jsx";
// import PatientPage from "../pages/PatientPage.jsx";

// const PatientRoutes = () => (
//   <ProtectedRoute roles={["patient"]}>
//     <PatientLayout>
//       <Routes>
//         <Route index element={<PatientPage />} />
//       </Routes>
//     </PatientLayout>
//   </ProtectedRoute>
// );

// export default PatientRoutes;


import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute.jsx";
import PatientLayout from "../layout/PatientLayout.jsx";
import PatientPage from "../pages/PatientPage.jsx";

const PatientRoutes = () => (
  <Routes>
    <Route
      element={
        <ProtectedRoute roles={["patient"]}>
          <PatientLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<PatientPage />} />
    </Route>
  </Routes>
);

export default PatientRoutes;
