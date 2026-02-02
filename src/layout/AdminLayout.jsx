// const AdminLayout = ({ children }) => (
//   <>
//     <h3>Admin Layout</h3>
//     {children}
//   </>
// );

// export default AdminLayout;

// import { Outlet, useNavigate } from "react-router-dom";
// const AdminLayout = () => (
//   <>
//     <h3>Admin Layout</h3>
//     <Outlet />
//   </>
// );

// export default AdminLayout;
// import { Outlet, useNavigate } from "react-router-dom";
// import { useAuth } from "../store/AuthContext";

// const AdminLayout = ({ children }) => {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <>
//       <header className="m-4 bg-red-600 text-white flex justify-between p-1.5">
//         <h3 className="text-2xl bg-amber-400 border ">Admin Layout</h3>
//         <button className="cursor-pointer bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg text-xl bg-sky-500 hover:bg-sky-200" onClick={handleLogout}>Logout</button>
//       </header>

//       <main><Outlet /></main>
//     </>
//   );
// };

// export default AdminLayout;
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
