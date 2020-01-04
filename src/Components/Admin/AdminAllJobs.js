import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/AdminCard/AdminCardForAllCompanies";
import Swal from "sweetalert2";

let db = firebase.database();

class AdminAllJobs extends Component {
  constructor() {
    super();
    this.state = {
      allJobs: []
    };
  }

  render() {
    return (
      <div>
        <Navbar />
        <h2 className="adminHeading">All Jobs</h2>
      </div>
    );
  }
}

export default AdminAllJobs;
