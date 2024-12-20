import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./providers/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { getToken } from "./providers/CookieHandler";
import { ToastContainer } from "react-toastify";

function App() {
  const isAuthenticated = !!getToken();

  const routes = [
    {
      path: "/login",
      component: Login,
      isPrivate: false,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      isPrivate: true,
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
      </Routes>
    </>
  );
}

export default App;
