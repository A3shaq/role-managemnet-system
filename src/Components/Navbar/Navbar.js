import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav>
        <div
          className="nav-wrapper"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <a href="/" className="brand-logo">
           Role Management System
          </a>
        </div>
      </nav>
    );
  }
}

export default Navbar;
