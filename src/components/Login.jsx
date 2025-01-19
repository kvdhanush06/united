import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Login Error:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Logged in with Google successfully!");
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  return (
    <div>
      <div className="container">
        {/* Left Side (Images) */}
        {/* <div className="image-container">
          <img src={controllerImage} alt="Controller" className="controller-img" />
          <img src={o_login} alt="Login" className="login-img" />
        </div> */}
        {/* Right Side (Form Container) */}
        <div className="form-container">
          <div className="form login" id="login-form">
            <h2 className="lr-heading">Login</h2>
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
                <button onClick={handleGoogleLogin} className="lr-button">
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
