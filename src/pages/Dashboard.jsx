import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <div>Welcome to the Dashboard</div>;
}
