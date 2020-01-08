import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Modal from '@material-ui/core/Modal';
import { withRouter } from "react-router-dom";
// import firebase from "../../Config/firebase";
import { signOut } from "../../Config/SignOut";
import { roleType } from "../../Config/Constants";

class StudentProfile extends Component {

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleAdmin) {
        this.props.history.push("/admin");
      } else {
        if (user.userRole === roleType.roleCompany) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/company");
          return;
        } else if (user.userRole === roleType.roleStudent) {
          this.props.history.push("/students");
          return;
        }
      }
    }
  }













  addDetails = () => {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleStudent) {
        // return <Redirect to="/jobs" />;
        this.props.history.push("/addstudent/details");
        return;
      } else {
        // return <Redirect to="/company" />
        if (user.userRole === roleType.roleCompany) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/company");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
        this.props.history.push("/students");
        return;
      }
    }

    // this.props.history.push("/addstudent/details");
  };
  allJobs = () => {
    console.log("allJobs");

    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleStudent) {
        // return <Redirect to="/jobs" />;
        this.props.history.push("/alljobs");
        return;
      } else {
        // return <Redirect to="/company" />
        if (user.userRole === roleType.roleCompany) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/company");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
        this.props.history.push("/students");
        return;
      }
    }
    // this.props.history.push("/alljobs");
  };
  studentProfile = () => {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleStudent) {
        // return <Redirect to="/jobs" />;
        this.props.history.push("/updatestudent/details");
        return;
      } else {
        // return <Redirect to="/company" />
        // this.props.history.push("/students");
        if (user.userRole === roleType.roleCompany) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/company");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
        this.props.history.push("/students");
        return;
      }
    }

    // this.props.history.push("/updatestudent/details");
  };

  //
  render() {
    return (
      <div>
        {/* {this.renderPostJobs()} */}
        <Navbar signOut={signOut} />
        <h2 className="adminHeading">Student Dashboard</h2>

        <div className="row">
          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.addDetails}
            >
              Add Details
              <i className="material-icons right"></i>
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.studentProfile}
            >
              Update Profile
              <i className="material-icons right"></i>
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.allJobs}
            >
              Jobs
              <i className="material-icons right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StudentProfile);
