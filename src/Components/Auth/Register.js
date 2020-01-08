import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Select from "react-select";
import firebase from "../../Config/firebase";
import { Link as RouterLink, Redirect } from "react-router-dom";
import Swal from "sweetalert2";

const options = [
  { value: 10, label: "student" },
  { value: 20, label: "company" }
];

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userEmail: "",
      userPassword: "",
      selectedRole: 0,
      loc: "/register"
    };
  }

  handleChangeSelect = selectedRole => {
    this.setState({ selectedRole });
    console.log(`Option selected:`, selectedRole);
  };

  handleChange(e, key) {
    // console.log("handletextChnageeeeeeeeee", key);
    this.setState({
      [key]: e.target.value
    });
  }

  signUp = () => {
    const { userName, userEmail, userPassword, selectedRole } = this.state;
    console.log(selectedRole.value);
    let role = selectedRole.value;

    if (
      userName === "" ||
      userEmail === "" ||
      userPassword === "" ||
      role === 0  
    ) {
      Swal.fire("Oops...", "please fill the empty fields", "error");
      this.props.history.push('/register')
    } else {
      console.log("signUp else");

      firebase.signUpWithFirebase(userName, userEmail, userPassword, role);
      console.log("success");
      Swal.fire("Success", "Succesfully Registered", "success");
      // this.setState({ loc: "/" });
      this.props.history.push('/')
    }
  };

  renderRegister() {
    let { userName, userEmail, userPassword, selectedRole } = this.state;
    console.log(userEmail);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column"
        }}
      >
        <Navbar />
        <h2 className="adminHeading">SignUp</h2>
        <div id="line"></div>

        <div className="form-group" style={{ marginTop: "30px" }}>
          <input
            type="text"
            className="form-control "
            placeholder="User name"
            style={{ width: "280px" }}
            value={userName}
            onChange={e => this.handleChange(e, "userName")}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control inputLogin"
            placeholder="Enter email"
            style={{ width: "280px" }}
            value={userEmail}
            onChange={e => {
              this.handleChange(e, "userEmail");
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control inputLogin"
            placeholder="Password"
            style={{ width: "280px" }}
            value={userPassword}
            onChange={e => {
              this.handleChange(e, "userPassword");
            }}
          />
        </div>
        
        <div style={{ width: "21%" }}>
          <Select
            // className="form-control inputLogin"
            placeholder="user Role"
            style={{ width: "480px" }}
            value={selectedRole}
            onChange={this.handleChangeSelect}
            options={options}
          />
        </div>
    
       

        <div className="loginBtn " style={{ marginTop: "30px" }}>
          <button type="submit" className="btn" onClick={() => this.signUp()}>
            Signup
          </button>
          <br /> <RouterLink to="/">Go to Login</RouterLink>
        </div>
        <Redirect to={this.state.loc} />
      </div>
    );
  }

  render() {
    console.log(this.state.selectedRole);
   
    return (
      <div>
        {this.renderRegister()}
        <Redirect to={this.state.loc} />
      </div>
    );
  }
}

export default Register;
