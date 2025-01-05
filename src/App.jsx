import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./providers/ProtectedRoute";
import { getToken } from "./providers/CookieHandler";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/connect/LoginPage";
import ForgetPasswordPage from "./pages/connect/ForgetPasswordPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ProfilePage from "./pages/dashboard/ProfilePage";
import UserManagementPage from "./pages/dashboard/UserManagementPage";

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
      {/* <Routes>
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
      </Routes> */}
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
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<ProfilePage/>} />
          <Route path="user" element={<UserManagementPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
