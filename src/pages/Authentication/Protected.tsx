import { Navigate, useLocation } from "react-router-dom";

interface IProtected {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const Protected: React.FC<IProtected> = ({ isLoggedIn, children }) => {
  const location = useLocation();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  // if (isLoggedIn && location.pathname === "/login")
  //   return <Navigate to="/dashboard" replace />;

  // if (location.pathname === "/") return <Navigate to="/dashboard" replace />;

  return children;
};

export default Protected;
