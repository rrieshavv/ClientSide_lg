import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./providers/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./providers/CookieHandler";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/connect/LoginPage";
import ForgetPasswordPage from "./pages/connect/ForgetPasswordPage";

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
      component: Dashboard,
      isPrivate: true,
    },
    {
      path: '/forgot-password',
      component: ForgetPasswordPage,
      isPrivate: false
    }
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
      </Routes>
    </>
  );
}

export default App;
