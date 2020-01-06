import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
// import Modal from '@material-ui/core/Modal';
import Swal from "sweetalert2";
import firebase from "firebase";
import { withRouter } from "react-router-dom";

class Jobs extends Component {
  constructor() {
    super();
    this.state = {
      jobTitle: "",
      jobDesignation: "",
      jobDetails: "",
      salary: ""
    };
  }

  handleChange(e, key) {
    console.log(e.target.value);
    this.setState({ [key]: e.target.value });
  }

  postJob = () => {
    console.log("postJob");
    let { jobTitle, jobDesignation, jobDetails, salary } = this.state;
    let userID = firebase.auth().currentUser.uid;
    console.log(userID);

    if (
      jobTitle === "" ||
      jobDesignation === "" ||
      jobDetails === "" ||
      salary === ""
    ) {
      Swal.fire("Oops...", "please fill the empty fields", "error");
    } else {
      firebase
        .database()
        .ref()
        .child(`users/${userID}`)
        .once("value")
        .then(currentUser => {
          currentUser = currentUser.val();
          console.log("currentUser", currentUser);
          // console.log("jobTitle", jobTitle);
          let jobData = {
            title: jobTitle,
            designation: jobDesignation,
            details: jobDetails,
            salary,
            uid: userID,
            userName: currentUser.userName
          };

          firebase
            .database()
            .ref()
            .child(`jobs`)
            .push(jobData)
            .then(() => {
              Swal.fire("Success", "Job Posted Successfully", "success");

              this.setState({
                jobTitle: "",
                jobDesignation: "",
                jobDetails: "",
                salary: ""
              });
              this.props.history.push("/company");
            });
        });
    }
  };

  render() {
    return (
      <div>
        <Navbar />

        <h2 className="adminHeading">Post a Job</h2>
        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "280px" }}>
            <input
              type="text"
              className="validate"
              // placeholder="Job Tile"
              value={this.state.jobTitle}
              onChange={e => this.handleChange(e, "jobTitle")}
            />
            <label htmlFor="text">Job Title</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.jobDesignation}
              // placeholder="Job Designation"
              onChange={e => this.handleChange(e, "jobDesignation")}
            />
            <label htmlFor="jobDesignation">Job Designation</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.jobDetails}
              onChange={e => this.handleChange(e, "jobDetails")}
            />
            <label htmlFor="jobDetails">Job Details</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.salary}
              // placeholder="Job Designation"
              onChange={e => this.handleChange(e, "salary")}
            />
            <label htmlFor="Salary">Salary</label>
          </div>
        </div>

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={this.postJob}
        >
          Post Job
          <i className="material-icons right"></i>
        </button>
      </div>
    );
  }
}

export default withRouter(Jobs);
