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

  deleteCompany = async companyId => {
    console.log("companyId", companyId);
    let deletedJobs = await this.delelteCompanyJobs(companyId);
    this.deleteAppliedJobs(deletedJobs);
    db.ref()
      .child(`users/${companyId}`)
      .remove()
      .then(() => {
        console.log("company has been deketed from users node");
        Swal.fire("Admin", " this Company has been deleted", "success");
        this.getAllCompanies();
      });
  };

  deleteAppliedJobs = deletedJobs => {
    console.log("deleteAppliedJobs", deletedJobs);
    db.ref()
      .child(`appliedJobs/`)
      .once("value")
      .then(appliedJobs => {
        appliedJobs = appliedJobs.val();
        console.log("appliedJobs,", appliedJobs);
        // for (let jobId of deletedJobs) {
        for (let applyJob in appliedJobs) {
          // if (appliedJobs[applyJob].jobID === jobId) {
          if (deletedJobs.includes(appliedJobs[applyJob].jobID)) {
            db.ref()
              .child(`appliedJobs/${applyJob}`)
              .remove()
              .then(() => {
                console.log("delted applied jobs");
               
              });
          }

          // }
        }
        // }
      });
  };

  delelteCompanyJobs = companyId => {
    return new Promise((resolve, reject) => {
      console.log("delelteCompanyJobs", companyId);
      let deltedJobsId = [];
      db.ref()
        .child(`jobs/`)
        .once("value")
        .then(allJobs => {
          allJobs = allJobs.val();

          for (let job in allJobs) {
            if (allJobs[job].uid === companyId) {
              deltedJobsId.push(job);
              db.ref()
                .child(`jobs/${job}`)
                .remove()
                .then(() => {
                  console.log("deleted jobs");
                });
            }
          }
          console.log("deltedJobsId", deltedJobsId);

          resolve(deltedJobsId);
        })
        .catch(err => {
          reject(err);
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
