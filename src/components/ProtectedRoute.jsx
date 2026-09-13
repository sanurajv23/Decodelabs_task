import { Navigate } from "react-router-dom";
import { getSession } from "../utils/auth";

/**
 * ProtectedRoute Guard
 * Ensures only authenticated users with the required role can access child routes.
 * - Unauthenticated users -> Redirects to /login
 * - Role mismatch (e.g. customer -> worker dashboard) -> Redirects to user's own dashboard
 */
export default function ProtectedRoute({ requiredRole, children }) {
  const session = getSession();

  if (!session || !session.authenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && session.role !== requiredRole) {
    const fallbackDestination = session.role === "worker" ? "/worker/home" : "/customer/home";
    return <Navigate to={fallbackDestination} replace />;
  }

  return children;
}

