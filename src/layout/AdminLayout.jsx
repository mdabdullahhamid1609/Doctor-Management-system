
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { getNavLinksByRole } from "../utils/roleUtils";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = getNavLinksByRole(user?.role); 

  return (
    <>
      <header className="m-4 bg-red-600 text-white flex justify-between p-1.5">
        <h3 className="text-2xl bg-amber-400 border">Admin Layout</h3>

        <button
          className="cursor-pointer bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg text-xl hover:bg-sky-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
