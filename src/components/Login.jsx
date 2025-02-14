import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");
  const { error: authError, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();

  // Clear auth errors when component unmounts or when local state changes
  useEffect(() => {
    return () => clearError();
  }, [email, password, clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccess("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess("Logged in successfully!");
    } catch (error) {
      setLocalError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalError("");
    setSuccess("");

    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess("Logged in with Google successfully!");
    } catch (error) {
      setLocalError(error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="form-container">
          <div className="form login" id="login-form">
            <h2 className="lr-heading">Login</h2>
            {(localError || authError) && (
              <p style={{ color: "red" }}>
                {localError || authError?.message}
              </p>
            )}
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
