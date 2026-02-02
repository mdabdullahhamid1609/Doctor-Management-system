import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ roles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>LOADING...</p>;
  if (!user) return <Navigate to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/Unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
