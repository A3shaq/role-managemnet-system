import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Modal from '@material-ui/core/Modal';
import { withRouter } from "react-router-dom";
// import firebase from "../../Config/firebase";
import { signOut } from "../../Config/SignOut";
class StudentProfile extends Component {
  addDetails = () => {
    this.props.history.push("/addstudent/details");
  };
  allJobs = () => {
    console.log("allJobs");
    this.props.history.push("/alljobs");
  };
  studentProfile = () => {
    this.props.history.push("/updatestudent/details");
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
