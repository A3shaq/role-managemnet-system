import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase";
let db = firebase.database();

class AddStudentDetails extends Component {
  constructor() {
    super();
    this.state = {
      studExperience: "",
      skills: "",
      currentDesignation: "",
      currentSalary: "",
      expectedSalary: ""
    };
  }

  handleChange(e, key) {
    console.log("handleChange");
    this.setState({ [key]: e.target.value });
  }

  addStudentDetails = async () => {
    let {
      studExperience,
      skills,
      currentDesignation,
      currentSalary,
      expectedSalary
    } = this.state;

    if (
      studExperience === "" ||
      skills === "" ||
      currentDesignation === "" ||
      currentSalary === "" ||
      expectedSalary === ""
    ) {
      Swal.fire("Oops...", "please fill the empty fields", "error");
    } else {
      let user = firebase.auth().currentUser.uid;
      console.log("userID", user);
      let getStudentDetail = await this.getStudents(user);
      console.log("getStudentDetail", getStudentDetail);
      if (getStudentDetail === true) {
        db.ref()
          .child(`users/${user}`)
          .once(`value`)
          .then(currentUserData => {
            console.log("currentUserData.val()", currentUserData.val());
            let userData = currentUserData.val();
            let stuDetails = {
              studExperience,
              skills,
              currentDesignation,
              currentSalary,
              expectedSalary,
              uid: user,
              userName: userData.userName,
              email: userData.email
            };

            db.ref()
              .child(`students`)
              .push(stuDetails)
              .then(() => {
                Swal.fire(
                  "Success",
                  "Student Added Deteils Successfully",
                  "success"
                );
              });
            this.setState({
              studExperience: "",
              skills: "",
              currentDesignation: "",
              currentSalary: "",
              expectedSalary: ""
            });
            this.props.history.push("/students");
          });
      } else {
        Swal.fire(
          "Oops...",
          "this student details is already exist",
          "warning"
        );
      }
    }
  };

  getStudents = stuId => {
    return db
      .ref()
      .child("students/")
      .once("value")
      .then(students => {
        students = students.val();
        for (let student in students) {
          if (students[student].uid === stuId) {
            return false;
          }
        }
        return true;
      });
  };

  render() {
    console.log(this.state.studExperience);
    return (
      <div>
        <Navbar />
        <h2 className="adminHeading">Student Dashboard</h2>

        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "280px" }}>
            <input
              type="text"
              className="validate"
              //   value={this.state.studExperience}
              onChange={e => this.handleChange(e, "studExperience")}
            />
            <label htmlFor="text">Student Experience</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              //   value={this.state.skills}
              onChange={e => this.handleChange(e, "skills")}
            />
            <label htmlFor="jobDesignation">Skills</label>
          </div>
        </div>

        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              //   value={this.state.currentDesignation}
              onChange={e => this.handleChange(e, "currentDesignation")}
            />
            <label htmlFor="jobDetails">Current Designation</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col col-6 ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              //   value={this.state.currentSalary}
              onChange={e => this.handleChange(e, "currentSalary")}
            />
            <label htmlFor="Salary">Current Salary</label>
          </div>

          <div className="input-field col col-6 ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              //   value={this.state.expectedSalary}
              onChange={e => this.handleChange(e, "expectedSalary")}
            />
            <label htmlFor="Salary">Expected Salary</label>
          </div>
        </div>

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={this.addStudentDetails}
        >
          Add Student Details
        </button>
      </div>
    );
  }
}

export default withRouter(AddStudentDetails);
