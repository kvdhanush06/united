import React, { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("User registered successfully!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setSuccess("Signed in with Google successfully!");
    } catch (error) {
      setError("Google Signup Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="form-container">
        <div className="form signup" id="signup-form">
          <h2 className="lr-heading">Sign Up</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <form onSubmit={handleSignup}>
            <input
              type="email"
              autoFocus
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="lr-input"
            />
            <br />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="lr-input"
            />
            <br />
            <br />
            <div id="submit-btn-wrapper">
              <button type="submit" className="lr-button">
                Sign Up with Email
              </button>
              <button type="button" onClick={signUpWithGoogle} className="lr-button">
                Sign Up with Google
              </button>
            </div>
          </form>
          <p className="lr-changing">
            Already have an account?{" "}
            <Link to="/login" className="toggle-btn">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
