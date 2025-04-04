import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { DASHBOARDADMIN_ROUTE } from "../constants/route";

const UnAuthLayout = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div> {user ? <Navigate to={DASHBOARDADMIN_ROUTE } /> : <Outlet />}</div>
  );
};

export default UnAuthLayout;
