import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Logged in successfully!");
    } catch (error) {
      setError("Login Error: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess("Logged in with Google successfully!");
    } catch (error) {
      setError("Google Login Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="form-container">
          <div className="form login" id="login-form">
            <h2 className="lr-heading">Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
            <form onSubmit={handleLogin}>
              <input
                type="email"
                autoFocus
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <br />
              <div id="login-btn-wrapper">
                <button type="submit" className="lr-button">
                  Login with Email
                </button>
                <button type="button" onClick={handleGoogleLogin} className="lr-button">
                  Login with Google
                </button>
              </div>
            </form>
            <p className="lr-changing">
              Don't have an account?{" "}
              <Link to="/signup" className="toggle-btn">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
