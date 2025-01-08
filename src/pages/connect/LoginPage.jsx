import { useState } from "react";
import logo from "../../assets/Logo.png";
import { loginService } from "../../services/authService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../providers/CookieHandler";

const LoginPage = () => {
  const Navigate = useNavigate();

  const [username, setUsername] = useState("sa");
  const [password, setPassword] = useState("Ktmnepal@1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Sign In");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("Processing");

    if (username.trim().length === 0 || password.trim().length === 0) {
      setError("Username and password are required.");
      setLoading("Sign In");
      return;
    }

    if (password.length < 8) {
      setError("Password must be 8 characters long.");
      setLoading("Sign In");
      return;
    }

    try {
      const response = await loginService(username, password);
      if (response.code === 0) {
        setToken(response.data.token, response.data.sessionId, response.data.navMenu);
        toast.success("Logged in successfully.");
        Navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch {
      setError("An error occured while processing your request.");
    }

    setLoading("Login");
  };

  return (
    <div className="bg-custom-gradient w-full h-screen flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="p-6 sm:p-8 rounded w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* logo section  */}
          <div className="mb-5 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>
          {/* Content Section  */}
          <div className="bg-white p-6 sm:p-8 rounded w-full h-auto min-h-[300px]">
            <div className="text-center text-xl font-semibold mb-5">
              <h3>Sign In to HrLog</h3>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-hrGray">
                  Username
                </label>
                <input
                  className="border border-gray-300 rounded h-[42px] ps-3 outline-none text-xs"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-hrGray">
                  Password
                </label>
                <input
                  className="border border-gray-300 rounded h-[42px] ps-3 outline-none text-xs"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <small className="text-red-400 font-semibold " id="error-msg">
                {error}
              </small>
            </div>
            <button
              id="submit-btn"
              type="submit"
              className="mt-5 w-full text-center bg-hrOrange outline-none text-white h-[35px] rounded text-xs"
            >
              {loading}
            </button>
            <div className=" mt-3 flex justify-end">
              <Link
                className=" text-xs font-semibold text-blue-500 hover:underline"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
