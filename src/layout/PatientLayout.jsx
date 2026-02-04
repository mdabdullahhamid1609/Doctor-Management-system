
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

const PatientLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header>
        <h3>Patient Layout</h3>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main><Outlet /></main>
    </>
  );
};

export default PatientLayout;
