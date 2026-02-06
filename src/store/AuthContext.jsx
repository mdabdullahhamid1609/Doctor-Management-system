
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("auth"));

    if (session && session.expiry > Date.now()) {
      setUser(session.user);

      // Auto logout
      const timeout = session.expiry - Date.now();
      const timer = setTimeout(logout, timeout);
      return () => clearTimeout(timer);
    } else {
      localStorage.removeItem("auth");
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    const expiry = Date.now() + 60 * 60 * 1000; // 1 hour
    const token = { user: userData, expiry };
    localStorage.setItem("auth", JSON.stringify(token));
    setUser(userData);
    setLoading(false);

    // Auto logout
    setTimeout(() => logout(), 60 * 60 * 1000);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


