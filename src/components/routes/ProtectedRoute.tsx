import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";

const ProtectedRoute = () => {
  const { user, ready } = useContext(AuthContext);

  // Wait until auth context is ready
  if (!ready) return null;

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Not admin → redirect to public page
  if (!user.admin) return <Navigate to="/Guides" replace />;

  // Admin → render nested routes
  return <Outlet />;
};

export default ProtectedRoute;
