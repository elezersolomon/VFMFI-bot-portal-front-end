import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

interface PrivateRouteProps {
  children: ReactNode;
  role: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (user.role === role) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
