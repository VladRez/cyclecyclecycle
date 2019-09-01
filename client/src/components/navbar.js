import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <div className="navbar">
          <Link to="/" className="navbar__logo">
            CycleCycleCycle
          </Link>
          <div className="nav-group">
            <div className="dropdown">
              <div className="nav-item nav-profile dropbtn">UserIcon</div>
              <div className="dropdown-content">
                <a>Log Out</a>
              </div>
            </div>
            <div className="dropdown">
              <div className="nav-item nav-profile dropbtn">PlusIcon</div>
              <div className="dropdown-content">
                <Link to="/routes/new">Create a route</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
