import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
// import Swal from "sweetalert2";
import firebase from "firebase";
import Card from "../Card/AllStudentPlatFormCard";

let db = firebase.database();

class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      studentsData: []
    };
  }

  componentDidMount() {
    this.getAllStudents();
  }

  getAllStudents = () => {
    db.ref()
      .child(`students/`)
      .once(`value`)
      .then(students => {
        console.log("students", students.val());
        let stuData = students.val();
        let result = [];
        for (let Student in stuData) {
          result = [...result, { ...stuData[Student] }];
        }
        this.setState({
          studentsData: result
        });
      });
  };

  render() {
    let { studentsData } = this.state;
    console.log("studentsData", studentsData);
    return (
      <div>
        <Navbar />
        <h2 className="adminHeading">All Students</h2>
        <Card allStudents={studentsData} />
      </div>
    );
  }
}

export default withRouter(AllStudents);
