import React, { Component } from "react";
import Navbar from "../Navbar/Navbar";
import { withRouter } from "react-router-dom";
// import Swal from "sweetalert2";
import firebase from "firebase";
import { signOut } from "../../Config/SignOut";
import {roleType} from "../../Config/Constants";
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
      .child(`users/`)
      .once("value")
      .then(allUsers => {
        allUsers = allUsers.val();
        let result = [];
        for (let user in allUsers) {
          if (allUsers[user].userRole === roleType.roleStudent) {
            result = [{ ...allUsers[user] }, ...result];
          }
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
        <Navbar signOut ={signOut}/>
        <h2 className="adminHeading">All Students</h2>
        <Card allStudents={studentsData} />
      </div>
    );
  }
}

export default withRouter(AllStudents);
