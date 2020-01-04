import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import { Link as Routerlink, Redirect } from "react-router-dom";
import firebase from "../../Config/firebase";

var roleType = {
  roleStudent: 10,
  roleCompany: 20,
  roleAdmin: 30
};

class Login extends Component {
  state = {
    signup: false,
    userName: "",
    email: "",
    password: "",
    loc: "/"
  };

  showSignup = () => {
    this.setState({ signup: true });
  };

  handleChange(e, key) {
    console.log("handletextChnageeeeeeeeee", key);
    this.setState({
      [key]: e.target.value
    });
  }

  onSubmit = () => {
    const { email, password } = this.state;

    if (email === "" || password === null) {
      Swal.fire("Oops...", "please fill the empty fields", "error");
    } else {
      let userId = "";
      firebase.signInWithFirebase(email, password, userObj => {
        // console.log(userObj.uid);
        // userId = id;
        // console.log("userId", userId);

        if (userObj) {
          console.log("if userObj,uid");
          localStorage.setItem("userID", userObj.uid);
          let userNewObj = Number(userObj.userRole);
          switch (userNewObj) {
            case roleType.roleStudent: {
              Swal.fire("Success", "Succesfully Login as student", "success");
              this.props.history.push("/students");
              break;
            }
            case roleType.roleCompany: {
              console.log(" roleType.roleStudent");
              Swal.fire("Success", "Succesfully Login as Company", "success");

              this.props.history.push("/company");
              break;
            }
            case roleType.roleAdmin: {
              Swal.fire("Success", "Succesfully Login as student", "success");
              this.props.history.push("/admin");
              break;
            }
            default: {
              console.log("default");
            }
          }
        } else {
          Swal.fire("Oops...", "Please signup first", "error");
        }
      });
      console.log(userId);
    }
  };

  renderLogin = () => {
    return (
      <div className="">
        <Navbar />
        <form
          className="col s12 ml-4"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onSubmit={e => {
            e.preventDefault();
            this.onSubmit();
          }}
        >
          <h2 className="adminHeading">Login</h2>
          <div className="row">
            <div className="input-field col  ml-3" style={{ width: "280px" }}>
              <input
                id="email"
                type="email"
                className="validate"
                // placeholder="Enter Email"
                value={this.state.email}
                onChange={e => this.handleChange(e, "email")}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col  ml-3" style={{ width: "280px" }}>
              <input
                id="password"
                type="password"
                className="validate"
                value={this.state.password}
                // placeholder="Enter Password"
                onChange={e => this.handleChange(e, "password")}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
            onClick={this.onSubmit}
          >
            Submit
            <i className="material-icons right"></i>
          </button>
          <p id="signupText">
            don't have an account?{" "}
            <Routerlink to="/register">Go to Register</Routerlink>
          </p>
        </form>
      </div>
    );
  };

  render() {
    console.log(this.state);

    return (
      <div>
        {this.renderLogin()}
        <Redirect to={this.state.loc} />
      </div>
    );
  }
}

export default Login;
