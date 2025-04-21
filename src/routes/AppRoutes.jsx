import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import RoleProtectedRoute from "../component/RoleProtectedRoutes";
import Errorpage from "../component/ErrorPage/Errorpage";
import CenteredLoader from "../component/CenteredLoader";
import Login from "../pages/login/Login";

// Lazy load everything else
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const UserManagement = lazy(() => import("../pages/dashboard/UserManagement/UserManagement"));
const CreateUser = lazy(() => import("../pages/dashboard/UserManagement/createUser/CreateUser"));
const UpdateUser = lazy(() => import("../pages/dashboard/UserManagement/updateUser/UpdateUser"));
const Onboarding = lazy(() => import("../pages/dashboard/Onboarding/Onboarding"));
const SubmitPage = lazy(() => import("../pages/dashboard/Onboarding/SubmitPage"));
const AwsServices = lazy(() => import("../pages/dashboard/AWS_Services/AwsServices"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Wrap lazy-loaded routes in Suspense */}
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<CenteredLoader />}>
            <Dashboard />
          </Suspense>
        }
      >
        <Route
          path="users"
          element={
            <Suspense fallback={<CenteredLoader />}>
              <RoleProtectedRoute allowedRoles={["ADMIN", "READ_ONLY"]}>
                <UserManagement />
              </RoleProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="users/create-user"
          element={
            <Suspense fallback={<CenteredLoader />}>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <CreateUser />
              </RoleProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="users/update-user/:id"
          element={
            <Suspense fallback={<CenteredLoader />}>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <UpdateUser />
              </RoleProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="onboarding"
          element={
            <Suspense fallback={<CenteredLoader />}>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Onboarding />
              </RoleProtectedRoute>
            </Suspense>
          }
        />
        <Route
          path="onboarding/ThankYou"
          element={
            <Suspense fallback={<CenteredLoader />}>
              <SubmitPage />
            </Suspense>
          }
        />
        <Route path="cost-explorer" element={<h1>Cost Explorer</h1>} />
        <Route path="aws-services" element={
          <Suspense fallback={<CenteredLoader />}>
            <RoleProtectedRoute allowedRoles={["ADMIN", "READ_ONLY", "CUSTOMER"]}>
              <AwsServices />
            </RoleProtectedRoute>
          </Suspense>
        } />
      </Route>

      <Route path="/*" element={<Errorpage />} />
    </Routes>
  );
};

export default AppRoutes;
