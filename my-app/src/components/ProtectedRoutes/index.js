import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoutes;
