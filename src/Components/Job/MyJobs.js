import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from "../Card/CompanyCard";
import Swal from "sweetalert2";

let db = firebase.database();

class Myjobs extends Component {
  constructor() {
    super();
    this.state = {
      postsData: []
    };
  }
  componentDidMount() {
    this.getPostData();
  }

  deleteJobs=(jobID)=> {
    console.log("this", jobID);
    db.ref()
      .child(`jobs/${jobID}`)
      .remove().then(()=>{

        Swal.fire("This", "Job Post Has been Deleted", "success");
     
      })
      this.getPostData();
  }

  getPostData() {
    this.getCurrentUser().then(currentUser => {
      console.log("currentUser", currentUser);
      db.ref()
        .child(`jobs/`)
        .once(`value`)
        .then(snapshot => {
          console.log(snapshot.val());
          let response = snapshot.val();
          let result = [];
          for (const job in response) {
            console.log("job key", job);
            if (response[job].uid === currentUser)
              result = [...result, { ...response[job], jobID: job }];
          }
          console.log("RESULT", result);
          // let data =[];
          // data.push(result)
          this.setState({ postsData: result });
        });
    });
  }

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
    console.log("this.state,postsData", this.state.postsData);
    return (
      <div>
        <Navbar />
        <h2>My jObs</h2>
        <Card JobsDetails={this.state.postsData} delete={this.deleteJobs} />
      </div>
    );
  }
}

export default withRouter(Myjobs);
