import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  ADMIN_ROUTE,
  BUY_ROUTE,
  CERTIFICATES_ROUTE,
  CLASSCONTENT_ROUTE,
  COURSES_ROUTE,
  DASHBOARDADMIN_ROUTE,

  ENROLL_ROUTE,

  HOME_ROUTE,
  LOGIN_ROUTE,
  POSTVIDEO_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  USERS_ROUTE,
} from "./constants/route";

import MainLayout from "./layouts/MainLayouts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Profile from "./components/profile/Profile";

import NotFoundPage from "./pages/NotFoundPage";
import BuyCourse from "./pages/studentdashboard/purchase/Payment";

import ClassContent from "./components/courses/ClassContent";
import UnAuthLayout from "./layouts/UnAuthLayout";
import AuthLayout from "./layouts/AuthLayout";

import SuperLayout from "./layouts/SuperLayout";
import HomePage from "./pages/Home";
import Dashboard from "./pages/studentdashboard/AdminDashboard";
import Courses from "./pages/studentdashboard/courses/Courses";
import CertificatePage from "./pages/studentdashboard/certificate/CertificatePage";

import PostClassVideo from "./components/courses/PostClassVideo";
import MainLayouts from "./layouts/MainLayouts";
import EditProfile from "./components/profile/EditProfile";
import AllUser from "./pages/auth/AllUser";
import UserDetails from "./pages/auth/UserDetails";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AddCourse from "./pages/courses/Add";
import CourseList from "./pages/courses/List";
import UpdateEnrollStatus from "./pages/studentdashboard/Enrollment/UpdateEnrollStatus";
import GetAllEnrollments from "./pages/studentdashboard/Enrollment/GetAllEnrollment";

const Routes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<SuperLayout />}>
        <Route path={HOME_ROUTE} element={<HomePage />} />

        <Route element={<MainLayouts />}>
          <Route element={<AuthLayout />}>
          <Route path={USERS_ROUTE} element={<AllUser/>} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
         
            <Route path={POSTVIDEO_ROUTE} element={<PostClassVideo />} />
            <Route path={DASHBOARDADMIN_ROUTE} element={<Dashboard />} />
            <Route path={ENROLL_ROUTE} element={<GetAllEnrollments />} />
            <Route path={COURSES_ROUTE}>
              <Route index element={<Courses />} />
              <Route path={"add"} element={<AddCourse />} />
            
              <Route path={"all-courses"} element={<CourseList />} />
              <Route path={CLASSCONTENT_ROUTE} element={<ClassContent />} />
            </Route>
            <Route path={PROFILE_ROUTE} element={<EditProfile />} />

            <Route path={BUY_ROUTE} element={<BuyCourse />} />
            <Route path={CERTIFICATES_ROUTE} element={<CertificatePage />} />
            <Route path={REGISTER_ROUTE} element={<Register />} />
          </Route>
          <Route element={<UnAuthLayout />}>
            <Route path={LOGIN_ROUTE} element={<Login />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Routes;
