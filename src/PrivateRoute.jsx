import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import PrivateRoute from "./PrivateRoute";

export default function PrivateRouteUser({ children }) {
  const { onConnect, isAdmin, user } = useAppContext();

  return user.id ? <>{children}</> : <Navigate to="/login" />;
}

export function PrivateRouteAdmin({ children }) {
  const { onConnect, isAdmin, user } = useAppContext();

  return user.id ? (
    isAdmin ? (
      <>{children}</>
    ) : (
      <Navigate to="/" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
