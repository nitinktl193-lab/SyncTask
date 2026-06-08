import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Fake Login Check
  const isAuth = localStorage.getItem("token");

  if(!isAuth){

    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;