import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Modal from '@material-ui/core/Modal';
import { Link as Routerlink, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { signOut } from "../../Config/SignOut";
import { roleType } from "../../Config/Constants";

// else if (user.userRole === roleType.roleCompany) {
//   this.props.history.push("/jobs");
//   return;
// }
// else if (user.userRole === roleType.roleCompany) {
//   this.props.history.push("/myjobs");
//   return;
// }
// else if (user.userRole === roleType.roleCompany) {
//   this.props.history.push("/allstudents");
//   return;
// }
// else {

// }

class CompanyProfile extends Component {
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleCompany) {
        this.props.history.push("/company");
      } else {
        if (user.userRole === roleType.roleStudent) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/students");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
      }
    }
  }

  jobsPage = () => {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleCompany) {
        // return <Redirect to="/jobs" />;
        this.props.history.push("/jobs");
        return;
      } else {
        // return <Redirect to="/company" />
        if (user.userRole === roleType.roleStudent) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/students");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
        this.props.history.push("/company");

        return;
      }
    }
  };
  myJobsPage = () => {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleCompany) {
        // return <Redirect to="/myjobs" />;
        this.props.history.push("/myjobs");
        return;
      } else {
        // return <Redirect to="/company" />
        if (user.userRole === roleType.roleStudent) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/students");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
        this.props.history.push("/company");
        return;
      }
    }
  };
  allStudents = () => {
    let user = JSON.parse(localStorage.getItem("userID"));
    if (user && user.userRole) {
      if (user.userRole === roleType.roleCompany) {
        // return <Redirect to="/allstudents" />;
        this.props.history.push("/allstudents");
        return;
      } else {
        // return <Redirect to="/company" />
        if (user.userRole === roleType.roleStudent) {
          // return <Redirect to="/jobs" />;
          this.props.history.push("/students");
          return;
        } else if (user.userRole === roleType.roleAdmin) {
          this.props.history.push("/admin");
          return;
        }
        this.props.history.push("/company");
        return;
      }
    }
    // this.props.history.push("/allstudents")
  };
  render() {
    return (
      <div>
        {/* {this.renderPostJobs()} */}
        <Navbar signOut={signOut} />
        <h2 className="adminHeading">Company Dashboard</h2>

        <div className="row">
          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.jobsPage}
            >
              Job Post
              <i className="material-icons right"></i>
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.myJobsPage}
            >
              My JObs
              <i className="material-icons right"></i>
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
              onClick={this.allStudents}
            >
              All Students
              <i className="material-icons right"></i>
            </button>

           
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CompanyProfile);
