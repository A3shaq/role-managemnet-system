import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Navbar from "../Navbar/Navbar";
import firebase from "firebase";
import Card from '../Card/CardWraper'

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
    // let uid = localStorage.getItem("userID");
    // console.log(uid);

    // db.ref()
    //   .child(`jobs/`)
    //   .once("value")
    //   .then(snapshot => {
    //     console.log(snapshot);
    //     let postsData = snapshot.val();
    //     this.setState({ postsData: postsData });
    //   });
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
            if (response[job].uid === currentUser)
              result =  [...result, response[job]];
          }
          console.log("RESULT", result);
          // let data =[];
          // data.push(result)
          this.setState({ postsData:result });
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
        <Card JobsDetails={this.state.postsData} />
      </div>
    );
  }
}

export default withRouter(Myjobs);
