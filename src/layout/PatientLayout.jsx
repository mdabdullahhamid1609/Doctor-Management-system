
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
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
  <h3 className="text-xl font-semibold text-gray-800">
    Doctor Layout
  </h3>

  <button
    onClick={handleLogout}
    className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 active:scale-95"
  >
    Logout
  </button>
</header>


      <main><Outlet /></main>
    </>
  );
};

export default PatientLayout;
