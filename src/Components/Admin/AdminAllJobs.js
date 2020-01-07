import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/AdminCard/AdminCardForAllJobs";
import Swal from "sweetalert2";
import { signOut } from "../../Config/SignOut";


let db = firebase.database();

class AdminAllJobs extends Component {
  constructor() {
    super();
    this.state = {
      allJobs: []
    };
  }

  componentDidMount() {
    this.getAllJobs();
  }

  deleteJobs = jobId => {
    console.log("deleteJobs", jobId);
    db.ref()
      .child(`jobs/${jobId}`)
      .remove()
      .then(() => {
        console.log("this job has been deleted");
        Swal.fire("Admin", " this Job has been deleted", "success");
      });

    this.deleteAppliedJobs(jobId);
  };

  deleteAppliedJobs = jobId => {
    console.log("deleteAppliedJobs", jobId);
    db.ref()
      .child(`appliedJobs/`)
      .once("value")
      .then(appliedJobs => {
        appliedJobs = appliedJobs.val();
        console.log("appliedJobs", appliedJobs);
        for (let applyJob in appliedJobs) {
          if (appliedJobs[applyJob].jobID === jobId) {
            console.log("inside if of appliedJobs ");
            db.ref()
              .child(`appliedJobs/${applyJob}`)
              .remove()
              .then(() => {
                console.log("this job has been deleted from applied job");
              });
          }
        }
      });
  };

  getAllJobs() {
    console.log("getAllJobs");
    db.ref()
      .child(`jobs/`)
      .once("value")
      .then(jobs => {
        jobs = jobs.val();
        let jobsResult = [];
        console.log("jobs", jobs);
        for (let job in jobs) {
          jobsResult = [{ ...jobs[job], jobId: job }, ...jobsResult];
        }
        console.log("jobsResult", jobsResult);
        this.setState({ allJobs: jobsResult });
      });
  }

  render() {
    let { allJobs } = this.state;
    return (
      <div>
        <Navbar signOut={signOut}/>
        <h2 className="adminHeading">All Jobs</h2>
        <Card jobs={allJobs} deleteJobs={this.deleteJobs} />
      </div>
    );
  }
}

export default AdminAllJobs;
