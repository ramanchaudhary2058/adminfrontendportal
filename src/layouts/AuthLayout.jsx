import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { HOME_ROUTE } from "../constants/route";
import { logout } from "../reducer/auth/authSlice";
// Import logout action

const AuthLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Ensure user exists and has roles before checking for "ADMIN"
  const isAdmin = user?._doc?.roles?.includes("ADMIN");

  if (!isAdmin) {
    localStorage.removeItem("authToken"); // Remove token from localStorage
    dispatch(logout()); // Clear Redux state
    return <Navigate to={HOME_ROUTE} replace />;
  }

  return <Outlet />;
};

export default AuthLayout;
