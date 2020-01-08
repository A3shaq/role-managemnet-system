import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { signOut } from "../../Config/SignOut";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/CompanyCard";
import Swal from "sweetalert2";

let db = firebase.database();

class Myjobs extends Component {
  constructor() {
    super();
    this.state = {
      getJobsData: []
    };
  }
  componentDidMount() {
    this.getMyJobs();
  }

  deleteJobs = jobID => {
    console.log("this", jobID);
    db.ref()
      .child(`jobs/${jobID}`)
      .remove()
      .then(() => {
        Swal.fire("Company", "Job Post Has been Deleted", "success");
      });
    this.deleteAppliedjobs(jobID);

    this.getMyJobs();
  };

  deleteAppliedjobs = jobID => {
    console.log("deleteAppliedjobs", jobID);
    db.ref()
      .child(`appliedJobs/`)
      .once("value")
      .then(appliedJobs => {
        appliedJobs = appliedJobs.val();
        console.log("appliedJobs", appliedJobs);
        for (let apply in appliedJobs) {
          if (appliedJobs[apply].jobID === jobID) {
            console.log("deletd job from applied node");
            db.ref()
              .child(`appliedJobs/${apply}`)
              .remove()
              .then(() => {
                console.log("`appliedJobs/${apply}`");
              });
          } else {
            console.log("No user applied on this job");
          }
        }
      });
  };

  getMyJobs = () => {
    // let user = firebase.auth().currentUser
    // let user = localStorage.getItem("userID")

    this.getCurrentUser().then(currentUser => {
      console.log("userId", currentUser);
      db.ref()
        .child(`jobs/`)
        .once("value")
        .then(async jobs => {
          let allJobs = jobs.val();
          console.log("all jobs", allJobs);
          let allJobsAndAppliedStudentDetails = [];
          for (let job in allJobs) {
            //this.getAppliedJobs(job);
            let appliedjobs = await this.getAppliedJobs(job);
            console.log("appliedjobs studDetails ", appliedjobs);
            if (allJobs[job].uid === currentUser) {
              allJobsAndAppliedStudentDetails = [
                { ...allJobs[job], appliedjobs, jobID: job },
                ...allJobsAndAppliedStudentDetails
              ];
            }
          }
          this.setState({ getJobsData: allJobsAndAppliedStudentDetails });
        });
    });
  };

  getAppliedJobs = jobId => {
    console.log("getAppliedJobs", jobId);

    return db
      .ref()
      .child("appliedJobs/")
      .once("value")
      .then(allAppliedJobs => {
        allAppliedJobs = allAppliedJobs.val();
        let applliedJobs = [];
        for (let applyJob in allAppliedJobs) {
          if (allAppliedJobs[applyJob].jobID === jobId) {
            applliedJobs = [
              { ...allAppliedJobs[applyJob].studDetails },
              ...applliedJobs
            ];
          }
        }
        return applliedJobs;
      });
  };

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          resolve(user.uid);
        } else {
          reject("not logged in!");
        }
      });
    });
  }

  render() {
    let { getJobsData } = this.state;
    console.log("getJobsData", getJobsData);
    return (
      <div>
        <Navbar signOut={signOut} />
        <h2>My jObs</h2>
        <Card jobData={getJobsData} delete={this.deleteJobs} />
      </div>
    );
  }
}

export default withRouter(Myjobs);
