import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute(props: ProtectedRouteProps) {
  if (localStorage.getItem("userToken")) {
    return props.children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default ProtectedRoute;
