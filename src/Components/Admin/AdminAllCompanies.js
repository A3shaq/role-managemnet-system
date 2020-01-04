import React, { Component } from "react";
// import { withRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/AdminCard/AdminCardForAllCompanies";
import Swal from "sweetalert2";
import { roleType } from "../../Config/Constants";

let db = firebase.database();

class AdminAllCompanies extends Component {
  constructor() {
    super();
    this.state = {
      allCompanies: []
    };
  }

  componentDidMount() {
    this.getAllCompanies();
  }

  deleteCompany = uid => {
    console.log("deleteCompanyID", uid);
    // db.ref()

    db.ref()
      .child(`appliedJobs/`)
      .once("value")
      .then(allApplliedJobs => {
        allApplliedJobs = allApplliedJobs.val();
        console.log("allAppliedJobs", allApplliedJobs);
        let applyArray = [];
        for (let currentApplyJob in allApplliedJobs) {
          if (allApplliedJobs[currentApplyJob].studDetails.uid === uid) {
            applyArray = [
              ...applyArray,
              { ...allApplliedJobs[currentApplyJob] }
            ];
            db.ref()
              .child(
                `appliedJobs/${allApplliedJobs[currentApplyJob].studDetails.uid}`
              )
              .remove().then(()=>{

                db.ref()
                .child(`jobs/`)
                .once("value")
                .then(allJobs => {
                  allJobs = allJobs.val();
                  console.log("allJobs", allJobs);
                  for (let currentJob in allJobs) {
                    if (allJobs[currentJob].uid === uid) {
                      console.log("yes jobs has been deleted");
                      db.ref()
                        .child(`jobs/${uid}`)
                        .remove();
                    }
                  }
                });
      

              })
          } else {
            console.log("there is no Job of this user");
          }
        }

        console.log("applyArray", applyArray);

      
        db.ref()
          .child(`users/${uid}`)
          .remove()
          .then(() => {
            console.log("this user/Compnay has been deleted");
          });
      });
  };

  getAllCompanies() {
    db.ref()
      .child(`users/`)
      .once("value")
      .then(allUsers => {
        console.log("allUsers.val()", allUsers.val());
        allUsers = allUsers.val();
        console.log("roleType.roleCompany", roleType.roleCompany);
        let companies = [];
        for (let user in allUsers) {
          let role = Number(allUsers[user].userRole);
          if (role === roleType.roleCompany) {
            console.log("Companies");
            companies = [...companies, { ...allUsers[user] }];
          }
        }

        console.log("companies", companies);
        this.setState({ allCompanies: companies });
      });
  }

  render() {
    let { allCompanies } = this.state;
    console.log("companies", allCompanies);
    return (
      <div>
        <Navbar />
        <h2 className="adminHeading">All Companies</h2>
        <Card companies={allCompanies} deleteCompanies={this.deleteCompany} />
      </div>
    );
  }
}

export default AdminAllCompanies;
