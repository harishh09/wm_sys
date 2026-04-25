import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  // 👉 Role check
  if (role && user.role !== role) {
    return <h1>Unauthorized ❌</h1>;
  }

  return children;
};

export default ProtectedRoute;