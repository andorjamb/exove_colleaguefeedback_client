//React
import React from "react";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";

//Pages and Components
import Dashboard from "../pages/Dashboard/Dashboard";
import Template from "../pages/Template/Template";
import Feedback from "../pages/Feedback/Feedback";
import Profile from "../pages/Profile/Profile";
//import { JsxElement } from "typescript";

/* interface Props {
    user:any,
    children: JsxElement | JsxElement[]
} */

const user: any = false; //Replace with auth
const ProtectedRoutes = (/* { user, children }:Props */) => {
  if (!user)
    return (
      <>
        <Navigate to="/" replace />
      </>
    );

  return <Outlet />;
};

export default ProtectedRoutes;
