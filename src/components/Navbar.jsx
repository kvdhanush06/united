import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-content">
            <div className="nav-logo"><a href="/" style={{"textDecoration": "none"}}>UNITED</a></div>
            <div className="nav-links">
              <Link className="links" to="/view-tournaments">View Tournaments</Link>
              <Link className="links" to="/post">Create Tournament</Link>
              <Link className="links" to="/login">Login</Link>
              <Link className="links" to="/signup">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
