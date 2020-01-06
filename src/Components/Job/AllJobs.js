import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/StudentCard";
import Swal from "sweetalert2";

let db = firebase.database();

class AllJobs extends Component {
  constructor() {
    super();
    this.state = {
      allJobs: []
    };
  }
  componentDidMount() {
    this.getJobs();
  }

  applyJobs = jobID => {
    console.log("applyJobs", jobID);
    let userID = firebase.auth().currentUser.uid;
    console.log("userID", userID);
    db.ref()
      .child(`users/${userID}`)
      .once(`value`)
      .then(user => {
        console.log("userData", user.val());
        let userData = user.val();
        let userName = userData.userName;
        db.ref()
          .child(`students/`)
          .once(`value`)
          .then(students => {
            console.log("students.val()", students.val());
            let studentData = students.val();
            console.log("studentData before if", studentData);
            let matchedStudent;
            for (let currentStudent in studentData) {
              console.log("currentStudent", currentStudent);
              if (studentData[currentStudent].uid === userData.uid) {
                console.log("if running");
                matchedStudent = studentData[currentStudent];
                let applyDetails = {
                  jobID,
                  studDetails: { ...matchedStudent }
                };

                //applied Jobs
                db.ref()
                  .child(`appliedJobs/`)
                  .once(`value`)
                  .then(applyJobs => {
                    console.log("applyJobs.val()", applyJobs.val());
                    let appliedJobs = applyJobs.val();
                    if (appliedJobs !== ``) {
                      console.log("applied jobs if");

                      for (let apply in appliedJobs) {
                        console.log(" appliedJobs[apply]", appliedJobs[apply]);
                        if (
                          appliedJobs[apply].jobID === jobID &&
                          appliedJobs[apply].studDetails.uid === userID
                        ) {
                          console.log("you already apply for this job");
                          Swal.fire(
                            "Warning",
                            "You aleardy applied for this job",
                            "warning"
                          );
                          return;
                        } else {
                          console.log("Yes you are able to apply for this job");
                          //   Swal.fire("Success", "Job Post Has been Deleted", "success");
                        }
                      }
                      //}
                      db.ref()
                        .child(`appliedJobs/`)
                        .push(applyDetails)
                        .then(() => {
                          Swal.fire(
                            "Good",
                            "You applied Successfully on this Job",
                            "success"
                          );
                        });
                      // });
                    } else {
                      console.log("applied jobs else");
                    }
                  });
              } else {
                console.log("else running when key is not match");
                Swal.fire(
                  "Warning",
                  "You don't' have students details please add your details",
                  "warning"
                );
              }
            }

            console.log("matchedStudent", matchedStudent);
          });
      });
  };

  getJobs = () => {
    db.ref()
      .child(`jobs/`)
      .once(`value`)
      .then(snapshot => {
        console.log(snapshot.val());
        let jobs = snapshot.val();
        let result = [];
        for (let job in jobs) {
          result = [{ ...jobs[job], jobID: job }, ...result];
        }
        console.log("result", result);
        this.setState({ allJobs: result });
      });
  };

  render() {
    let { allJobs } = this.state;
    console.log("allJobs", allJobs);
    return (
      <div>
        <Navbar />
        <h2>All Jobs</h2>

        <Card jobs={allJobs} applyNow={this.applyJobs} />
      </div>
    );
  }
}

export default withRouter(AllJobs);
