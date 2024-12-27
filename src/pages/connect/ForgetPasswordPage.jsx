import { useState } from "react";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { forgetPasswordService } from "../../services/authService";

const ForgetPasswordPage = () => {
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Reset Password");

  const handleSubmit = async (e) => {
    setLoading("Processing ...");
    e.preventDefault();

    if (username.trim().length === 0) {
      setError("Username is required.");
      setLoading("Reset Password")
      return;
    }

    try {
      const response = await forgetPasswordService(username);

      if (response.code === 0) {
        setSuccess(true);
      } else {
        setError(response.message);
      }
    } catch {
      setError("Error occured while processing your request.");
    }

    setLoading("Reset Password")
  };

  return (
    <div className="bg-custom-gradient w-full h-screen flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="p-6 sm:p-8 rounded w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {/* logo section  */}
          <div className="mb-5 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          {success ? (
            <div className="bg-white p-6 sm:p-8 rounded w-full h-auto">
              <div className="text-center text-sm font-semibold text-green-600">
                <p>Password reset link sent to your email.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 sm:p-8 rounded w-full h-auto min-h-[250px]">
              <div className="text-center text-xl font-semibold mb-5">
                <h3>Forgot your password?</h3>
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
                <small className="text-red-400 font-semibold " id="error-msg">
                  {error}
                </small>
              </div>
              <button
                id="submit-btn"
                type="submit"
                className="mt-3 w-full text-center bg-hrOrange outline-none text-white h-[35px] rounded text-xs"
              >
                {loading}
              </button>
              <div className=" mt-3 flex justify-end">
                <Link
                  className=" text-xs font-semibold text-blue-500 hover:underline"
                  to="/login"
                >
                  Go to login
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
