import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null; // O un loader/spinner

  return isAuthenticated ? children : <Navigate to="/" replace />;
}