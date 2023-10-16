import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "../../../redux/store";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useSelector((state: rootState) => state.auth);
  if (token !== null) {
    return children;
  } else {
    return <Navigate to={"/sing-in"} />;
  }
};

export default ProtectedRoute;
