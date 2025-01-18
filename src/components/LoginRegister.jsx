import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import controllerImage from "./controller.png";
import o_login from "./o_login.png";
import "./login_register.css"

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  return (
    <div>
    <div className="container">
      {/* Left Side (Images) */}
      <div className="image-container">
        <img src={controllerImage} alt="Controller" className="controller-img" />
        <img src={o_login} alt="Login" className="login-img" />
      </div>

      {/* Right Side (Form Container) */}
      <div className="form-container">
        {isLogin ? (
          // Login Form
          <div className="form login" id="login-form">
            <h2 className="lr-heading">Login</h2>
            <form onSubmit={handleLogin}>

              <br />
              <br />
              <input
                type="email"
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
              <button type="submit" className="lr-button">
                Login
              </button>
            </form>
            <p className="lr-changing">
              Don't have an account?{" "}
              <button className="toggle-btn" onClick={toggleForm}>
                Register
              </button>
            </p>
          </div>
        ) : (
          // Register Form
          <div className="form register" id="register-form">
            <h2 className="lr-heading">Register</h2>
            <form onSubmit={handleRegister}>

              <br />
              <br />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <br />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <br />
              <br />
              <button type="submit" className="lr-button">
                Register
              </button>
            </form>
            <p className="lr-changing">
              Already have an account?{" "}
              <button className="toggle-btn" onClick={toggleForm}>
                Login
              </button>
            </p>
          </div>
        )}
      </div>
      </div>
      </div>
  );
};

export default LoginRegister;
