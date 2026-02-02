// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "../features/auth/ProtectedRoute.jsx";
// import AdminLayout from "../layout/AdminLayout.jsx";
// import AdminPage from "../pages/AdminPage.jsx";

// const AdminRoutes = () => {
//   return (
//     <ProtectedRoute roles={["admin"]}>
//       <AdminLayout>
//         <Routes>
//           {/* default route → /admin */}
//           <Route index element={<AdminPage />} />
//         </Routes>
//       </AdminLayout>
//     </ProtectedRoute>
//   );
// };

// export default AdminRoutes;

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../features/auth/ProtectedRoute.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";
import AdminPage from "../pages/AdminPage.jsx";

const AdminRoutes = () => (
  <Routes>
    <Route
      element={
        <ProtectedRoute roles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<AdminPage />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
