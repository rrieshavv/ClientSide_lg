import { useState } from "react";
import { setToken } from "../providers/CookieHandler";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "pass") {
      setToken("tokenishere", username);
      console.log("cookies set");
      toast.success("Logged in successfully");
      setRedirect(true); // Trigger redirect
    } else {
      toast.error("Invalid credentials");
    }

    setPassword(""); // Clear password field
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="password"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
