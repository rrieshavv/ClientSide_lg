import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./providers/ProtectedRoute";
import { getToken } from "./providers/CookieHandler";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/connect/LoginPage";
import ForgetPasswordPage from "./pages/connect/ForgetPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import UserManagementPage from "./pages/user/UserManagementPage";
import CreateUser from "./pages/user/CreateUser";
import DepartmentPage from "./pages/organization/department/DepartmentPage";
import StaffDashboardPage from "./pages/staff/StaffDashboardPage";
import StaffOnboardPage from "./pages/staff/StaffOnboardPage";
import StaffProfilePage from "./pages/staff/StaffProfilePage";
import ShiftPage from "./pages/organization/shift/ShiftPage";
import ShiftDetailPage from "./pages/organization/shift/ShiftDetailPage";
import ShiftCreatePage from "./pages/organization/shift/ShiftCreatePage";
import ShiftEditPage from "./pages/organization/shift/ShiftEditPage";

function App() {
  const isAuthenticated = !!getToken();

  const routes = [
    {
      path: "/login",
      component: LoginPage,
      isPrivate: false,
    },
    {
      path: "/dashboard",
      component: DashboardPage,
      isPrivate: true,
    },
    
    {
      path: "/forgot-password",
      component: ForgetPasswordPage,
      isPrivate: false,
    },
  ];

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
        />
        {routes.map(({ path, component: Component, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? (
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              ) : (
                <Component />
              )
            }
          />
        ))}

        {/* Nested routes for the dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="user/dashboard" element={<UserManagementPage/>} />
          <Route path="user/create" element={<CreateUser/>}/>
          {/* organization */}
          <Route path="organization/department" element={<DepartmentPage/>}/>
          <Route path="organization/shift" element={<ShiftPage/>}/>
          <Route path="organization/shift/details" element={<ShiftDetailPage/>}/>
          <Route path="organization/shift/create" element={<ShiftCreatePage/>}/>
          <Route path="organization/shift/edit" element={<ShiftEditPage/>}/>
          {/* staff */}
          <Route path="staff/dashboard" element={<StaffDashboardPage/>}/>
          <Route path="staff/onboard" element={<StaffOnboardPage/>}/>
          <Route path="staff/profile" element={<StaffProfilePage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
