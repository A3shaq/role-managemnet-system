import React, { Component } from "react";

class Navbar extends Component {
  // logOut() {
  //  // let userID = localStorage.getItem("userID");

  // }

  render() {
    console.log("Nav props", this.props);
    return (
      <nav>
        <div
          className="nav-wrapper"
          style={{ display: "", justifyContent: "center" }}
        >
          <a href="/" className="brand-logo" >
            Role Management System
          </a>
          {this.props.signOut ? (
            <button
              onClick={this.props.signOut}
              className="btn waves-effect waves-light"
              style={{ float: "right",marginTop: "14px" }}
            >
              logOut
              <i className="material-icons right"></i>
            </button>
          ) : null}
        </div>
      </nav>
    );
  }
}

export default Navbar;
