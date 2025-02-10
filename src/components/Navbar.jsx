import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
    <nav className="navbar">
        <div className="nav-left">
          <Link to="/"><span>UNI</span>TED</Link>
        </div>
        <div className="nav-right">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
    </nav>
    )
}