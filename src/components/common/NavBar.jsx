
import { Link } from "react-router-dom";

const Navbar = ({ links, onLogout }) => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 text-white px-6 py-3">
      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="hover:text-cyan-400"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        onClick={onLogout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
