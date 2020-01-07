import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/AdminCard/AdminCardForAllStudents";
import Swal from "sweetalert2";
import { signOut } from "../../Config/SignOut";

let db = firebase.database();

class AdminAllStudents extends Component {
  constructor() {
    super();
    this.state = {
      allStudents: []
    };
  }

  componentDidMount() {
    this.getAllStudents();
  }

  deleteStudent = studentId => {
    console.log("deleteStudent", studentId);
    let deletedIds = this.deleteStudentDetails(studentId);
    this.deleteAppliedJobs(studentId);
    //delete student from db
    db.ref()
      .child(`users/${studentId}`)
      .remove()
      .then(() => {
        console.log("delete students from db");
        Swal.fire("Admin", " this Student has been deleted", "success");
        this.getAllStudents();
      });
    //delete student from db
  };

  //delete student from appliedJobs
  deleteAppliedJobs = studentId => {
    //pas delted ids array here
    console.log("deleteAppliedJobs", studentId);
    db.ref()
      .child(`appliedJobs/`)
      .once("value")
      .then(allAppliedJobs => {
        allAppliedJobs = allAppliedJobs.val();
        console.log("allAppliedJobs", allAppliedJobs);
        for (let applyJob in allAppliedJobs) {
          if (allAppliedJobs[applyJob].studDetails.uid === studentId) {
            db.ref()
              .child(`appliedJobs/${applyJob}`)
              .remove()
              .then(() => {
                console.log("applied jobs has been deleted");
              });
          }
        }
      });
  };
  //delete student from appliedJobs

  //  delete student info from students node
  deleteStudentDetails = studentId => {
    console.log("students ", studentId);
    db.ref()
      .child(`students/`)
      .once("value")
      .then(students => {
        students = students.val();
        console.log("students", students);
        for (let student in students) {
          if (students[student].uid === studentId) {
            db.ref()
              .child(`students/${student}`)
              .remove()
              .then(() => {
                console.log("delete student from students node");
              });
          }
        }
      });
  };
  //  delete student info from students node

  getAllStudents() {
    db.ref()
      .child(`students/`)
      .once("value")
      .then(students => {
        students = students.val();
        let result = [];
        console.log("students", students);
        // result = [{ ...students }, result];
        for (let student in students) {
          result = [{ ...students[student] }, ...result];
        }
        this.setState({ allStudents: result });
      });
  }

  render() {
    let { allStudents } = this.state;
    return (
      <div>
        <Navbar  signOut={signOut} />
        <h2 className="adminHeading">All Students</h2>
        <Card allStudents={allStudents} deleteStudent={this.deleteStudent} />
      </div>
    );
  }
}

export default AdminAllStudents;
