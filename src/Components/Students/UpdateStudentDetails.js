import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import Swal from "sweetalert2";
import firebase from "firebase";
import { signOut } from "../../Config/SignOut";

let db = firebase.database();

class UpdateStudentDetails extends Component {
  constructor() {
    super();
    this.state = {
      studExperience: "",
      skills: "",
      currentDesignation: "",
      currentSalary: "",
      expectedSalary: "",
      btnFlag: false
    };
  }

  componentDidMount() {
    this.fetchStudents();
  }
  handleChange(e, key) {
    console.log("handleChange");
    this.setState({ [key]: e.target.value });
  }
  fetchStudents = () => {
    // let stuId = firebase.auth().currentUser.uid;
    let stuId = JSON.parse(localStorage.getItem("userID")) ;
    stuId =stuId.uid
    console.log("stuId",stuId,)
    this.getStudentsForUpdate(stuId).then(stuDetails => {
      console.log("stuDetails", stuDetails);
      this.setState({
        studExperience: stuDetails.studExperience,
        skills: stuDetails.skills,
        currentDesignation: stuDetails.currentDesignation,
        currentSalary: stuDetails.currentSalary,
        expectedSalary: stuDetails.expectedSalary
      });
    });
  };

  UpdateStudentDetails = async () => {
    let stuId = firebase.auth().currentUser.uid;
    console.log("userID", stuId);
    let stuDetails = await this.getStudentsForUpdate(stuId);
    if (stuDetails !== false) {
      console.log("able to update");

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
        db.ref()
          .child(`users/${user}`)
          .once(`value`)
          .then(currentUserData => {
            console.log("currentUserData.val()", currentUserData.val());
            let userData = currentUserData.val();
            let stuInfo = {
              studExperience,
              skills,
              currentDesignation,
              currentSalary,
              expectedSalary,
              uid: user,
              userName: userData.userName,
              email: userData.email
            };
            console.log("stuInfo", stuInfo);
            console.log(stuDetails);
            db.ref()
              .child(`students/${stuDetails.student}`)
              .update(stuInfo)
              .then(() => {
                Swal.fire(
                  "Success",
                  "Student Details updated Successfully",
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
      }
    } else {
      Swal.fire(
        "Student",
        "You didn't fill your details please fill it",
        "warning"
      );
    }
  };

  getStudentsForUpdate = stuId => {
    return db
      .ref()
      .child("students/")
      .once("value")
      .then(students => {
        students = students.val();
        let stuDetails;
        for (let student in students) {
          if (students[student].uid === stuId) {
            stuDetails = { ...students[student], student };
            console.log("...st", student);
            // return false;
            return stuDetails;
          }
        }
        // return stuDetails;
      });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar signOut ={signOut} />
        <h2 className="adminHeading">Student Dashboard</h2>

        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "280px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.studExperience}
              onChange={e => this.handleChange(e, "studExperience")}
              placeholder="Student Experience"
            />
            {/* <label htmlFor="text">Student Experience</label> */}
          </div>
        </div>
        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.skills}
              onChange={e => this.handleChange(e, "skills")}
              placeholder="Skills"
            />
            {/* <label htmlFor="jobDesignation">Skills</label> */}
          </div>
        </div>

        <div className="row">
          <div className="input-field col  ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.currentDesignation}
              onChange={e => this.handleChange(e, "currentDesignation")}
              placeholder="Current Designation"
            />
            {/* <label htmlFor="jobDetails">Current Designation</label> */}
          </div>
        </div>
        <div className="row">
          <div className="input-field col col-6 ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.currentSalary}
              onChange={e => this.handleChange(e, "currentSalary")}
              placeholder="Current Salary"
            />
            {/* <label htmlFor="Salary">Current Salary</label> */}
          </div>

          <div className="input-field col col-6 ml-3" style={{ width: "80px" }}>
            <input
              type="text"
              className="validate"
              value={this.state.expectedSalary}
              onChange={e => this.handleChange(e, "expectedSalary")}
              placeholder="Expected Salary"
            />
            {/* <label htmlFor="Salary">Expected Salary</label> */}
          </div>
        </div>

        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={this.UpdateStudentDetails}
        >
          Update Student Details
        </button>
      </div>
    );
  }
}

export default UpdateStudentDetails;
