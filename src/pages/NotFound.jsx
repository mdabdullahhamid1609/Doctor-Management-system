import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-center text-3xl font-bold text-red-600 mb-4">
        404 – Page Not Found
      </h2>

      <p className="text-gray-700 text-lg">
        Click here to return to login page {" "}
        <Link
          to="/login"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
