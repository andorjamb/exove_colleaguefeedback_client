//React
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const user: any = true; //Replace with auth or state
const ProtectedRoutes = () => {
  if (!user)
    return (
      <>
        <Navigate to="/" replace />
      </>
    );

  return <Outlet />;
};

export default ProtectedRoutes;
