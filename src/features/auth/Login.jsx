// import { useState } from "react";
// import { loginUser } from "../../services/authService";
// import { useAuth } from "../../store/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { getRedirectPathByRole } from "../../utils/roleUtils";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     try {
//       const user = loginUser(email, password);
//       login(user);
//       //navigate(`/${user.role}`);

//       const session = {
//         user,
//         expiry: Date.now() + 30 * 60 * 1000,
//       };

//       localStorage.setItem("auth", JSON.stringify(session));

//       login(user);

//       const redirectPath = getRedirectPathByRole(user.role);
//       navigate(redirectPath);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
//     <form className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6" onSubmit={handleSubmit}>
//       <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

//       <input
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {error && <p  className="text-red-500 text-sm text-center" style={{ color: "red" }}>{error}</p>}

//       <button className=" w-full  bg-blue-500 text-white rounded-lg py-2">Login</button>
//     </form>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../store/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { getRedirectPathByRole } from "../../utils/roleUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser(email, password);

      login(user);

      const redirectPath = getRedirectPathByRole(user.role);
      navigate(redirectPath);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          disabled={loading}
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm text-gray-600">
          Not registered?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
