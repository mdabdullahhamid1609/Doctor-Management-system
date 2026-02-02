// const DoctorLayout = ({ children }) => (
//   <>
//     <h3>Doctor Layout</h3>
//     {children}
//   </>
// );

// export default DoctorLayout;

// import { Outlet } from "react-router-dom";

// const DoctorLayout = () => (
//   <>
//     <h3>Doctor Layout</h3>
//     <Outlet />
//   </>
// );

// export default DoctorLayout;

import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const DoctorLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header>
        <h3>Doctor Layout</h3>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main><Outlet /></main>
    </>
  );
};

export default DoctorLayout;
