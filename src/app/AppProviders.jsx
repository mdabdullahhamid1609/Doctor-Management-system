import { AuthProvider } from "../store/AuthContext.jsx";
export const AppProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
